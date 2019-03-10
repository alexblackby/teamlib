import React, {Component} from 'react';
import {Formik} from "formik";
import {login} from '../../../services/auth';
import {submitForm} from "../../../services/forms";
import validate from './validate';
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {setCurrentUser} from "../../../store/actions/auth";


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.initialValues = {
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values, actions) {
        submitForm(login, values, actions)
            .then(data => this.props.setCurrentUser(data))
            .catch(error => {
            });
    }

    render() {
        return (
            <div className="form-page">
                <Formik
                    initialValues={this.initialValues}
                    onSubmit={this.handleSubmit}
                    validate={validate}
                    component={LoginForm}
                />
            </div>
        );
    }
}

const mapDispatchToProps = {
    setCurrentUser
};

export default connect(null, mapDispatchToProps)(LoginPage);
