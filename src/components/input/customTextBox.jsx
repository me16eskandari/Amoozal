import "./customTextbox.scss";

import React from "react";

export function CustomTextBox(props) {
    return (
        <div className={(props.containerClassName || "") + " custom-text-box" + (props.error? " error" : "")}>
            <input
                type="text"
                onChange={props.onChange}
                value={props.value}
                placeholder={props.placeholder}
                className={(props.className || "")}
            />
            <span className="error">{props.error}</span>
        </div>
    );
}

