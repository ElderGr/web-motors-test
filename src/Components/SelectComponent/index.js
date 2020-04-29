import React, { useState } from "react";
import './styles.css';

import { FaSortDown } from "react-icons/fa";

export default function SelectComponent({ data, selectedValue, event, disabled, fixedPlaceholder, size }) {
    
    const [collapse, setCollapse] = useState(true);

    
    return (
        <div className={`select-content ${size === 'half' ? 'half': 'stretch'}`}>
            <div disabled={disabled} className={`select-container ${disabled ? 'disabled' : ''}`} onClick={() => !disabled && setCollapse(!collapse)}>
                <div>
                    <span>{fixedPlaceholder} </span>
                    <span>{selectedValue()}</span>
                </div>
                <FaSortDown />
            </div>
            {!collapse && (
                <div className='select-options-container'>
                    {data.map(item => (
                        <div onClick={() => {
                            event(item.ID);
                            setCollapse(!collapse);
                        }} 
                        key={item.ID}>
                            {item.Name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
