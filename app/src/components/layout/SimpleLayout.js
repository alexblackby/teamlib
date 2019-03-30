import React from 'react';
import {Link} from 'react-router-dom';
import {getCurrentUser, getCurrentBookspace} from "../../store/selectors/auth";
import {connect} from "react-redux";
import map from "lodash.map";

const SimpleLayout = (props) => {
    const menuUser = [
        {to: '/logout', title: 'Log out'},
    ];
    const menuGuest = [
        {to: '/getstarted', title: 'Get started'},
        {to: '/login', title: 'Log in'},
    ];
    const menuItems = Boolean(props.user) ? menuUser : menuGuest;

    return (
        <div className="container">
            <div className="header clearfix">
                <Link to="/" className="logo">Team<i>Lib</i></Link>
                <ul className="top-menu ul-nav clearfix">
                    {map(menuItems, (item, key) => (
                        <li key={key}><Link to={item.to}>{item.title}</Link></li>
                    ))}
                </ul>
            </div>
            {props.children}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: getCurrentUser(state),
        bookspace: getCurrentBookspace(state),
    };
};

export default connect(mapStateToProps)(SimpleLayout);