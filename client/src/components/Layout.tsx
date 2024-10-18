import React, { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className="h-screen flex flex-col">
      <main className="flex-grow bg-white z-40 pb-32">
        {children}
      </main>
     <Navigation />
    </div>
  );
};

export default Layout;
