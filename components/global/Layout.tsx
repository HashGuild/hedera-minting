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
        <title>HashGuild Minting</title>
        <meta name="HashGuild Minting" content="Mint NFTs on Hedera." />
      </Head>
      <div className="min-h-screen w-full flex flex-col">
        <Header />
        <div className="max-w-[90%] min-w-[90%] mx-auto mb-10 flex-1">
          <div className="flex flex-col items-center justify-center">
            <div className="my-16 md:my-6 md:border md:shadow-md px-0 md:px-32 w-full md:max-w-5xl rounded-lg">
              <div className="flex flex-col md:py-12 max-w-screen-md ">
                {children}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Layout;
