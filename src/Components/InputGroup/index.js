import React from "react";
import './styles.css'

import SelectComponent from "../SelectComponent";

import { FaMapMarkerAlt, FaTimesCircle } from "react-icons/fa";

export default function InputGroup(props) {
    return (
        <div style={{ width: '100%', display: 'flex' }}>
            <div className='main-input'>
                <FaMapMarkerAlt />
                <div>
                    <span>Onde: </span>
                    <span>São Paulo - SP</span>
                </div>
                <FaTimesCircle />
            </div>
            <SelectComponent
                data={[]}
                selectedValue={() => true && '100KM'}
                event={() => { }}
                disabled={false}
                fixedPlaceholder='Raio: '
                size='20%'
            />
        </div>
    )
}