import React from "react";

function InputCheckBox(props) {
  return (
    <div>
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="form-checkbox rounded border border-gray-200 h-6 w-6"
          checked={props.checked}
          onChange={props.onChange}
        />
        <span className="ml-2 text-lg">{props.label}</span>
      </label>
    </div>
  );
}

export default InputCheckBox;
