import React, { useContext, useState } from "react";
import DropDownItem from "../../Util/DropDownItem";
import Model from "../../Util/Model";
import Base from "./Base";
import InputText from "../../form/InputText";
import InputCheckBox from "../../form/InputCheckBox";
import FormGenerateContext from "../../../FormGenerateContex";
import FormActionType from "../../../FormGenerateActionType";

function TextInput(props) {
  const [openModel, setOpenModel] = useState(false);
  const { dispatch } = useContext(FormGenerateContext);
  const { data, sectionId } = props;
  const [localState, setLocalState] = useState(data);

  const removeMe = () => {
    dispatch({
      type: FormActionType.DELETE_FIELD,
      payload: { fieldId: data.id, sectionId },
    });
  };
  const closeModel = (reset = true) => {
    reset && resetFild();
    setOpenModel(false);
  };
  const resetFild = () => setLocalState(data);

  const saveField = () => {
    dispatch({
      type: FormActionType.UPDATE_FIELD,
      payload: {
        field: localState,
        sectionId,
      },
    });
    closeModel(false);
  };

  const addOption = () => {
    console.log(localState);
    setLocalState({
      ...localState,
      options: [
        ...localState.options,
        { lable: `example ${localState.options.length}` },
      ],
    });
  };
  const deleteOption = (index) => {
    const options = localState.options.filter((_, i) => i != index);
    setLocalState({ ...localState, options });
  };
  const dropDown = [
    <DropDownItem key="edit" name="Edit" onClick={() => setOpenModel(true)} />,
  ];

  const ModelFooter = () => (
    <div className=" py-4 text-right">
      <button
        onClick={closeModel}
        className="px-4 py-2 text-md text-blue-900 font-bold uppercase mr-2"
      >
        Cancel
      </button>
      <button
        onClick={saveField}
        className="px-4 py-2 text-md bg-blue-900 text-gray-100 font-bold rounded uppercase"
      >
        Save
      </button>
    </div>
  );

  return (
    <div>
      <Base
        {...{
          ...props,
          dropDown,
        }}
      ></Base>
      <Model open={openModel} close={closeModel} footer={<ModelFooter />}>
        <div className="my-6 ">
          <InputText
            label="Form Input"
            value={localState.lable}
            onChange={({ target: { value } }) =>
              setLocalState({ ...localState, lable: value })
            }
          />
          {localState.hasOptions && (
            <div className="mt-4">
              <div className="text-md font-semibold mb-2 text-gray-500">
                Options
              </div>
              <div className="p-2 bg-gray-200 flex flex-col gap-y-2">
                {localState.options.map((el, i) => (
                  <div
                    key={i}
                    className="bg-white w-full p-2 flex justify-between items-center"
                  >
                    <InputText
                      value={el.lable}
                      onChange={({ target: { value } }) => {
                        const index = i;
                        const options = localState.options;
                        options[index] = { lable: value };
                        setLocalState({ ...localState, options });
                      }}
                    />
                    <div className="flex gap-x-2">
                      <svg
                        onClick={addOption}
                        className="w-6 h-6 cursor-pointer text-gray-400 hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <svg
                        onClick={() => deleteOption(i)}
                        className="w-6 h-6 cursor-pointer text-gray-400 hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4">
            <InputCheckBox
              checked={localState.required}
              label="Required"
              onChange={() =>
                setLocalState({ ...localState, required: !localState.required })
              }
            ></InputCheckBox>
            <InputCheckBox
              checked={localState.tooTip}
              label="Show Tool Tips"
              onChange={() =>
                setLocalState({ ...localState, tooTip: !localState.tooTip })
              }
            ></InputCheckBox>
          </div>
        </div>
      </Model>
    </div>
  );
}

export default TextInput;
