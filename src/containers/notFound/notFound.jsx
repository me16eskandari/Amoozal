import "./notFound.scss";

import * as React from "react";
import { NavLink } from "react-router-dom";

export function NotFound() {
    return (
        <div className="not-found">
            <h1>Sorry, this page isn't available.</h1>
            <h3>
                The link you followed may be broken, or the page may have been removed. <NavLink to="/">Go back to home page</NavLink>
            </h3>
        </div>
    );
}
