import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Sidebar from "../Sidebar";
import Header from "../Header";

const UpdateCountry = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });

  const apiBaseUrl = import.meta.env.VITE_Contact_Management_Api_Base_Url;

  const navigate = useNavigate();

  // Function to add token to headers
  const addTokenToHeaders = () => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      // Handle case when token is not available in local storage
      console.error("Token not found in local storage");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    addTokenToHeaders(); // Add token to headers
    axios
      .get(`${apiBaseUrl}/v1/country/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setFormData({
          name: response.data.data.name,
          code: response.data.data.code,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    addTokenToHeaders(); // Add token to headers

    axios
      .put(`${apiBaseUrl}/v1/country/${id}`, formData)
      .then((response) => {
        toast("Country updated successfully...");
        console.log(response.data);
        navigate("/address");
        // fetchData(); // Fetch updated data after successful update
      })
      .catch((error) => {
        console.error("Error updating country:", error);
      });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  return (
    <>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />

      <main className="main-container">
        <h2>Edit Country</h2>
        <div className="main-title">
          <div className="row">
            <form onSubmit={handleUpdate}>
              <div className="col-lg-12">
                <input
                  type="text"
                  className="form-control-lg m-2"
                  placeholder="Enter country"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="form-control-lg m-2"
                  placeholder="Enter country"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-lg-12">
                <button className="btn btn-primary w-25 m-2">Update</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdateCountry;
