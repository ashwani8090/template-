import React from 'react';
import TextField from '../textfield/textField'
import "./form-model.css";

const FormModal = ({ fields = [], title = "", onClose = () => { } }) => {

    return (<div className='form-model'>
        <div className='form-content'>
            <div className='form-header'>
                <span className='form-title'>{title}</span>
                <button onClick={onClose}>Clode Modal</button>
            </div>
            {
                fields.map((item) => {
                    console.log('item: ', item);
                    if (item?.type === 'TEXTFIELD') {
                        return (<TextField
                            label={item?.label}
                            item={item}
                            placeholder={item?.placeholder}
                        />)
                    }
                    if (item?.type === 'DROPDOWN') {
                        return (<div className='dropdown'>
                            <label for={item?.label}>{item?.label}</label>
                            <select name={item?.label} id={item?.label}>
                                {
                                    item?.options.map((o) => {
                                        return (
                                            <option value={o.id}>{o.value}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>)
                    }
                    return null;
                })
            }
        </div>
    </div>)

}

export default FormModal;