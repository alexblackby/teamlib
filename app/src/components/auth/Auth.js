import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getCurrentUser, getCurrentBookspace} from '../../store/selectors/auth';
import {refreshAuth, setTokenFromCookie} from "../../actions/auth";
import {getCookie} from "../../utils/helpers";

const Auth = (props) => {
    if (getCookie('token')) {
        props.setTokenFromCookie();
        return null;
    }
    if (props.hasTokenWithoutUser) {
        if(!props.refreshInProgress) props.refreshAuth();
        return null;
    }
    if (props.needAuth && !props.user) {
        return <Redirect to="/login"/>;
    }
    if (props.needAuth && props.needBookspace && !props.bookspace)
    {
        return <Redirect to="/bookspace/select"/>;
    }

    const showOnBoarding = Boolean(props.bookspace && props.bookspace.show_onboarding);
    const isOwner = Boolean(props.user && props.bookspace && props.bookspace.owner_id === props.user._id);
    if (props.route.path === '/' && showOnBoarding && isOwner)
    {
        return <Redirect to="/bookspace/welcome"/>;
    }
    return props.children;
};

const mapStateToProps = (state) => {
    const hasTokenWithoutUser = Boolean(state.auth && state.auth.token && !state.auth.user);
    const refreshInProgress = Boolean(state.auth && state.auth.refreshInProgress);
    return {
        user: getCurrentUser(state),
        bookspace: getCurrentBookspace(state),
        hasTokenWithoutUser,
        refreshInProgress,
    };
};

const mapDispatchToProps = {
    refreshAuth,
    setTokenFromCookie,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);