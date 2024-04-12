import * as React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../style/main.css'
import NextNProgress from 'nextjs-progressbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
    </SessionProvider>
  );
}

export default MyApp;
