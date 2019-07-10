import "./panel.scss";

import * as React from "react";

export function Panel(props) {
    return (
        <div className={(props.className || "") + " panel"}>
            {props.children}
        </div>
    );
}
