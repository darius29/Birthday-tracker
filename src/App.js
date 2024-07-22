import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemberForm from "./components/MemberForm";
import EditMemberForm from "./components/EditMemberForm";
import MemberList from "./components/MemberList";

const App = () => {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/members");
        setMembers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the members:", error);
        toast.error("Error fetching members");
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const addMember = (member) => {
    setMembers([...members, member]);
  };

  const updateMember = (updatedMember) => {
    setMembers(
      members.map((member) =>
        member._id === updatedMember._id ? updatedMember : member
      )
    );
    setEditingMember(null);
  };

  const deleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/members/${id}`);
      setMembers(members.filter((member) => member._id !== id));
      toast.success("Member deleted successfully");
    } catch (error) {
      console.error("There was an error deleting the member:", error);
      toast.error("Error deleting member");
    }
  };

  const startEditing = (member) => {
    setEditingMember(member);
  };

  const cancelEditing = () => {
    setEditingMember(null);
  };

  const sortedMembersByBirthday = () => {
    const today = new Date();
    return [...members].sort((a, b) => {
      const nextBirthdayA = new Date(a.dob);
      const nextBirthdayB = new Date(b.dob);
      nextBirthdayA.setFullYear(today.getFullYear());
      nextBirthdayB.setFullYear(today.getFullYear());

      if (nextBirthdayA < today)
        nextBirthdayA.setFullYear(today.getFullYear() + 1);
      if (nextBirthdayB < today)
        nextBirthdayB.setFullYear(today.getFullYear() + 1);

      const isTodayA =
        today.getDate() === nextBirthdayA.getDate() &&
        today.getMonth() === nextBirthdayA.getMonth();
      const isTodayB =
        today.getDate() === nextBirthdayB.getDate() &&
        today.getMonth() === nextBirthdayB.getMonth();

      if (isTodayA && !isTodayB) return -1;
      if (!isTodayA && isTodayB) return 1;

      return nextBirthdayA - nextBirthdayB;
    });
  };

  const filteredMembers = members.filter(
    (member) =>
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-5 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500">
      <ToastContainer />
      <h1 className="mb-8 text-4xl font-bold text-gray-800">Cake Tracker</h1>

      <div className="w-full max-w-2xl">
        {editingMember ? (
          <EditMemberForm
            member={editingMember}
            onUpdate={updateMember}
            onCancel={cancelEditing}
          />
        ) : (
          <MemberForm addMember={addMember} />
        )}
      </div>

      <div className="w-full max-w-2xl mt-10">
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full max-w-4xl mt-2">
        <h2 className="mt-10 mb-4 text-3xl font-semibold text-gray-800">
          Members Sorted by Upcoming Birthdays
        </h2>
        <MemberList
          members={sortedMembersByBirthday()}
          deleteMember={deleteMember}
          startEditing={startEditing}
        />

        <h2 className="mt-10 mb-4 text-3xl font-semibold text-gray-800">
          All Members
        </h2>
        <MemberList
          members={filteredMembers}
          deleteMember={deleteMember}
          startEditing={startEditing}
        />
      </div>
    </div>
  );
};

export default App;
