import React from "react";
import { useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import Sidebar from "../Sidebar";
import Header from "../Header";

function Home() {

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
          <h3>DASHBOARD</h3>
        </div>

        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h5>PRODUCTS</h5>
              <BsFillArchiveFill className="card_icon" />
            </div>
            <h2>300</h2>
          </div>
          <div className="card">
            <div className="card-inner">
              <h5>CATEGORIES</h5>
              <BsFillGrid3X3GapFill className="card_icon" />
            </div>
            <h2>12</h2>
          </div>
          <div className="card">
            <div className="card-inner">
              <h5>CUSTOMERS</h5>
              <BsPeopleFill className="card_icon" />
            </div>
            <h2>33</h2>
          </div>
          <div className="card">
            <div className="card-inner">
              <h5>ALERTS</h5>
              <BsFillBellFill className="card_icon" />
            </div>
            <h2>42</h2>
          </div>
        </div>

     
      </main>
    </>
  );
}

export default Home;
