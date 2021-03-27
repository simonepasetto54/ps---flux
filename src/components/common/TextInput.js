import React from 'react';
import PropTypes from "prop-types";

const TextInput = props => {
    let wrapperClass = "form-group";
    if (props.error.length > 0) {
        wrapperClass += 'has-error';
    }
    return (
        <div className={wrapperClass}>
            <label htmlFor={props.id}>{props.label}</label>
            <div className="field">
                <input
                    id={props.id}
                    type="text"
                    name={props.name}
                    onChange={props.onChange}
                    className="form-control"
                    value={props.value}
                //value="" se provassimo a digitare con value="" React non ci permette di scrivere, questo è un componente controllato (controlled component)
                />
            </div>
            {// and operator esegue il codice a destra se quello a sinistra è true
                props.error && <div className="alert alert-danger">
                    {props.error}
                </div>
            }
        </div>
    )
}

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string
};

TextInput.defaultProps = {
    error: ""
}


export default TextInput

