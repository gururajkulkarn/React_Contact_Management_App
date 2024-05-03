import React, { useState } from "react";
import axios from "axios";

function MyForm() {
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

  const [formData, setFormData] = useState({
    name: "",
    contactDetail: {
      phone: "",
      email: "",
    },
    importantDates: [{ date: "", type: "" }],
    familyMembers: [
      {
        name: "",
        relationship: "",
        category: "",
        importantDates: [{ date: "", type: "" }],
        contactDetail: {
          phone: "",
          email: "",
        },
      },
    ],
    addresses: [
      {
        type: "",
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

  const handleAdditionalNotesChange = (e) => {
    setFormData({ ...formData, additionalNotes: e.target.value });
  };

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setFormData({
      ...formData,
      contactDetail: {
        ...formData.contactDetail,
        phone: e.target.value,
      },
    });
  };

  const handleEmailChange = (e) => {
    setFormData({
      ...formData,
      contactDetail: {
        ...formData.contactDetail,
        email: e.target.value,
      },
    });
  };

  const handleImportantDateChange = (e, index) => {
    const updatedImportantDates = [...formData.importantDates];
    updatedImportantDates[index][e.target.name] = e.target.value;
    setFormData({ ...formData, importantDates: updatedImportantDates });
  };

  const handleFamilyMemberChange = (e, index) => {
    const updatedFamilyMembers = [...formData.familyMembers];
    updatedFamilyMembers[index][e.target.name] = e.target.value;
    setFormData({ ...formData, familyMembers: updatedFamilyMembers });
  };

  const handleFamilyMemberImportantDateChange = (e, index, subIndex) => {
    const updatedFamilyMembers = [...formData.familyMembers];
    updatedFamilyMembers[index].importantDates[subIndex][e.target.name] =
      e.target.value;
    setFormData({ ...formData, familyMembers: updatedFamilyMembers });
  };

  const handleFamilyMemberPhoneChange = (e, index) => {
    const updatedFamilyMembers = [...formData.familyMembers];
    updatedFamilyMembers[index].contactDetail.phone = e.target.value;
    setFormData({ ...formData, familyMembers: updatedFamilyMembers });
  };

  const handleFamilyMemberEmailChange = (e, index) => {
    const updatedFamilyMembers = [...formData.familyMembers];
    updatedFamilyMembers[index].contactDetail.email = e.target.value;
    setFormData({ ...formData, familyMembers: updatedFamilyMembers });
  };

  const addImportantDate = () => {
    setFormData({
      ...formData,
      importantDates: [...formData.importantDates, { date: "", type: "" }],
    });
  };

  const addAddress = () => {
    setFormData({
      ...formData,
      addresses: [
        ...formData.addresses,
        {
          type: "",
          street1: "",
          street2: "",
          city: "",
          state: "",
          country: "",
          zip: "",
        },
      ],
    });
  };

  const addFamilyMember = () => {
    setFormData({
      ...formData,
      familyMembers: [
        ...formData.familyMembers,
        {
          name: "",
          relationship: "",
          category: "",
          importantDates: [{ date: "", type: "" }],
          contactDetail: {
            phone: "",
            email: "",
          },
        },
      ],
    });
  };

  const removeImportantDate = (index) => {
    const updatedImportantDates = [...formData.importantDates];
    updatedImportantDates.splice(index, 1);
    setFormData({ ...formData, importantDates: updatedImportantDates });
  };

  const removeFamilyMember = (index) => {
    const updatedFamilyMembers = [...formData.familyMembers];
    updatedFamilyMembers.splice(index, 1);
    setFormData({ ...formData, familyMembers: updatedFamilyMembers });
  };

  const handleSubmit = async (e) => {
    addTokenToHeaders();
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8888/v1/contacts",
        formData
      );
      console.log(response.data); // Handle successful response
    } catch (error) {
      console.error("Error:", error); // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleNameChange}
      />

      <label htmlFor="phone">Phone:</label>
      <input
        type="text"
        id="phone"
        name="phone"
        value={formData.contactDetail.phone}
        onChange={handlePhoneChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        value={formData.contactDetail.email}
        onChange={handleEmailChange}
      />

      <h2>Important Dates</h2>
      {formData.importantDates.map((date, index) => (
        <div key={index}>
          <label>Date:</label>
          <input
            type="date"
            value={date.date}
            onChange={(e) => handleImportantDateChange(e, index)}
          />
          <label>Type:</label>
          <input
            type="text"
            value={date.type}
            name="type"
            onChange={(e) => handleImportantDateChange(e, index)}
          />
          <button type="button" onClick={() => removeImportantDate(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addImportantDate}>
        Add Important Date
      </button>

      <h2>Family Members</h2>
      {formData.familyMembers.map((member, index) => (
        <div key={index}>
          <label>Name:</label>
          <input
            type="text"
            value={member.name}
            name="name"
            onChange={(e) => handleFamilyMemberChange(e, index)}
          />
          <label>Relationship:</label>
          <input
            type="text"
            value={member.relationship}
            name="relationship"
            onChange={(e) => handleFamilyMemberChange(e, index)}
          />
          <label>Category:</label>
          <input
            type="text"
            value={member.category}
            name="category"
            onChange={(e) => handleFamilyMemberChange(e, index)}
          />
          <h3>Important Dates</h3>
          {member.importantDates.map((date, subIndex) => (
            <div key={subIndex}>
              <label>Date:</label>
              <input
                type="date"
                value={date.date}
                onChange={(e) =>
                  handleFamilyMemberImportantDateChange(e, index, subIndex)
                }
              />
              <label>Type:</label>
              <input
                type="text"
                value={date.type}
                name="type"
                onChange={(e) =>
                  handleFamilyMemberImportantDateChange(e, index, subIndex)
                }
              />
              <button
                type="button"
                onClick={() => removeImportantDate(subIndex)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addImportantDate(index)}>
            Add Important Date
          </button>
          <label>Phone:</label>
          <input
            type="text"
            value={member.contactDetail.phone}
            name="phone"
            onChange={(e) => handleFamilyMemberPhoneChange(e, index)}
          />
          <label>Email:</label>
          <input
            type="text"
            value={member.contactDetail.email}
            name="email"
            onChange={(e) => handleFamilyMemberEmailChange(e, index)}
          />
          <button type="button" onClick={() => removeFamilyMember(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addFamilyMember}>
        Add Family Member
      </button>

      <h2>Addresses</h2>
      {formData.addresses.map((address, index) => (
        <div key={index}>
          <label>Type:</label>
          <input
            type="text"
            value={address.type}
            name="type"
            onChange={(e) => handleAddressChange(e, index)}
          />
          <button type="button" onClick={() => removeAddress(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addAddress}>
        Add Address
      </button>

      <label htmlFor="additionalNotes">Additional Notes:</label>
      <textarea
        id="additionalNotes"
        name="additionalNotes"
        value={formData.additionalNotes}
        onChange={handleAdditionalNotesChange}
      ></textarea>

      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
