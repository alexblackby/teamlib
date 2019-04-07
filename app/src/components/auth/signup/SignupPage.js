import React, {Component} from 'react';
import {connect} from "react-redux";
import {submitForm} from '../../../services/forms';
import validate from '../signup/validate';
import SignupForm from "./SignupForm";
import Form from "../../common/Form";
import {clearInvite} from "../../../store/actions/auth";
import {doNothing, getSubdomain} from "../../../utils/helpers";

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.initialValues = {
            email: '',
            name: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickOpenId = this.onClickOpenId.bind(this);
    }

    handleSubmit(values, actions) {
        const {invite} = this.props;
        values.subdomain = getSubdomain();
        if (invite && invite.code) {
            values.invite = invite.code;
        }
        submitForm('/auth/signup', values, actions)
            .then(data => {
                this.props.clearInvite();
                return data;
            })
            .then(data => this.props.history.push('/need-verification', {email: data.user.email}))
            .catch(doNothing);
    }

    onClickOpenId(provider) {
        return () => {
            this.props.history.push('/openid/' + provider + '/start');
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className="form-page">
                <Form
                    component={SignupForm}
                    validate={validate}
                    initialValues={this.initialValues}
                    onSubmit={this.handleSubmit}
                    invite={this.props.invite}
                    onClearInvite={this.props.clearInvite}
                    onClickOpenId={this.onClickOpenId}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        invite: state.auth.invite,
    };
};

const mapDispatchToProps = {
    clearInvite,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
