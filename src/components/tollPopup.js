import React, { Component, useState } from "react";
import MultipleSelect from "./multipleSelect";
export default function TollPopUp(props) {
  function handleClick() {
    props.toggle();
  }

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &times;{" "}
        </span>

        <div>
          <MultipleSelect handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
