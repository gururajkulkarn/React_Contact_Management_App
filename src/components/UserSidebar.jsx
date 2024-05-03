import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {  BsFillArchiveFill } from "react-icons/bs";
import { MdContacts } from "react-icons/md";


function UserSidebar({ openSidebarToggle, OpenSidebar }) {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleDashboardClick = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <>
      <aside
        id="sidebar"
        className={openSidebarToggle ? "sidebar-responsive" : ""}
      >
        <div className="sidebar-title">
          <div className="sidebar-brand">
            <Link to="" style={{ textDecoration: "none", color: "white" }}>
              <MdContacts className="icon_header" /> Contact Management
            </Link>
          </div>

          <span className="icon close_icon" onClick={OpenSidebar}>
            X
          </span>
        </div>

        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <BsFillArchiveFill className="icon" /> Settings
          </li>
        </ul>
      </aside>

      <Outlet />
    </>
  );
}

export default UserSidebar;
