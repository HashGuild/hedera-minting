import Head from 'next/head';
import React, { FC } from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: FC<LayoutProps> = function ({ children }) {
  return (
    <>
      <Head>
        <title>Hedera Minting</title>
        <meta name="Hedera Minting" content="Mint NFTs on Hedera." />
      </Head>
      <div className="min-h-screen w-full  flex flex-col">
        <Header />
        <div className="max-w-[90%] min-w-[90%]  mx-auto flex-1">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Layout;
