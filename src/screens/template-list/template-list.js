import React, { useState } from "react";
import { Header, ListItems, FormModal } from "../../components";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './template-list.css'

function TemplateList() {
    const history = useHistory()
    const [currentTemplate, setCurrentTemplate] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const templates = useSelector((state) => state?.persistedSlice?.templates);

    return (
        <React.Fragment>
            <Header hasButton title="Template List" onButtonClick={() => { history.push('/create-template') }} />
            <ListItems
                data={templates}
                renderItem={(item, index) => <div key={index} onClick={() => { setIsOpen(true); setCurrentTemplate(item) }}
                    className="listDiv">{item.templateName}</div>}
            />
            {
                isOpen && <FormModal onClose={() => setIsOpen(false)} title={currentTemplate?.templateName} fields={currentTemplate.fieldsArr} />
            }
        </React.Fragment >
    );
}

export default TemplateList;