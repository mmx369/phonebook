import React from "react";

const Person = ({ person, number }) => {
  return (
    <li>
      {person} {number}
    </li>
  );
};

export default Person;
