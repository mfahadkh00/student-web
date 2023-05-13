import NavBar from "./navBar";
import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
  }
  
  function Layout({ children }: LayoutProps) {
    return (
      <div>
        <NavBar />
        {children}
      </div>
    );
  }
  
  export default Layout;