import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Sidebar";
import Header from "../Header";

const Category = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState({ name: "" });
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_Contact_Management_Api_Base_Url;

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
      .get(`${apiBaseUrl}/v1/category/`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTokenToHeaders(); // Add token to headers
    // sending data to server
    axios
      .post(`${apiBaseUrl}/v1/category`, inputData)
      .then((response) => {
        // alert("");
        toast.success("Category added successfully...")
        console.log(response.data);
        // Call the GET request again to update the data
        setInputData({ name: "" });
        fetchData();
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleDelete = (id) => {
    addTokenToHeaders(); // Add token to headers
    axios
      .delete(`${apiBaseUrl}/v1/category/${id}`) // Use id in the URL
      .then((response) => {
        toast.error("Category deleted successfully...");
        fetchData(); // Fetch updated data after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

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
        <h2>Create Category</h2>
        <div className="main-title">
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="col-lg-12">
                <input
                  type="text"
                  className="form-control-lg m-2"
                  placeholder="Enter category"
                  value={inputData.name}
                  name="name"
                  onChange={(e) =>
                    setInputData({ ...inputData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-lg-12">
                <button className="btn btn-primary w-25 m-2">Add</button>
              </div>
            </form>
          </div>
        </div>
        <div
          className="table-container"
          style={{ height: "200px", overflowY: "auto" }}
        >
          <table className="table table-hover table-dark  table-bordered">
            <thead>
              <tr>
                <th className="table-heading">Si.No</th>
                {/* <th className="table-heading">Id</th> */}
                <th className="table-heading">Category</th>
                {/* <th className="table-heading">Action</th> */}
                <th className="table-heading">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td scope="row">{index + 1}</td>
                  {/* <td scope="row">{item.id}</td> */}
                  <td>{item.name}</td>
                  {/* <td>
                    <Link to={`/updatecategory/${item.id}`}>
                      <button className="btn btn-warning">Edit</button>
                    </Link>
                  </td> */}
                  <td>
                    <button
                      className="btn btn-danger"
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

export default Category;
