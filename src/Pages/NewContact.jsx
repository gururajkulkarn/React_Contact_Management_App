import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

const NewContact = () => {
  const [data, setData] = useState([]);
  const [contact, setContact] = useState([]);

  const [country, setCountry] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [showFamilyForm, setShowFamilyForm] = useState(false); // State to track checkbox status

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
    fetchData();
    fetchState();
    fetchCountry();
    fetchContact();
  }, []);

  // Category DATA MANAGEMENT START
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
  // Inside NewContact component

  const [inputData, setInputData] = useState({
    name: "",
    contactDetail: {
      phone: "",
      email: "",
    },
    importantDates: [{ date: "" }],
    familyMembers: [
      {
        name: "",
        relationship: "",
        category: "",
        importantDates: [{ date: "" }],
        contactDetail: {
          phone: "",
          email: "",
        },
      },
    ],
    addresses: [
      {
        street1: "",
        street2: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      },
    ],
    additionalNotes: "",
  });

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleAddFamilyMember = () => {
    setInputData({
      ...inputData,
      familyMembers: [
        ...inputData.familyMembers,
        {
          name: "",
          relationship: "",
          category: "",
          importantDates: [{ date: "" }],
          contactDetail: {
            phone: "",
            email: "",
          },
        },
      ],
    });
  };

  // Function to handle removing a family member
  const removeFamilyMember = (index) => {
    setInputData((prevData) => ({
      ...prevData,
      familyMembers: prevData.familyMembers.filter((_, i) => i !== index),
    }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    addTokenToHeaders();
    axios
      .post(`${apiBaseUrl}/v1/contacts`, inputData)
      .then((response) => {
        toast.success("Contact added successfully...");
        console.log(response.data);
        fetchContact();
        // setInputData({
        //   name: "",
        //   contactDetail: {
        //     phone: "",
        //     email: "",
        //   },
        //   importantDates: [{ date: "" }],
        //   familyMembers: [
        //     {
        //       name: "",
        //       relationship: "",
        //       category: "",
        //       importantDates: [{ date: "" }],
        //       contactDetail: {
        //         phone: "",
        //         email: "",
        //       },
        //     },
        //   ],
        //   addresses: [
        //     {
        //       street1: "",
        //       street2: "",
        //       city: "",
        //       state: "",
        //       country: "",
        //       zip: "",
        //     },
        //   ],
        //   additionalNotes: "",
        // });
      })
      .catch((error) => {
        console.error("Error in adding contact data :", error);
      });
  };

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setShowFamilyForm((prevState) => !prevState); // Toggle the state when checkbox changes
  };

  return (
    <>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />

      <main className="main-container">
        <div className="main-title"></div>
        <form onSubmit={handleSubmit}>
          <h2>New Contact</h2>
          <div className="row">
            <div className="col-lg-6">
              <input
                type="text"
                className="form-control-lg m-2 w-75"
                placeholder="Full name"
                name="name"
                value={inputData.name}
                onChange={(e) =>
                  setInputData({ ...inputData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="col-lg-6">
              <input
                type="text"
                className="form-control-lg m-2 w-75"
                placeholder="Phone"
                maxLength={10}
                name="contactDetail.phone"
                value={inputData.contactDetail.phone}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    contactDetail: {
                      ...inputData.contactDetail,
                      phone: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
          </div>
          {/* Email and Date of Birth */}
          <div className="row">
            <div className="col-lg-6">
              <input
                type="email"
                className="form-control-lg m-2 w-75"
                placeholder="Email id"
                name="contactDetail.email"
                value={inputData.contactDetail.email}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    contactDetail: {
                      ...inputData.contactDetail,
                      email: e.target.value,
                    },
                  })
                }
                required
              />
            </div>
            <div className="col-lg-6">
              <input
                type="date"
                className="form-control-lg m-2 w-75"
                placeholder="DOB"
                name="importantDates[0].date"
                value={inputData.importantDates[0].date}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    importantDates: [{ date: e.target.value }],
                  })
                }
                required
              />
            </div>
          </div>
          {/* Address */}
          <h2>Address</h2>
          <div className="row">
            <div className="col-lg-6">
              <input
                type="text"
                className="form-control-lg m-2 w-75"
                placeholder="Street1"
                name="addresses[0].street1"
                value={inputData.addresses[0].street1}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    addresses: [
                      { ...inputData.addresses[0], street1: e.target.value },
                    ],
                  })
                }
              />
            </div>
            <div className="col-lg-6">
              <input
                type="text"
                className="form-control-lg m-2 w-75"
                placeholder="Street2"
                name="addresses[0].street2"
                value={inputData.addresses[0].street2}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    addresses: [
                      { ...inputData.addresses[0], street2: e.target.value },
                    ],
                  })
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <input
                type="text"
                className="form-control-lg m-2 w-75"
                placeholder="City"
                name="addresses[0].city"
                value={inputData.addresses[0].city}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    addresses: [
                      { ...inputData.addresses[0], city: e.target.value },
                    ],
                  })
                }
              />
            </div>
            <div className="col-lg-6">
              <select
                className="form-select-lg m-2 w-75"
                style={{ border: "2px solid black" }}
                value={inputData.addresses[0].state}
                name="addresses[0].state"
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    addresses: [
                      { ...inputData.addresses[0], state: e.target.value },
                    ],
                  })
                }
              >
                <option value="Select">Select state</option>
                {statesData.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <select
                className="form-select-lg m-2 w-75"
                style={{ border: "2px solid black" }}
                value={inputData.addresses[0].country}
                name="addresses[0].country"
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    addresses: [
                      { ...inputData.addresses[0], country: e.target.value },
                    ],
                  })
                }
              >
                <option value="Select">Select country</option>
                {country.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-6">
              <input
                type="text"
                className="form-control-lg m-2 w-75"
                placeholder="Zip"
                name="addresses[0].zip"
                value={inputData.addresses[0].zip}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    addresses: [
                      { ...inputData.addresses[0], zip: e.target.value },
                    ],
                  })
                }
              />
            </div>
          </div>

          {/* Family Member */}

          <p style={{ fontWeight: "bold" }}>
            If Family member{" "}
            <span>
              {" "}
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={showFamilyForm}
                style={{ fontSize: "20px", border: "1px solid black" }}
              />
            </span>
          </p>

          {showFamilyForm &&
            inputData.familyMembers.map((familyMember, index) => (
              <div key={index}>
                <h3>Family Member</h3>
                <div className="row">
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control-lg m-2 w-75"
                      placeholder="Full name"
                      value={familyMember.name}
                      onChange={(e) =>
                        setInputData((prevData) => {
                          const updatedFamilyMembers = [
                            ...prevData.familyMembers,
                          ];
                          updatedFamilyMembers[index].name = e.target.value;
                          return {
                            ...prevData,
                            familyMembers: updatedFamilyMembers,
                          };
                        })
                      }
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control-lg m-2 w-75"
                      placeholder="Relationship"
                      value={familyMember.relationship}
                      onChange={(e) =>
                        setInputData((prevData) => {
                          const updatedFamilyMembers = [
                            ...prevData.familyMembers,
                          ];
                          updatedFamilyMembers[index].relationship =
                            e.target.value;
                          return {
                            ...prevData,
                            familyMembers: updatedFamilyMembers,
                          };
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <select
                      className="form-select-lg m-2 w-75"
                      style={{ border: "2px solid black" }}
                      value={familyMember.category}
                      onChange={(e) =>
                        setInputData((prevData) => {
                          const updatedFamilyMembers = [
                            ...prevData.familyMembers,
                          ];
                          updatedFamilyMembers[index].category = e.target.value;
                          return {
                            ...prevData,
                            familyMembers: updatedFamilyMembers,
                          };
                        })
                      }
                    >
                      <option value="Select">Select category</option>
                      {data.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="date"
                      className="form-control-lg m-2 w-75"
                      placeholder="DOB"
                      value={familyMember.importantDates[0].date}
                      onChange={(e) =>
                        setInputData((prevData) => {
                          const updatedFamilyMembers = [
                            ...prevData.familyMembers,
                          ];
                          updatedFamilyMembers[index].importantDates[0].date =
                            e.target.value;
                          return {
                            ...prevData,
                            familyMembers: updatedFamilyMembers,
                          };
                        })
                      }
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <input
                      type="email"
                      className="form-control-lg m-2 w-75"
                      placeholder="Email id"
                      value={familyMember.contactDetail.email}
                      onChange={(e) =>
                        setInputData((prevData) => {
                          const updatedFamilyMembers = [
                            ...prevData.familyMembers,
                          ];
                          updatedFamilyMembers[index].contactDetail.email =
                            e.target.value;
                          return {
                            ...prevData,
                            familyMembers: updatedFamilyMembers,
                          };
                        })
                      }
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      className="form-control-lg m-2 w-75"
                      placeholder="Phone"
                      maxLength={10}
                      value={familyMember.contactDetail.phone}
                      onChange={(e) =>
                        setInputData((prevData) => {
                          const updatedFamilyMembers = [
                            ...prevData.familyMembers,
                          ];
                          updatedFamilyMembers[index].contactDetail.phone =
                            e.target.value;
                          return {
                            ...prevData,
                            familyMembers: updatedFamilyMembers,
                          };
                        })
                      }
                    />
                  </div>
                  <div className="col-lg-6">
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ border: "1.5px solid black" }}
                      onClick={handleAddFamilyMember}
                    >
                      Add more
                    </button>
                  </div>
                  <div className="col-lg-6">
                    <button
                      onClick={() => removeFamilyMember(index)}
                      className="btn btn-danger"
                      style={{ border: "1.5px solid black" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {/* Additional Notes */}
          <div className="row">
            <div className="col-lg-6">
              <textarea
                className="form-control-lg m-2 w-75"
                placeholder="Additional notes"
                style={{ border: "2px solid black" }}
                name="additionalNotes"
                value={inputData.additionalNotes}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    additionalNotes: e.target.value,
                  })
                }
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="row">
            <div className="col-lg-6"></div>
            <div className="col-lg-6">
              <button
                className="btn btn-success btn-lg m-2"
                style={{ border: "1.8px solid black", fontWeight: "bold" }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>

        <h3>List of Contacts</h3>
        <div
          className="table-container"
          style={{ height: "400px", overflowY: "auto" }}
        >
          <table className="table table-hover  table-dark w-100 table-bordered">
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
              {contact.map((item, index) => (
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
                      <button
                        className="btn btn-warning"
                        style={{
                          border: "1.8px solid white",
                          fontWeight: "bold",
                        }}
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      style={{
                        border: "1.8px solid white",
                        fontWeight: "bold",
                      }}
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

export default NewContact;
