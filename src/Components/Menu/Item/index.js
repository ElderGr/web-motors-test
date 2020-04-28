import React from "react";
import './styles.css';


export default function Item({ img, imgAlt, spanText, mainText, selected, event }) {
    return (
        <div className={`menu-item ${selected ? 'active' : ''}`} onClick={event}>
            <div>
                <img src={img} alt={imgAlt} />
            </div>
            <div>
                <span>{spanText}</span>
                <h2>{mainText}</h2>
            </div>
        </div>
    )
}