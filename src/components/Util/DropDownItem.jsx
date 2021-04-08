import React from "react";

function DropDownItem(props) {
  return (
    <>
      <button
        onClick={props.onClick}
        className="block text-left w-full px-4 py-2 text-lg font-semibold text-gray-700  hover:bg-gray-200"
      >
        {props.name}
      </button>
    </>
  );
}

export default DropDownItem;
