import React, {Component} from 'react';
import apiActions from "../../../services/apiActions";
import {getSubDomain} from "../../../utils/helpers";
import {setInvite, refreshAuth} from "../../../store/actions/auth";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getCurrentUser} from "../../../store/selectors/auth";

class InvitePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: this.props.match.params.code,
            checkResult: null,
        };
    }

    componentDidMount() {
        const {code} = this.state;
        const subdomain = getSubDomain();
        apiActions.get(`/auth/${subdomain}/invites/${code}`)
            .then(data => {
                if (this.props.user) {
                    apiActions.put(`/auth/${subdomain}/invites/${code}`)
                        .then(() => this.props.refreshAuth());
                } else {
                    this.props.setInvite(code, data.bookspace.name);
                }
            })
            .catch(error => {
                this.setState({checkResult: false});
            });
    }

    isInviteSavedInStore() {
        const {code} = this.state;
        const {invite} = this.props;
        return Boolean(invite && invite.code === code);
    }


    render() {
        const {checkResult} = this.state;
        if (this.isInviteSavedInStore()) {
            return <Redirect to="/signup"/>;
        }
        if (this.props.user && this.props.user.bookspace_id) {
            return <Redirect to="/invited"/>;
        }
        return (
            <div className="form-page">
                <div className="form-page-form">
                    {checkResult === null && <div>Checking invite link...</div>}
                    {checkResult === false &&
                    <div>Invite link is not valid or expired.<br/>Please, check that you copied it correctly.</div>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        invite: state.auth.invite,
        user: getCurrentUser(state),
    };
};

const mapDispatchToProps = {
    setInvite,
    refreshAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(InvitePage);