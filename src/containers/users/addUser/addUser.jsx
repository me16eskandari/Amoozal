import "./addUser.scss";

import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { CustomTextBox } from "../../../components";
import { UsersService } from "../../../services";

export const AddUser = withRouter((props) => {

    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        id: null,
        firstnameError: null,
        lastnameError: null,
        emailError: null,
    });

    const validateInfo = () => {
        let success = true;
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const state = { ...data };

        if (!state.firstname || state.firstname.trim().length === 0) {
            state.firstnameError = "First name is required.";
            success = false;
        }
        else state.firstnameError = null;

        if (!state.lastname || state.lastname.trim().length === 0) {
            state.lastnameError = "Last name is required.";
            success = false;
        }
        else state.lastnameError = null;


        if (!state.email || state.email.trim().length === 0) {
            state.emailError = "Email is required.";
            success = false;
        }
        else if (!(reg.test(state.email.toLowerCase()))) {
            state.emailError = "Email is not valid.";
            success = false;
        }
        else state.emailError = null;

        setData({ ...state });
        return success;
    }

    useEffect(() => {
        validateInfo();
    }, [data.firstname, data.lastname, data.email])

    const valueChange = (event, field) => {
        const temp = { ...data };
        temp[field] = event.target.value;
        setData(temp);
    }

    const save = async () => {
        if (validateInfo()) {
            await UsersService.addUser(data.id, data);
            props.showNotif("User added successfully");
            props.history.push("/");
        }
    }

    const onCancel = () =>{
        props.history.push("/");
    }

    return (
        <div className="content">
            <div>
                <CustomTextBox
                    placeholder="First Name"
                    value={data.firstname}
                    error={data.firstnameError}
                    onChange={(event) => valueChange(event, "firstname")}
                />
                <CustomTextBox
                    placeholder="Last Name"
                    value={data.lastname}
                    error={data.lastnameError}
                    onChange={(event) => valueChange(event, "lastname")}
                />
                <CustomTextBox
                    placeholder="Email"
                    value={data.email}
                    error={data.emailError}
                    onChange={(event) => valueChange(event, "email")}
                />
            </div>
            <div className="buttons">
                <button onClick={onCancel}>Cancel</button>
                <button onClick={save}>Save</button>
            </div>
        </div>
    );
});
