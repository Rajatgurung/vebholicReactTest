import React, { useEffect, useState } from "react";

function DropDown(props) {
  const [ShowOption, setShowOption] = useState(false);
  const closeMenu = () => {
    setShowOption(false);
    document.removeEventListener("click", closeMenu);
  };
  const openMenu = () => {
    setShowOption(true);
    setTimeout(() => document.addEventListener("click", closeMenu), 100);
  };

  return (
    <div className=" text-gray-400 relative cursor-pointer">
      <div onClick={() => (ShowOption ? closeMenu() : openMenu())}>
        {props.icon ? (
          props.icon
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        )}
      </div>

      <div
        className={`absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden border border-gray-300 shadow-xl z-20 ${
          !ShowOption && " hidden"
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}

export default DropDown;
