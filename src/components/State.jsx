import React from "react";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const StateComp = () => {
  const [inputState, setInputState] = useState({
    name: "",
    countryId: "",
  });
  const [data, setData] = useState([]);
  const [country, setCountry] = useState([]);

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
    fetchCountry();
  }, []);

  // COUNTRY DATA MANAGEMENT START
  const fetchCountry = () => {
    addTokenToHeaders(); // Add token to headers
    axios
      .get(`${apiBaseUrl}/v1/country/`)
      .then((response) => {
        console.log(response.data.data);
        setCountry(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // State DATA MANAGEMENT START
  const fetchData = () => {
    addTokenToHeaders(); // Add token to headers
    axios
      .get(`${apiBaseUrl}/v1/state/`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleState = (e) => {
    e.preventDefault();
    addTokenToHeaders(); // Add token to headers
    // sending data to server
    axios
      .post(`${apiBaseUrl}/v1/state`, inputState)
      .then((response) => {
        toast.success("State added successfully...");
        console.log(response.data);
        fetchData();
        // Call the GET request again to update the data
        setInputState({ name: "", countryId: "" });
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        console.error("Error saving file:", error);
      });
  };

  const handleDeleteState = (id) => {
    addTokenToHeaders(); // Add token to headers
    axios
      .delete(`${apiBaseUrl}/v1/state/${id}`) // Use id in the URL
      .then((response) => {
        toast.error("State deleted successfully...");
        fetchData(); // Fetch updated data after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <>
      <main className="main-container">
        <h3 style={{ color: "green" }}>Create State </h3>

        {/* STATE DATA MANAGEMENT START */}

        <div className="main-title">
          <div className="row">
            <form onSubmit={handleState}>
              <div className="col-lg-12">
                <select
                  className="form-select-lg m-2 "
                  style={{ border: "2px solid black", width: "250px" }}
                  value={inputState.countryId}
                  onChange={(e) =>
                    setInputState({
                      ...inputState,
                      countryId: e.target.value,
                    })
                  }
                >
                  <option value="">Select country</option>
                  {country.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="form-control-lg m-2"
                  placeholder="Enter state"
                  name="name"
                  value={inputState.name}
                  onChange={(e) =>
                    setInputState({ ...inputState, name: e.target.value })
                  }
                  required
                />
                <div className="col-lg-6">
                  <input
                    type="text"
                    className="form-control-lg m-2"
                    placeholder="Enter country Id "
                    name="countryId"
                    value={inputState.countryId}
                    onChange={(e) =>
                      setInputState({
                        ...inputState,
                        countryId: e.target.value,
                      })
                    }
                    style={{ display: "none" }}
                  />
                </div>
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
                <th scope="col">State</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td scope="row">{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteState(item.id)}
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

export default StateComp;
