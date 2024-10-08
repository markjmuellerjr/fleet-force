// pages/auth/signin.tsx

import { GetServerSideProps } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import React from 'react';
import Layout from '../../components/Layout/Layout';

interface SignInProps {
  providers: Record<string, unknown>;
}

const SignIn: React.FC<SignInProps> = ({ providers }) => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl mb-8">Sign in to FleetForce</h1>
        {Object.values(providers).map((provider) => {
          const typedProvider = provider as { id: string; name: string };
          return (
            <div key={typedProvider.name}>
              <button
                onClick={() => signIn(typedProvider.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Sign in with {typedProvider.name}
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
};
export default SignIn;