import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import * as XLSX from "xlsx";
import { Link, Outlet } from "react-router-dom";

const Reports = () => {
  const [contacts, setContacts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  const apiBaseUrl = import.meta.env.VITE_Contact_Management_Api_Base_Url;

  // TOKEN AUTHENTICATION
  const addTokenToHeaders = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("Token not found in local storage");
    }
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhoneFilter(e.target.value);
  };

  const handleCityChange = (e) => {
    setCityFilter(e.target.value);
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const handleDelete = (id) => {
    addTokenToHeaders(); // Add token to headers
    axios
      .delete(`${apiBaseUrl}/v1/contacts/${id}`) // Use id in the URL
      .then((response) => {
        toast.error("Contact deleted successfully...");
        fetchContact(); // Fetch updated data after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting country:", error);
      });
  };

  // NEW CONTACT DATA MANAGEMENT START
  const fetchContact = () => {
    addTokenToHeaders(); // Add token to headers
    axios
      .get(`${apiBaseUrl}/v1/contacts/`)
      .then((response) => {
        console.log(response.data.data);
        setContacts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Filter contacts based on category, phone, and city
  const filteredContacts = contacts.filter((contact) => {
    return (
      (categoryFilter === "" ||
        contact.familyMembers[0].category
          .toLowerCase()
          .includes(categoryFilter.toLowerCase())) &&
      (phoneFilter === "" ||
        contact.contactDetail.phone.includes(phoneFilter)) &&
      (cityFilter === "" ||
        contact.addresses[0].city
          .toLowerCase()
          .includes(cityFilter.toLowerCase()))
    );
  });

  // const exportToExcel = () => {
  //   const table = document.getElementById("tableId");
  //   const wb = XLSX.utils.table_to_book(table);
  //   XLSX.writeFile(wb, "table.xlsx");
  // };

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
        <h2>Reports</h2>

        <div className="row">
          <h3 style={{ color: "green" }}>Search </h3>

          <div className="col-lg-4">
            <input
              type="text"
              className="form-control-lg m-2 w-75"
              placeholder="By category"
              value={categoryFilter}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control-lg m-2 w-75"
              placeholder="By mobile number"
              value={phoneFilter}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control-lg m-2 w-75"
              placeholder="By city"
              value={cityFilter}
              onChange={handleCityChange}
            />
          </div>
        </div>

        <h3>List of Contacts</h3>
        <div
          className="table-container"
          style={{ height: "500px", overflowY: "auto" }}
        >
          {/* <button className="btn btn-success m-2" onClick={exportToExcel}>
            Export to Excel
          </button> */}
          <table
            id="tableId"
            className="table table-hover table-dark w-100 table-bordered"
          >
            <thead>
              <tr>
                <th>Si.No</th>
                <th>First Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Street1</th>
                <th>Street2</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Zip</th>
                <th>Family Member Name</th>
                <th>Relation</th>
                <th>Category</th>
                <th>DOB</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Additional Detail</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.contactDetail.phone}</td>
                  <td>{item.contactDetail.email}</td>
                  <td>{item.importantDates[0].date}</td>
                  <td>{item.addresses[0].street1}</td>
                  <td>{item.addresses[0].street2}</td>
                  <td>{item.addresses[0].city}</td>
                  <td>{item.addresses[0].state}</td>
                  <td>{item.addresses[0].country}</td>
                  <td>{item.addresses[0].zip}</td>
                  <td>{item.familyMembers[0].name}</td>
                  <td>{item.familyMembers[0].relationship}</td>
                  <td>{item.familyMembers[0].category}</td>
                  <td>{item.familyMembers[0].importantDates[0].date}</td>
                  <td>{item.familyMembers[0].contactDetail.email}</td>
                  <td>{item.familyMembers[0].contactDetail.phone}</td>
                  <td>{item.additionalNotes}</td>
                  <td>
                    <Link to={`/updatecontacts/${item.id}`}>
                      <button className="btn btn-warning" style={{ border: "1.8px solid white", fontWeight: "bold" }}>Edit</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger" style={{ border: "1.8px solid white", fontWeight: "bold" }}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Outlet />
    </>
  );
};

export default Reports;
