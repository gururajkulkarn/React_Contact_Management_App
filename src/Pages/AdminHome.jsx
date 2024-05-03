import React from "react";
import { useState } from "react";
import UserCreate from "../components/UserCreate";
import Sidebar from "../Sidebar";
import Header from "../Header";

function AdminHome() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />

      <main className="main-container">
        <div className="main-title">
          <h3>Admin Dashboard</h3>
        </div>

        <UserCreate />
      </main>
    </>
  );
}

export default AdminHome;
