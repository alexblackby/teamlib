import React from 'react';
import {Formik} from "formik";
import pick from 'lodash/pick';
import omit from 'lodash/omit';

const Form = (props) => {

    const formikPropNames = [
        'enableReinitialize',
        'isInitialValid',
        'initialStatus',
        'initialValues',
        'onReset',
        'onSubmit',
        'validate',
        'validateOnBlur',
        'validateOnChange',
        'validationSchema'
    ];

    const formikProps = pick(props, formikPropNames);
    const otherProps = omit(props, formikPropNames);
    const Component = props.component;

    const render = (renderProps) => {
        return (<Component {...renderProps} {...otherProps} />);
    };

    return <Formik render={render} {...formikProps} />;
};

export default Form;