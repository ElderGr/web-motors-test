import React from "react";

import './styles.css';

export default function CheckBox({text}){
    return(
        <label className="container">
            {text}
            <input type="checkbox"/>
            <span className="checkmark"></span>
        </label>
    )
}