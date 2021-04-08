import React from "react";
import TextInput from "./Catogery/TextInput";

function index(props) {
  switch (props.type) {
    case "text":
      return <TextInput {...props} />;
    default:
      return <TextInput {...props} />;
  }
}

export default index;
