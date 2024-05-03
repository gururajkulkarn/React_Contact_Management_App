import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../Sidebar";
import Header from "../Header";


const Printlabel = () => {

  useEffect(() => {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjbXNfc3VwZXJfYWRtaW4iLCJpYXQiOjE3MTE5NDkwMzAsImV4cCI6MTcxMTk1MjYzMH0.q8f5iIkDyqtDEcXAB5C6AmgLz1jvurw1NZFY058slMdDQ-50gIiwkOdJ_YTVJ3D27q-t-0N4B3NV4wlwFHHN7A'; // Your token here
    axios.get('http://localhost:8888/v1/country/1', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  

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
        <h2>Print Labels </h2>
        <div className="col-lg-12">
          <input type="text" className="form-control-lg m-2 w-75" placeholder="Enter First Name"/>
        </div>
        <div className="col-lg-12">
          <textarea  type="text" className="form-control-lg m-2 w-75" />
        </div>
      </main>
    </>
  );
}

export default Printlabel;
