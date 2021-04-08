import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormGenerateProvider } from "./FormGenerateContex";

const BootStrap = () => {
  return (
    <React.StrictMode>
      <FormGenerateProvider>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </FormGenerateProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<BootStrap></BootStrap>, document.getElementById("root"));
