import React, {Component} from 'react';
import get from 'lodash/get';
import {verifyEmail} from "../../../services/auth";
import {Link} from "react-router-dom";


class VerifyPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inProgress: false,
            success: null,
            error: null,
        };
    }


    componentDidMount() {
        const verifyParams = get(this.props, 'match.params');
        this.setState({inProgress: true});
        verifyEmail(verifyParams)
            .then(data => this.setState({inProgress: false, success: true}))
            .catch(error => this.setState({inProgress: false, success: false, error}));
    }

    render() {
        const {inProgress, success, error} = this.state;
        return (
            <div className="form-page">
                <div className="form-page-form">
                    <h1 className="form-page-header">Verification</h1>
                    {inProgress &&
                    <div>Verification in progress...</div>
                    }
                    {success === true &&
                    <div>Your account is verified. Now you can <Link to="/login">log in</Link>.</div>
                    }
                    {error &&
                    <div><b>Verification result:</b> {error.userid}</div>
                    }
                </div>
            </div>
        );
    }
}

export default VerifyPage;
