import React, { useEffect, useState } from "react";
import TextField from "../textfield/textField";
import './dropdown.css'

const DropdownComponent = ({ index, item, onValueAdded, valueKey }) => {
  const [options, setOptions] = useState([]);
  const onAddOption = () => {
    setOptions([...options, { id: new Date().getTime() }])
  }

  useEffect(() => {
    onValueAdded(options);
    onValueAdded({ item, value: options, valueKey })
  }, [options])

  const onChangeField = (data) => {
    const optArr = options.map((opt) => {
      if (opt.id === data?.item?.id) {
        opt.value = data?.value;
      }
      return opt;
    })
    setOptions(optArr)
  }

  const onDelete = (item) => {
    setOptions(options.filter(x => x.id !== item?.id))
  }

  return (
    <div className="dropdown">
      <div className="dropdown--row dropdown--margin">
        <div>Dropdown Options</div>
        <button className="add-btn" onClick={onAddOption}>+</button>
      </div>
      <div>
        {options.map((item) => {
          return (
            <div key={item.id} className="dropdown--row">
              <TextField
                valueKey='label'
                item={item}
                value={item.value}
                onChangeField={onChangeField}
              />
              <button onClick={() => onDelete(item)} className="add-btn">X</button>
            </div>
          )
        })}
      </div>

    </div>
  );
};

export default React.memo(DropdownComponent);
