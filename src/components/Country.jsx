import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Country = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState({ name: "", code: "" });

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

  // COUNTRY DATA MANAGEMENT START
  const fetchData = () => {
    addTokenToHeaders(); // Add token to headers
    axios
      .get(`${apiBaseUrl}/v1/country/`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleCountry = (e) => {
    e.preventDefault();
    addTokenToHeaders(); // Add token to headers
    // sending data to server
    axios
      .post(`${apiBaseUrl}/v1/country`, inputData)
      .then((response) => {
        toast.success("Country added successfully...");
        console.log(response.data);
        fetchData();
        setInputData({ name: "", code: "" });
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        console.error("Error adding country:", error);
      });
  };

  const handleDelete = (id) => {
    addTokenToHeaders(); // Add token to headers
    axios
      .delete(`${apiBaseUrl}/v1/country/${id}`) // Use id in the URL
      .then((response) => {
        toast.error("Country deleted successfully...");
        fetchData(); // Fetch updated data after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting country:", error);
      });
  };

  // COUNTRY DATA MANAGEMENT END

  return (
    <>
      <main className="main-container">
        {/* COUNTRY DATA MANAGEMENT START */}
        <h3 style={{ color: "green" }}>Create Country </h3>

        <div className="main-title">
          <div className="row">
            <form onSubmit={handleCountry}>
              <div className="col-lg-12">
                <input
                  type="text"
                  className="form-control-lg m-2"
                  placeholder="Enter country"
                  name="name"
                  value={inputData.name}
                  onChange={(e) =>
                    setInputData({ ...inputData, name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="form-control-lg m-2"
                  placeholder="Enter country code"
                  name="code"
                  value={inputData.code}
                  onChange={(e) =>
                    setInputData({ ...inputData, code: e.target.value })
                  }
                  required
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
                <th scope="col">Country</th>
                <th scope="col">Country Code</th>
                {/* <th scope="col">Action</th> */}
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td scope="row">{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.code}</td>
                  {/* <td>
                    <Link to={`/updatecountry/${item.id}`}>
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

        {/* COUNTRY DATA MANAGEMENT END */}
      </main>
    </>
  );
};

export default Country;
