"use strict";

export default (jsonData, fileName) => {
  let dataStr = JSON.stringify(jsonData, undefined, 4);
  let dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  let exportFileDefaultName = `${fileName}.json`;

  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
};
