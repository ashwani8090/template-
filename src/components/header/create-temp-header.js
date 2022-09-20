import React from "react";
import './create-temp-header.css'

function Header({ title, onButtonClick = () => { }, hasButton = false }) {
    return (
        <React.Fragment>
            <div className="HeaderNav">
                <span>
                    {title}
                </span>
                {hasButton &&
                    <button className="create-btn" type="button" onClick={onButtonClick}> Create </button>}
            </div>

        </React.Fragment>
    );
}

export default Header; 