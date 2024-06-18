import React from "react";

const Member = ({ member, deleteMember, startEditing }) => {
  const { _id, firstName, lastName, dob, country, city } = member;

  // Check if today is the member's birthday
  const today = new Date();
  const birthDate = new Date(dob);
  const isBirthday =
    today.getDate() === birthDate.getDate() &&
    today.getMonth() === birthDate.getMonth();

  return (
    <div
      className={`relative p-6 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ${
        isBirthday ? "border-2 border-yellow-500" : ""
      }`}
      style={{ paddingTop: isBirthday ? "3rem" : "2rem" }}>
      {isBirthday && (
        <div className="absolute top-0 px-4 py-1 font-bold text-white transform -translate-x-1/2 bg-yellow-500 rounded-b text-nowrap left-1/2">
          🎉 Happy Birthday! 🎉
        </div>
      )}
      <button
        onClick={() => startEditing(member)}
        className="absolute text-blue-500 top-2 left-2 hover:text-blue-700">
        &#9998;
      </button>
      <button
        onClick={() => deleteMember(_id)}
        className="absolute text-red-500 top-1 right-3 hover:text-red-700">
        &times;
      </button>
      <h3 className="mb-2 text-2xl font-bold text-blue-600">
        {firstName} {lastName}
      </h3>
      <p className="mb-1 text-gray-700">
        <span className="font-semibold">Date of Birth:</span>{" "}
        {new Date(dob).toLocaleDateString()}
      </p>
      <p className="mb-1 text-gray-700">
        <span className="font-semibold">Country:</span> {country}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">City:</span> {city}
      </p>
    </div>
  );
};

export default Member;
