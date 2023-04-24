import React from "react";
import user from "../styles/user.scss";
import avatar from "../assets/avatar.png";
import { auth } from "../firebase";

export default function User({ user, selectUser, selectedUser }) {
  return (
    <div className="user">
      <div
        className="user-info"
        onClick={() => selectUser(user)}
        style={{
          backgroundColor: selectedUser.uid === user.uid ? "#616161" : "",
        }}
      >
        <div className="user-details">
          <img
            src={user.profilePic !== null ? user.profilePic : avatar}
            alt="avatar"
          />
          <h4>{user.name}</h4>
        </div>
        <div className={user.isOnline ? "online" : "offline"}></div>
      </div>
    </div>
  );
}
