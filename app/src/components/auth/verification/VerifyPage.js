import React, {Component} from 'react';
import get from 'lodash/get';
import {Link, Redirect} from "react-router-dom";
import {postFormData} from "../../../services/forms";
import {setCurrentUser} from "../../../store/actions/auth";
import {connect} from "react-redux";


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
        postFormData('/auth/verify', verifyParams)
            .then(data => {
                this.setState({inProgress: false, success: true});
                this.props.setCurrentUser(data);
            })
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
                    <div>Your account is verified. Now you can <Link to="/" replace={true}>start using TeamLib</Link>.</div>
                    }
                    {error &&
                    <div>{error.userid}</div>
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setCurrentUser,
};

export default connect(null, mapDispatchToProps)(VerifyPage);
