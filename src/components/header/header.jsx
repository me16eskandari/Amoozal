import "./header.scss";

import * as React from "react";
import { Link } from "react-router-dom";

export function Header() {
    return (
        <header>
            <Link className="home-link" to="/">Amoozal</Link>
            <Link className="home-link" to="/add">Add</Link>
            <Link className="home-link" to="/test2">Test 2</Link>
        </header>
    );
}
