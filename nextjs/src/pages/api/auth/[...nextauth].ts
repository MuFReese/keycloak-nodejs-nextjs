import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import axios from 'axios';
import type { JWT } from 'next-auth/jwt';


interface IKeycloakRefreshTokenApiResponse {
  id_token: string;
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  session_state: string;
  scope: string;
  'not-before-policy': number;
}

async function refreshAccessToken(token: JWT) {
  try {
    const refreshedTokens = await axios.post<IKeycloakRefreshTokenApiResponse>(
      'http://localhost:3000/api/auth/keycloakRefreshToken',
      {
        refreshToken: token?.refreshToken
      }
    );

    if (refreshedTokens.status !== 200) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.data.access_token,
      accessTokenExpired: Date.now() + refreshedTokens.data.expires_in * 1000,
      refreshToken: refreshedTokens.data.refresh_token ?? token.refreshToken,
      refreshTokenExpired: Date.now() + refreshedTokens.data.refresh_expires_in * 1000
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export default NextAuth({
  providers: [
    KeycloakProvider({
      id: 'keycloak',
      name: 'Keycloak',
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: 'http://localhost:8080/auth/realms/apps',
      requestTokenUrl: `${process.env.KEYCLOAK_BASE_URL}/protocol/openid-connect/auth`,
      authorization: {
        params: {
          scope: 'openid email profile',
        }
      },
      checks: ['pkce', 'state'],
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub,
          ...profile
        }
      }
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  // Создать секрет: openssl rand -base64 32
  secret: 'F9BNdSJqoV0j+YuEq0erYXp+/eY7rAVU9+U+AFHzy3w=',
  pages: {
    signIn: undefined
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return Promise.resolve(url.startsWith(baseUrl) ? url : baseUrl);
    },
    async signIn({ account, user }) {
      if (account && user) {
        return true;
      } else {
        return false;
      }
    },
    jwt({ token, user, account }) {
      // Первоначальный вход
      if (account && user) {
        // Добавить access_token,refresh_token и срок действия к токену сразу после входа в систему
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpired = account.expires_at! * 1000;
        token.refreshTokenExpired = Date.now() + account.refresh_expires_in! * 1000;
        token.user = user;

        return token;
      }

      // Вернуть предыдущий токен, если срок действия токена доступа еще не истек
      if (Date.now() < token.accessTokenExpired) {
        return token;
      }

      // Срок действия токена доступа истек(попробовать обновить его!!!)
      return refreshAccessToken(token);
    },
    session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.error = token.error;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    }
  }
});
