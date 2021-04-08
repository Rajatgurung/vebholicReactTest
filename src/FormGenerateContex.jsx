import React, { useReducer, useState } from "react";
import FormGenerateReducer from "./FormGenerateReducer";

// this is the equivalent to the createStore method of Redux

const FormGenerateContext = React.createContext({});

// creating Provider and Consumer and exporting them.

export const FormGenerateProvider = (props) => {
  const [data, dispatch] = useReducer(FormGenerateReducer, [
    {
      id: `${Date.now()}`,
      name: `section`,
      fields: [],
    },
  ]);

  return (
    <FormGenerateContext.Provider value={{ data, dispatch }}>
      {props.children}
    </FormGenerateContext.Provider>
  );
};

export const FormGenerateConsumer = FormGenerateContext.Consumer;

export default FormGenerateContext;
