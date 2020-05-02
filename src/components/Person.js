import React from "react";

const Person = ({ person, number, handleCLick }) => {
  return (
    <li className="person">
      {person} {number} <button onClick={handleCLick}>delete</button>
    </li>
  );
};

export default Person;
