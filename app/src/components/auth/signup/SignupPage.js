import React, {Component} from 'react';
import {Formik} from "formik";
import {signup} from '../../../services/auth';
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

    handleSubmit(values, actions) {
        submitForm(signup, values, actions)
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
