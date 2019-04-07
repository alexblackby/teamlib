import React, {Component} from 'react';
import {deleteCookie, getCookie, getHashParam, getMainDomain} from "../../../utils/helpers";
import apiActions from "../../../services/apiActions";
import {setCurrentUser} from "../../../store/actions/auth";
import {connect} from "react-redux";
import {getCurrentUser} from "../../../store/selectors/auth";
import {Redirect} from "react-router-dom";

class OpenIdCallback extends Component {

    componentDidMount() {
        const provider = this.props.match.params.provider;
        const payload = {
            id_token: getHashParam('id_token'),
            subdomain: getCookie('openIdSubdomain'),
            invite: getCookie('invite'),
        };

        apiActions.post(`/auth/openid/${provider}/signup`, payload)
            .then(data => {
                deleteCookie('invite');
                deleteCookie('openIdSubdomain');
                this.props.setCurrentUser(data)
            })
            .catch(err => {
                console.log(err);
                //window.location.href = '//' + payload.subdomain + '.' + getMainDomain() + '/signup#openIdError';
            });
    }

    render() {
        if (this.props.user) {
            return <Redirect to="/"/>;
        }
        return (
            <div className="form-page">
                <div className="form-page-form">
                    <div>Signup in progress...</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: getCurrentUser(state),
    };
};

const mapDispatchToProps = {
    setCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenIdCallback);
