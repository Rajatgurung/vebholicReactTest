import React from "react";
import { useDrag } from "react-dnd";
import DropItemType from "../DropItemType";

function FormItem(props) {
  const [{ isDragging }, drag] = useDrag({
    type: props.dropType,
    item: props.data,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      className={`${isDragging && "border border-dashed border-gray-600"} ${
        props.className
      } `}
    >
      <div
        ref={drag}
        className={`p-2 border bg-white border-gray-200 ${
          isDragging && "opacity-5"
        }`}
      >
        {props.label}
      </div>
    </div>
  );
}

export default FormItem;
