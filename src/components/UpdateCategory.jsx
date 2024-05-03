import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar";
import Header from "../Header";

const UpdateCategory = () => {
  
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
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
      .get(`${apiBaseUrl}/v1/category/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setFormData({
          name: response.data.data.name,
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
      .put(`${apiBaseUrl}/v1/category/${id}`, formData)
      .then((response) => {
        alert("Category updated successfully...");
        console.log(response.data);
        navigate("/category");
        fetchData(); // Fetch updated data after successful update
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 

  return (
    <>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <main className="main-container">
        <h2>Edit Category</h2>
        <div className="main-title">
          <div className="row">
            <form onSubmit={handleUpdate}>
              <div className="col-lg-12">
                <input
                  type="text"
                  className="form-control-lg m-2"
                  placeholder="Enter category"
                  name="name"
                  value={formData.name}
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

export default UpdateCategory;
