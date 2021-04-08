import React, { useContext } from "react";
import FormGenerateActionType from "../../../FormGenerateActionType";
import FormGenerateContext from "../../../FormGenerateContex";
import DropDown from "../../Util/DropDown";
import DropDownItem from "../../Util/DropDownItem";

function Base(props) {
  const { data, sectionId } = props;
  const { dispatch } = useContext(FormGenerateContext);

  const removeMe = () => {
    dispatch({
      type: FormGenerateActionType.DELETE_FIELD,
      payload: { fieldId: data.id, sectionId },
    });
  };
  return (
    <div className="px-2 py-4 border border-gray-200 flex justify-between ">
      <div className="">{props.data.lable}</div>
      <div className=" text-gray-400">{props.data.name}</div>
      <DropDown>
        <DropDownItem key="delete" name="Delete" onClick={() => removeMe()} />
        {props.dropDown}
      </DropDown>
    </div>
  );
}

export default Base;
