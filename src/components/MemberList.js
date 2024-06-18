import React from "react";
import Member from "./Member";

const MemberList = ({ members, deleteMember, startEditing }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {members.map((member, index) => (
        <Member
          key={index}
          member={member}
          deleteMember={deleteMember}
          startEditing={startEditing}
        />
      ))}
    </div>
  );
};

export default MemberList;
