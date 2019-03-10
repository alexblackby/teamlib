import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const IsAuthenticated = (props) => {
    const ComponentForUser = props.componentForUser ? props.componentForUser : null;
    const ComponentForGuest = props.componentForGuest ? props.componentForGuest : null;
    return props.hasCurrentUser
        ? <ComponentForUser/>
        : <ComponentForGuest/>;
};

const mapStateToProps = (state) => {
    return {
        hasCurrentUser: Boolean(state.auth.user),
    };
};

export default withRouter(connect(mapStateToProps)(IsAuthenticated));