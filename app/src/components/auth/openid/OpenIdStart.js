import React, {Component} from 'react';
import apiActions from "../../../services/apiActions";
import {getSubdomain, setCookie, timeInSeconds} from "../../../utils/helpers";

class OpenIdStart extends Component {

    componentDidMount() {
        const provider = this.props.match.params.provider;
        apiActions.get(`/auth/openid/${provider}/url`)
            .then(data => {
                // Save current sub-domain to return here after we receive callback from OpenId provider
                setCookie('openIdSubdomain', getSubdomain(), timeInSeconds.hour);

                window.location.href = data.url;
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        return null;
    }
}

export default OpenIdStart;
