import React from "react";

const PersonForm = ({
  valueName,
  valueNumber,
  onChangeName,
  onChangeNumber,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={valueName} onChange={onChangeName} />
      </div>
      <div>
        number: <input value={valueNumber} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
