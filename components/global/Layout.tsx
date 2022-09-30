import React, { FC } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: FC<LayoutProps> = function ({ children }) {
  return (
    <div className="min-h-screen w-full  flex flex-col">
      <Header />
      <div className="max-w-[90%] min-w-[90%]  mx-auto flex-1">{children}</div>
      <Footer />
    </div>
  );
};
