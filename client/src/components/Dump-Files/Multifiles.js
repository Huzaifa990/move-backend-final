import React, { useState } from "react";

function TopBar() {
  const [activeOption, setActiveOption] = useState("users");

  function handleOptionClick(option) {
    setActiveOption(option);
  }

  return (
    <>
    <div className="top-bar">
      <div
        className={`option ${activeOption === "users" ? "active" : ""}`}
        onClick={() => handleOptionClick("users")}
      >
        Users
      </div>
      <div
        className={`option ${activeOption === "listings" ? "active" : ""}`}
        onClick={() => handleOptionClick("listings")}
      >
        Listings
      </div>
      </div>
      <div>
      {activeOption === "users" ? (
        <UsersTable />
      ) : (
        <ListingsTable />
      )}
    </div>
    </>
  );
}

function UsersTable() {
  return <div>This is the users table</div>;
}

function ListingsTable() {
  return <div>This is the listings table</div>;
}

export default TopBar;
