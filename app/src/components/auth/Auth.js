import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {hasCurrentUser} from '../../store/selectors/auth';

const Auth = (props) => {
    return (props.needAuth && !props.hasCurrentUser)
        ? (<Redirect to="/login"/>)
        : props.children;
};

const mapStateToProps = (state) => {
    return {
        hasCurrentUser: hasCurrentUser(state),
    };
};

export default connect(mapStateToProps)(Auth);