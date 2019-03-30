import React, {Component} from 'react';
import {Formik} from "formik";
import {submitForm} from "../../../services/forms";
import validate from './validate';
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {clearInvite, setCurrentUser} from "../../../store/actions/auth";
import {getCurrentUser} from '../../../store/selectors/auth';
import {Redirect} from "react-router-dom";
import {getSubDomain} from "../../../utils/helpers";

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
        values.invite = this.props.invite ? this.props.invite.code : undefined;
        values.subdomain = getSubDomain();
        submitForm('/auth/login', values, actions)
            .then(data => {
                this.props.clearInvite();
                return data;
            })
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
        invite: state.auth.invite,
    };
};

const mapDispatchToProps = {
    setCurrentUser,
    clearInvite,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
