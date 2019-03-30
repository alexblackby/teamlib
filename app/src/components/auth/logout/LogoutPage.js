import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getCurrentUser} from '../../../store/selectors/auth';
import {logout} from "../../../store/actions/auth";

class LogoutPage extends Component {

    componentDidMount() {
        this.props.logout();
    }

    render() {
        return this.props.hasCurrentUser
            ? null
            : <Redirect to="/"/>;
    }
}

const mapStateToProps = (state) => {
    return {
        hasCurrentUser: Boolean(getCurrentUser(state)),
    };
};

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
