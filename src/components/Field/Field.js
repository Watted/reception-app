import React from "react";
import './Field.css';

const Field = (props)=> {

    const extractValue = (event) => {
        props.onChange(event.target.name, event.target.value);
    };

    return (
        <p className="field-wrapper">
                    <label className="field-label" htmlFor={props.name}>{props.name}:</label>
                    <input className="field-input"
                           type={props.type || 'text'} name={props.name} onChange={extractValue}/>
        </p>
    );
};

export default Field;