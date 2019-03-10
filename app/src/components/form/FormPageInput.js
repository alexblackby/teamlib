import React from 'react';
import {Field, ErrorMessage} from 'formik';

const FormPageInput = (props) => {
    const {name, label, ...otherProps} = props;
    return (
        <div className="form-page-line">
            <div className="form-page-line-label">{label}</div>
            <Field name={name} className="form-page-line-input" {...otherProps}/>
            <ErrorMessage name={name} component="div" className="form-page-line-error"/>
        </div>
    );
};

export default FormPageInput;