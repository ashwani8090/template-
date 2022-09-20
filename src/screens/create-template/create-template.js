import { useState } from "react";
import { Dropdown, TextField, Header, FormModal } from "../../components";
import { setTemplateData } from '../../redux/slices/persistedSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import "./create-template.css";

function CreateTemplate() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const templates = useSelector((state) => state?.persistedSlice?.templates);
    const [notValid, setNotValid] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState();
    const [templateName, setTemplateName] = useState();
    const [fieldsArr, setFieldsArr] = useState([]);
    const inputsTypes = [
        { toolboxlabel: 'Text Field', type: 'TEXTFIELD' },
        { toolboxlabel: 'Dropdown', type: 'DROPDOWN' }];

    const onToolBoxSelect = (item) => {
        setFieldsArr((fields) => ([...fields, { ...item, id: new Date().getTime() }]))
    }

    const onDelete = (item) => {
        setFieldsArr(fieldsArr.filter(field => field.id !== item?.id))
    }

    const onChangeField = (data) => {
        setNotValid(false);
        const fields = fieldsArr.map((field) => {
            if (field.id === data?.item?.id) {
                field[data?.valueKey] = data.value;
                field.isRequired = data?.isRequired;
            }
            return field;
        })
        setFieldsArr(fields)
    }

    const ToolBar = () => {
        return (<div className="toolbox">
            <div className="toolbox-title">ToolBox</div>
            {
                inputsTypes.map((input, i) => <div key={i} className="toolbox--font-bold toolbox--font-red" onClick={() => onToolBoxSelect(input)}>{input?.toolboxlabel}</div>)
            }

        </div>)
    }

    const onSubmit = () => {
        const template = {
            templateName,
            fieldsArr,
            id: new Date().getTime()
        }
        const isNotValid = !templateName || fieldsArr.some((item) => {
            console.log('item: ', item);
            if (item?.type === "TEXTFIELD") {
                return !item?.placeholder || !item?.label
            } else {
                return !item?.label || !item?.options?.length
            }

        });
        console.log('isNotValid: ', isNotValid);
        setNotValid(isNotValid);
        setCurrentTemplate(template);
        if (!isNotValid && templateName) {
            dispatch(setTemplateData([...templates, template]));
            history.push('/')
        }
    }

    return (
        <>
            <Header title="Create Template" />
            {notValid && <span className="danger">Not Valid Form please add values</span>}
            <div className="container">
                <div className="form">
                    <div className="col-first">
                        <ToolBar />
                    </div>
                    <div className="col-sec">
                        <div className="template-name-row form-rows">
                            <div className="template-name-container">
                                <label className="mb10 textbox--bold" for={"template-name"}>
                                    {"Template Name"}{" "}
                                </label>
                                <input
                                    id={"template-name"}
                                    className={"template-name"}
                                    type={"text"}
                                    placeholder={"enter template name"}
                                    onChange={(e) => setTemplateName(e.target.value)}
                                />
                            </div>
                        </div>
                        {fieldsArr?.map((item, index) => {

                            return (
                                <div key={item?.id} className="form-rows add-item">
                                    <button onClick={() => onDelete(item)} className="delete-btn">Delete</button>
                                    <div>
                                        {item?.type === "TEXTFIELD" ?
                                            (<div>
                                                <TextField
                                                    label="Field Label"
                                                    valueKey='label'
                                                    item={fieldsArr[index]}
                                                    value={fieldsArr[index]['label']}
                                                    onChangeField={onChangeField}
                                                />
                                                <TextField
                                                    label="Field Placeholder"
                                                    valueKey='placeholder'
                                                    item={fieldsArr[index]}
                                                    value={fieldsArr[index]['placeholder']}
                                                    onChangeField={onChangeField}
                                                />
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        name="Required"
                                                        onChange={(e) => item.isRequired = e.target.checked}
                                                        className="checkbox" />
                                                    <label for="Required">Required</label>
                                                </div>
                                            </div>
                                            ) : item?.type === "DROPDOWN" ? (
                                                <div>
                                                    <TextField
                                                        label="Field Label"
                                                        valueKey='label'
                                                        item={fieldsArr[index]}
                                                        value={fieldsArr[index]['label']}
                                                        onChangeField={onChangeField}
                                                    />
                                                    <Dropdown
                                                        key={index}
                                                        valueKey="options"
                                                        item={fieldsArr[index]}
                                                        onValueAdded={onChangeField}
                                                    />
                                                    <div>
                                                        <input
                                                            type="checkbox"
                                                            name="Required"
                                                            onChange={(e) => item.isRequired = e.target.checked}
                                                            className="checkbox" />
                                                        <label for="Required">Required</label>
                                                    </div>
                                                </div>
                                            ) : null}
                                    </div>
                                </div>

                            )
                        }
                        )}
                    </div>
                </div>
                <div className="footer">
                    <button className="footer--btn footer--preview" onClick={() => {
                        const template = {
                            templateName,
                            fieldsArr,
                            id: new Date().getTime()
                        }
                        setCurrentTemplate(template);
                        setIsOpen(true);
                    }}>Preview</button>
                    <button className="footer--btn footer--submit" onClick={onSubmit}>Submit</button>
                </div>
                {
                    isOpen && <FormModal onClose={() => setIsOpen(false)} title={currentTemplate?.templateName} fields={currentTemplate.fieldsArr} />
                }
            </div>
        </>
    );
}

export default CreateTemplate;
