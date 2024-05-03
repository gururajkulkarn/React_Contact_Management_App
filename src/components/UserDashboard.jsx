import React from "react";
import { useState } from "react";
import Header from "../Header";
import UserSidebar from "../components/UserSidebar";

const AdminDashboard = () => {
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
        <div className="main-title">
          <h2>User Dshboard</h2>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
