import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MemberForm = ({ addMember }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const calculateAge = (dob) => {
    const diff = Date.now() - new Date(dob).getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMember = { firstName, lastName, dob, country, city };

    // Validate age
    if (calculateAge(dob) < 18) {
      setError("Member must be at least 18 years old.");
      toast.error("Member must be at least 18 years old.");
      return;
    }

    // Check for duplicates
    try {
      const response = await axios.get("http://localhost:5000/members");
      const members = response.data;
      const duplicate = members.find(
        (member) =>
          member.firstName === firstName &&
          member.lastName === lastName &&
          member.country === country &&
          member.city === city
      );
      if (duplicate) {
        setError("A member with the same name and location already exists.");
        toast.error("A member with the same name and location already exists.");
        return;
      }
    } catch (error) {
      console.error("There was an error fetching the members:", error);
      setError("An error occurred. Please try again.");
      setError("An error occurred. Please try again.");
      return;
    }

    // Submit form
    try {
      const response = await axios.post(
        "http://localhost:5000/members",
        newMember
      );
      addMember(response.data);
      setFirstName("");
      setLastName("");
      setDob("");
      setCountry("");
      setCity("");
      setError("");
      toast.success("Member added successfully");
    } catch (error) {
      console.error("There was an error adding the member:", error);
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 space-y-4 bg-white rounded-lg shadow-lg">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Add Member
      </button>
    </form>
  );
};

export default MemberForm;
