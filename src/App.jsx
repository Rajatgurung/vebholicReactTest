import React, { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import BreadCrump from "./components/BreadCrump";
import FormItem from "./components/FormItem";
import FormSection from "./components/FormSection";
import DropItemType from "./DropItemType";
import FormGenerateContext from "./FormGenerateContex";
import ActionType from "./FormGenerateActionType";
import exportToJson from "./components/Util/exportToJson";

const formFilds = [
  { type: "text", name: "single Line", lable: "test" },
  { type: "text_area", name: "Multi Line", lable: "test" },
  { type: "drop_down", name: "Drop Down", lable: "test" },
  { type: "date", name: "Date", lable: "test" },
  { type: "radio", name: "Radio", lable: "test" },
];

function App() {
  const { data: section, dispatch } = useContext(FormGenerateContext);

  const [{ isOver }, SectionDrop] = useDrop(() => ({
    accept: DropItemType.SectionType,
    drop: (item) => {
      dispatch({ type: ActionType.ADD_SECTION });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const saveAsJoson = () => {
    exportToJson(section, `jsonPayload${Date.now()}`);
  };
  return (
    <div className="App flex">
      <div className="flex-grow border-r border-gray-300">
        <div
          style={{ marginRight: "-1px" }}
          className=" p-4 border-r-4 border-blue-900 bg-blue-800 text-white mt-10"
        >
          <svg
            className="w-6 h-6 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>
      </div>
      <div className=" w-full px-8">
        <BreadCrump path={["Home", "Form Builder", "Resource"]}></BreadCrump>
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className=" w-1/3">
              <small className=" text-gray-500">Brand</small>
              <h3 className="text-gray-700 text-md font-semibold">Zebra</h3>
            </div>
            <div className=" ml-4 flex-1 justify-start">
              <small className=" text-gray-500">Resource</small>
              <h3 className="text-gray-700 text-md font-semibold">Account</h3>
            </div>
            <div className=" justify-self-end">
              <button
                onClick={saveAsJoson}
                className=" py-2 px-4 mr-2 uppercase text-sm bg-blue-900 text-gray-50 font-bold rounded-sm"
              >
                Save
              </button>
              <button className="py-2 px-4 uppercase text-sm bg-blue-900 text-gray-50 font-bold rounded-sm">
                Close
              </button>
            </div>
          </div>
        </header>
        <main style={{ height: "30rem" }} className="flex  pb-4">
          <div className=" overflow-y-scroll custome-scroll w-1/3 grid grid-cols-2 gap-1 content-start p-2 border border-gray-300 rounded">
            {formFilds.map((field, i) => {
              return (
                <FormItem
                  key={i}
                  label={field.name}
                  data={field}
                  dropType={DropItemType.FormElType}
                ></FormItem>
              );
            })}
            <div className="h-0.5 my-2 w-full col-span-2 bg-gray-200"></div>
            <FormItem
              label="Add Section"
              className="col-span-2 pb-2 text-center"
              dropType={DropItemType.SectionType}
            ></FormItem>
          </div>

          <div
            ref={SectionDrop}
            className="overflow-y-scroll custome-scroll flex-1 flex-grow flex flex-col gap-y-5 p-2 ml-4 bg-gray-200"
          >
            {isOver ? (
              <div className="h-80 border-4 border-dashed border-blue-500 w-full flex justify-center items-center bg-blue-300 font-3xl font-bold text-gray-200">
                Drop To add Section
              </div>
            ) : (
              section.map((section) => (
                <FormSection key={section.id} data={section} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
