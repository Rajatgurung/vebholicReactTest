import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Model(props) {
  const container = document.getElementById("model");
  const wrapper = document.createElement("div");

  useEffect(() => {
    container.appendChild(wrapper);
  }, [props]);
  useEffect(() => {
    return () => {
      return container.removeChild(wrapper);
    };
  }, []);
  if (!props.open) return null;
  return (
    <div className=" fixed flex z-10 justify-center items-center h-4/5  top-0 left-0  min-h-screen w-screen ">
      <div
        onClick={() => props.close()}
        className=" absolute h-full bg-gray-900 bg-opacity-75  top-0 w-full backdrop-blur-sm backdrop-filter"
      ></div>

      <div className=" absolute w-1/2 bg-gray-100 z-30">
        <div className=" w-full flex items-center justify-between bg-blue-900 p-6 text-gray-100 text-xl font-bold">
          <div>Single Line Properties</div>

          <div onClick={() => props.close()} className="cursor-pointer">
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        </div>
        <div className="px-6  overflow-y-scroll custome-scroll h-80">
          {props.children}
        </div>
        {props.footer && <div className="bg-blue-100 px-6">{props.footer}</div>}
      </div>
    </div>
  );
}

export default Model;
