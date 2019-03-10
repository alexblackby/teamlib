import React from 'react';
import {Link} from 'react-router-dom';

const GuestLayout = ({children}) => {
    return (
        <div className="container">
            <div className="header clearfix">
                <Link to="/" className="logo">Team<i>Lib</i></Link>
                <ul className="top-menu ul-nav clearfix">
                    <li><a href="#">How it works</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><Link to="/signup">Get started</Link></li>
                    <li><Link to="/login">Log in</Link></li>
                </ul>
            </div>
            {children}
        </div>
    );
};

export default GuestLayout;
