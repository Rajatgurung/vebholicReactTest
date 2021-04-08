import React, { useState } from "react";
function InputText(props) {
  return (
    <div className=" relative flex flex-col w-1/2">
      {props.label && (
        <label className="text-md  mb-2 font-semibold text-gray-500">
          {props.label}
        </label>
      )}

      <input
        className=" p-2 border bg-transparent  border-gray-500  focus:outline-none rounded"
        type="text"
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}

export default InputText;
