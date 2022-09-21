import React from "react";
import './textfield.css'

const TextFieldComponent = ({
  item,
  onChangeField = () => { },
  label = "",
  valueKey = "",
  value,
  placeholder = "" }) => {

  return (
    <div className="text-field-comp ">
      <div className="text-field-container">
        <label className="mb10" for={"text-field"}>
          {`${label} ${item?.isRequired && "*"}` }
        </label>
        <input
          value={value}
          onChange={(e) => {
            onChangeField({ item, value: e.target.value, valueKey })
          }}
          id={"text-field"}
          className={"text-field-name"}
          type={"text"}
          placeholder={placeholder || "enter text field name"}
        />
      </div>
    </div>
  );
};

export default React.memo(TextFieldComponent);
