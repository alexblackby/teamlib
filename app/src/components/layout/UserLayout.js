import React from 'react';
import {Link} from 'react-router-dom';

const UserLayout = ({children}) => {
    return (
        <div className="container">
            <div className="header clearfix">
                <a className="logo" href="#">Team<i>Lib</i></a>
                <ul className="top-menu ul-nav clearfix">
                    <li className="top-bookspace"><b>EPAM Minsk</b> bookspace</li>
                    <li><a href="#">How it works</a></li>
                </ul>
            </div>
            <div className="content-wrapper">
                <div className="nav">
                    <div className="nav-userinfo clearfix">
                        <img src="/img/avatar.png"/>
                        <div className="username">Denis<br/>Abramov</div>
                        <div className="tri-down"></div>
                    </div>
                    <ul className="nav-actions ul-nav ">
                        <li><a className="action-new-book" href="#">Add a new book</a></li>
                        <li><a className="action-my-books" href="#">My books</a></li>
                        <li><a className="action-my-requests" href="#">My requests</a></li>
                    </ul>
                    <div className="nav-categories-title">Categories:</div>
                    <ul className="nav-categories ul-nav hoverable">
                        <li><a href="#">All books</a></li>
                        <li className="active"><a href="#">Development</a></li>
                        <li><a href="#">Design</a></li>
                        <li><a href="#">Management</a></li>
                        <li><a href="#">Finance</a></li>
                        <li><a href="#">Productivity</a></li>
                    </ul>
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
