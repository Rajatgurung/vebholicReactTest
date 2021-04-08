import React, { useCallback, useContext, useState } from "react";
import { useDrop } from "react-dnd";
import DropItemType from "../DropItemType";
import FormGenerateContext from "../FormGenerateContex";
import FormBuilders from "./FormBuilders";
import DropDown from "./Util/DropDown";
import DropDownItem from "./Util/DropDownItem";
import FormActionType from "../FormGenerateActionType";
import { debounce } from "lodash";
const optonsType = ["drop_down", "radio"];
function FormSection(props) {
  const { data } = props;
  const { dispatch } = useContext(FormGenerateContext);
  const [sectionName, setSectionName] = useState(data.name);
  const removeMe = () => {
    dispatch({
      type: FormActionType.DELETE_SECTION,
      payload: { id: data.id },
    });
  };

  const updateSection = useCallback(
    debounce((val) => {
      dispatch({
        type: FormActionType.UPDATE_SECTION,
        payload: { section: { ...data, name: val } },
      });
    }, 500),
    []
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DropItemType.FormElType,
    drop: (item) => {
      console.log(item);
      dispatch({
        type: FormActionType.ADD_FILD,
        payload: {
          sectionId: data.id,
          field: {
            type: item.type,
            lable: item.lable,
            name: item.name,
            required: true,
            hasOptions: optonsType.includes(item.type),
            options: [{ lable: "example" }],
          },
        },
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 bg-white shadow-sm border border-gray-300 ${
        isOver && "border-dashed"
      }`}
    >
      <div className="flex mb-7 text-gray-800 items-center justify-between">
        <input
          type="text"
          className="text-lg font-semibold border border-gray-300 px-2 focus:outline-none focus:border-gray-800"
          value={sectionName}
          onChange={({ target }) => {
            setSectionName(target.value);
            updateSection(target.value);
          }}
        ></input>
        <div>
          <DropDown
            icon={
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            }
          >
            <DropDownItem onClick={removeMe} name="Delete" />
          </DropDown>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {data.fields?.length > 0 ? (
          data.fields?.map((field, i) => {
            return (
              <FormBuilders
                sectionId={data.id}
                type={field.type}
                data={field}
                key={field.id}
              />
            );
          })
        ) : (
          <div className="h-52 col-span-2 border-4 border-dashed border-gray-300 w-full flex justify-center items-center bg-gray-200 font-3xl font-bold text-gray-50">
            Drop Field Here
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(FormSection);
