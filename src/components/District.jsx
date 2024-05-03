import React from "react";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const District = () => {
  const [inputDistrict, setInputDistrict] = useState({
    name: "",
    stateId: "",
  });
  const [data, setData] = useState([]);
  const [statesData, setStatesData] = useState([]);

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
    fetchState();
  }, []);

  // State DATA MANAGEMENT START
  const fetchState = () => {
    addTokenToHeaders(); // Add token to headers
    axios
      .get(`${apiBaseUrl}/v1/state/`)
      .then((response) => {
        console.log(response.data.data);
        setStatesData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // District DATA MANAGEMENT START
  const fetchData = () => {
    addTokenToHeaders(); // Add token to headers
    axios
      .get(`${apiBaseUrl}/v1/district/`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDistrict = (e) => {
    e.preventDefault();
    addTokenToHeaders(); // Add token to headers
    // sending data to server
    axios
      .post(`${apiBaseUrl}/v1/district`, inputDistrict)
      .then((response) => {
        toast.success("District added successfully...");
        console.log(response.data);
        fetchData();
        // Call the GET request again to update the data
        setInputDistrict({ name: "", stateId: "" });
      })
      .catch((error) => {
        console.error("Error saving file:", error);
      });
  };

  const handleDeleteDistrict = (id) => {
    addTokenToHeaders(); // Add token to headers
    axios
      .delete(`${apiBaseUrl}/v1/district/${id}`) // Use id in the URL
      .then((response) => {
        toast.error("District deleted successfully...");
        fetchData(); // Fetch updated data after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <>
      <main className="main-container">
        <h3 style={{ color: "green" }}>Create District </h3>

        {/* DISTRICT DATA MANAGEMENT START */}

        <div className="main-title">
          <div className="row">
            <form onSubmit={handleDistrict}>
              <div className="col-lg-12">
                <select
                  className="form-select-lg m-2"
                  style={{ border: "2px solid black", width: "250px" }}
                  value={inputDistrict.stateId}
                  onChange={(e) =>
                    setInputDistrict({
                      ...inputDistrict,
                      stateId: e.target.value,
                    })
                  }
                >
                  <option value="">Select state</option>
                  {statesData.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-control-lg m-2"
                  placeholder="Enter district"
                  name="name"
                  value={inputDistrict.name}
                  onChange={(e) =>
                    setInputDistrict({ ...inputDistrict, name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="form-control-lg m-2"
                  placeholder="Enter state Id "
                  name="stateId"
                  value={inputDistrict.stateId}
                  onChange={(e) =>
                    setInputDistrict({
                      ...inputDistrict,
                      stateId: e.target.value,
                    })
                  }
                  style={{ display: "none" }}
                />

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
                <th scope="col">Si.No</th>
                <th scope="col">District</th>
                {/* <th scope="col">State Id</th> */}
                {/* <th scope="col">Action</th> */}
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td scope="row">{index + 1}</td>
                  <td>{item.name}</td>
                  {/* <td>{item.stateId}</td> */}
                  {/* <td>
                    <Link to={`/updatedistrict/${item.id}`}>
                      <button className="btn btn-warning">Edit</button>
                    </Link>
                  </td> */}
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteDistrict(item.id)}
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

export default District;
