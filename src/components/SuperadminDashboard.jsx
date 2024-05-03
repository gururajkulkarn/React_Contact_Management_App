import React from "react";
import { useState } from "react";
import AdminCreate from "./AdminCreate";
import Header from "../Header";
import UserSidebar from "../components/UserSidebar";

const SuperadminDashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <>
      <Header OpenSidebar={OpenSidebar} />
      <UserSidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <main className="main-container">
        <h1>SuperAdmin</h1>

        <div className="main-title">
          <div>
            <AdminCreate />
          </div>
        </div>
      </main>
    </>
  );
};

export default SuperadminDashboard;
