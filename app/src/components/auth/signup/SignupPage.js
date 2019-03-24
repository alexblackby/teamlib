import React, {Component} from 'react';
import {Formik} from "formik";
import {submitForm} from '../../../services/forms';
import validate from '../signup/validate';
import SignupForm from "./SignupForm";


class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.initialValues = {
            email: '',
            name: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addSubdomain(values) {
        const hostnameParts = window.location.hostname.split('.');
        return {...values, subdomain: (hostnameParts.length > 2) ? hostnameParts[0] : undefined};
    }

    handleSubmit(values, actions) {
        values = this.addSubdomain(values);
        submitForm('/auth/signup', values, actions)
            .then(data => this.props.history.push('/need-verification', {email: data.user.email}))
            .catch(error => {});
    }

    render() {
        return (
            <div className="form-page">
                <Formik
                    initialValues={this.initialValues}
                    onSubmit={this.handleSubmit}
                    validate={validate}
                    component={SignupForm}
                />
            </div>
        );
    }
}

export default SignupPage;
