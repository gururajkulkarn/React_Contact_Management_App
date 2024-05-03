import React from "react";
import { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Country from "../components/Country";
import StateComp from "../components/State";
import District from "../components/District";

const Address = () => {
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
        <h2>Create Address </h2>
        {/*  country data management start*/}
        <Country />
        {/* country data management end */}

        {/* state data management start */}
        <StateComp />
        {/* state data management end */}

        {/* district data management start */}
        <District />
        {/* district data management end */}
      </main>
    </>
  );
};

export default Address;
