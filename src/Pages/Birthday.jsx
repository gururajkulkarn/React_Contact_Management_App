import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Header from "../Header";

const Birthday = () => {
  const [contact, setContact] = useState([]);
  const [filteredContact, setFilteredContact] = useState([]);
  const [nameSearch, setNameSearch] = useState(""); // State for name search

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

  useEffect(() => {
    fetchContact();
  }, []);

  useEffect(() => {
    // Filter the contact list based on the current date and name search
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });

    const filteredData = contact.filter((item) => {
      const date = new Date(item.importantDates[0].date);

      // Check if the date is valid before formatting
      if (isNaN(date.getTime())) {
        return false;
      }

      const formattedDate = date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
      });

      return (
        formattedDate === currentDate &&
        item.name.toLowerCase().includes(nameSearch.toLowerCase()) // Include name search criteria
      );
    });

    setFilteredContact(filteredData);
  }, [contact, nameSearch]);

  // NEW CONTACT DATA MANAGEMENT START
  const fetchContact = () => {
    addTokenToHeaders(); // Add token to headers
    axios
      .get(`${apiBaseUrl}/v1/contacts/`)
      .then((response) => {
        console.log(response.data.data);
        setContact(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handlePrint = (userName) => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Wishes</title></head><body>"
    );
    printWindow.document.write(
      '<div style="text-align: center;margin-top:250px;">'
    );
    printWindow.document.write(
      `<h1>Wish You Happy Birthday<br/><br/>${userName}</h1>`
    );
    printWindow.document.write("</div></body></html>");
    printWindow.document.close();

    // Trigger the print
    printWindow.print();
  };

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
        <h2>Todays Birthday</h2>

        <div className="row">
          <div className="col-lg-6">
            <input
              type="text"
              className="form-control-lg m-2 w-75"
              placeholder="Search by name"
              name="name"
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)} // Handle name search input change
            />
          </div>
        </div>

        <div
          className="table-container"
          style={{ height: "200px", overflowY: "auto" }}
        >
          <table className="table table-hover table-dark w-100 table-bordered">
            <thead>
              <tr>
                <th>Si.No</th>
                <th>Full Name</th>
                <th>DOB</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
                <th>Printlabels</th>
              </tr>
            </thead>
            <tbody>
              {filteredContact.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.importantDates[0].date}</td>
                  <td>{item.contactDetail.phone}</td>
                  <td>{item.contactDetail.email}</td>
                  <td>{item.addresses[0].city}</td>
                  <td scope="col">
                    <button className="btn btn-success"> SMS</button>
                  </td>
                  <td scope="col">
                    <button
                      onClick={() => handlePrint(`${item.name}`)}
                      className="btn btn-primary"
                    >
                      Print Label
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Birthday;
