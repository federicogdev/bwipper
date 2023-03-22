import React from "react";

import FollowBar from "@/components/Layout/FollowBar";
import Sidebar from "@/components/Layout/Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen bg-zinc-900">
      <div className="container h-full mx-auto xl:px-30 max-w-5xl">
        <div className="grid grid-cols-6 md:grid-cols-4 h-full">
          <Sidebar />
          <div
            className="
            col-span-5 
            lg:col-span-2 
            border-x-[1px] 
            border-neutral-800
        "
          >
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
