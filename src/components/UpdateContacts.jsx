import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import {useParams, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UpdateContacts = () => {
  const [data, setData] = useState([]);

  const [country, setCountry] = useState([]);
  const [statesData, setStatesData] = useState([]);

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

  const apiBaseUrl = import.meta.env.VITE_Contact_Management_Api_Base_Url;

  const navigate = useNavigate();
  const { id } = useParams();

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
      .get(`${apiBaseUrl}/v1/contacts/${id}`)
      .then((response) => {
        console.log(response.data.data);
         const fetchedContact = response.data.data;
      setInputData({
        name: fetchedContact.name,
        contactDetail: fetchedContact.contactDetail,
        importantDates: fetchedContact.importantDates,
        familyMembers: fetchedContact.familyMembers,
        addresses: fetchedContact.addresses,
        additionalNotes: fetchedContact.additionalNotes,
      });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  

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




  const handleSubmit = (e) => {
    e.preventDefault();
    addTokenToHeaders();
    axios
      .put(`${apiBaseUrl}/v1/contacts/${id}`, inputData)
      .then((response) => {
        toast.success("Contact updated successfully...");
        console.log(response.data);
        navigate('/reports')
      })
      .catch((error) => {
        console.error("Error in adding contact data :", error);
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
                className="form-select-lg m-2 w-75" style={{border:"2px solid black"}}
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
                className="form-select-lg m-2 w-75" style={{border:"2px solid black"}}
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
       
       

          {inputData.familyMembers.map((familyMember, index) => (
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
                          ...prevData.familyMembers
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
                          ...prevData.familyMembers
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
                    className="form-select-lg m-2 w-75" style={{border:"2px solid black"}}
                    value={familyMember.category}
                    onChange={(e) =>
                      setInputData((prevData) => {
                        const updatedFamilyMembers = [
                          ...prevData.familyMembers
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
                          ...prevData.familyMembers
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
                          ...prevData.familyMembers
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
                    value={familyMember.contactDetail.phone}
                    onChange={(e) =>
                      setInputData((prevData) => {
                        const updatedFamilyMembers = [
                          ...prevData.familyMembers
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
              </div>
            </div>
          ))}

          <div className="row">
            <div className="col-lg-6">
              <button
                type="button"
                className="btn btn-primary" style={{border:"1.5px solid black"}}
                onClick={handleAddFamilyMember}
              >
                Add more
              </button>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="row">
            <div className="col-lg-6">
              <textarea
                className="form-control-lg m-2 w-75"
                placeholder="Additional notes"
                style={{border:"2px solid black"}}
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
            <div className="col-lg-6"></div>
          </div>
          {/* Submit Button */}
          <div className="row">
            <div className="col-lg-6"></div>
            <div className="col-lg-6">
              <button className="btn btn-info btn-lg m-2" style={{border:"1.5px solid black"}}>Update</button>
            </div>
          </div>
        </form>

     

      </main>
    </>
  );
};

export default UpdateContacts;
