import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import HeaderMain from '../components/HeaderMain';
import Layout from '../components/Layout'


const IndexPage = () => {

  return (
    <Layout>
      <HeaderMain></HeaderMain>
    </Layout>
  );
}

export default IndexPage;
