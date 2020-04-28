import React, { useState } from "react";
import './styles.css';

export default function SelectComponent({ data, selectedValue, event, disabled, fixedPlaceholder, size }) {
    
    const [collapse, setCollapse] = useState(true);

    
    return (
        <div style={{width: size, position:'relative'}} className='select-content'>
            <div disabled={disabled} className={`select-container ${disabled ? 'disabled' : ''}`} onClick={() => !disabled && setCollapse(!collapse)}>
                <span>{fixedPlaceholder} </span><span>{selectedValue()}</span>
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
