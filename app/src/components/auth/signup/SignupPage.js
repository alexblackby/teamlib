import React, {Component} from 'react';
import {submitForm} from '../../../services/forms';
import validate from '../signup/validate';
import SignupForm from "./SignupForm";
import {connect} from "react-redux";
import Form from "../../common/Form";
import {clearInvite} from "../../../store/actions/auth";

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
        const {invite} = this.props;
        values = addSubdomain(values);
        if (invite && invite.code) {
            values.invite = invite.code;
        }
        submitForm('/auth/signup', values, actions)
            .then(data => {
                this.props.clearInvite();
                return data;
            })
            .then(data => this.props.history.push('/need-verification', {email: data.user.email}))
            .catch(error => {});
    }

    render() {
        return (
            <div className="form-page">
                <Form
                    component={SignupForm}
                    validate={validate}
                    initialValues={this.initialValues}
                    onSubmit={this.handleSubmit}
                    invite={this.props.invite}
                    onClearInvite={this.props.clearInvite}
                />
            </div>
        );
    }
}

const addSubdomain = (values) => {
    const hostnameParts = window.location.hostname.split('.');
    return {...values, subdomain: (hostnameParts.length > 2) ? hostnameParts[0] : undefined};
};

const mapStateToProps = (state) => {
    return {
        invite: state.auth.invite,
    };
};

const mapDispatchToProps = {
    clearInvite,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
