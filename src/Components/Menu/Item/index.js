import React from "react";
import './styles.css';


export default function Item({ img, imgAlt, spanText, mainText }) {
    return (
        <div className='menu-item'>
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