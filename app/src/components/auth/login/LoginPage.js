import React, {Component} from 'react';
import {Formik} from "formik";
import {submitForm} from "../../../services/forms";
import validate from './validate';
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {setCurrentUser} from "../../../actions/auth";
import {getCurrentUser} from '../../../store/selectors/auth';
import {Redirect} from "react-router-dom";

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
        submitForm('/auth/login', values, actions)
            .then(data => this.props.setCurrentUser(data))
            .catch(error => {
            });
    }

    render() {
        if (this.props.hasCurrentUser) {
            return <Redirect to="/"/>;
        }
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

const mapStateToProps = (state) => {
    return {
        hasCurrentUser: Boolean(getCurrentUser(state)),
    };
};

const mapDispatchToProps = {
    setCurrentUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
