import React, {Component} from 'react';

class BookPage extends Component {
    render() {
        return (
            <div>
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
                        <div className="search-bar clearfix">
                            <ul className="breadcrumbs ul-nav">
                                <li><a href="#">All books</a></li>
                                <li><span>&rarr;</span></li>
                                <li><a href="#">Development</a></li>
                            </ul>
                            <div className="search">
                                <input type="search" placeholder="Find a book..."/>
                            </div>
                        </div>
                        <div className="book-page">
                            <div className="book-page-info clearfix">
                                <img className="book-page-image" src="/img/book1.png"/>
                                <h1 className="book-page-name">Предметно-ориентированные языки программирования</h1>
                                <div className="author">Мартин Фаулер</div>
                            </div>
                            <div className="book-request">
                                <div className="book-request-subtitle">
                                    <b>Book owner:</b>
                                </div>
                                <div className="book-owner clearfix">
                                    <img src="/img/avatar2.png"/>
                                    <div className="username">
                                        DenisDenis<br/>
                                        AbramovAbramovAbramov
                                    </div>
                                    <div className="contacts">
                                        Цеткин, 5 этаж, слева от входа<br/>
                                        Skype: d.abramov, телефон: +375 29 123456789
                                    </div>
                                </div>
                                <div className="book-request-availability clearfix">
                                    <div><b>Availability:</b></div>
                                    <div className="availability">
                                        <div className="availability-red"><span className="cirlce"/>Available from
                                            September, 27
                                        </div>
                                    </div>
                                </div>
                                <div className="book-request-form" id="requestform" style="display:none">
                                    <div className="book-request-header">Request details:</div>
                                    <div className="book-request-fields">
                                        <div className="book-request-dates">
                                            Request from <span className="calendar">12.08.2019</span> for a period of 3
                                            weeks.
                                        </div>
                                        <div className="book-request-line">
                                            TeamLib will provide communication between you and Alexander via your work
                                            e-mails.<br/>
                                            But as a backup, book owner should have a way to contact you directly.
                                        </div>
                                        <div className="book-request-line">
                                            <div className="book-request-line-name">Your mobile phone:</div>
                                            <div>
                                                <input className="input-text" type="text"
                                                       placeholder="Phone number..."/>
                                            </div>
                                        </div>
                                        <div className="book-request-line">
                                            <div className="book-request-line-name">How to find you in the office:</div>
                                            <div>
                                                <textarea className="input-text"
                                                          placeholder="Directions to find you..."/>
                                            </div>
                                        </div>
                                        <div className="book-request-buttons clearfix">
                                            <button className="btn">SEND REQUEST</button>
                                            <button className="btn btn-outline"
                                                    onClick="document.getElementById('requestform').style.display='none';document.getElementById('xxx').style.display='block';">CANCEL
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="btn"
                                    id="xxx"
                                    onClick="document.getElementById('requestform').style.display='block';this.style.display='none';"
                                >
                                    REQUEST THIS BOOK
                                </button>
                            </div>
                            <div className="text">
                                В книге "Предметно-ориентированные языки программирования" известный эксперт в области
                                программного обеспечения Мартин Фаулер предоставляет информацию, которая поможет вам
                                определиться, следует ли использовать предметно-ориентированные языки для решения
                                стоящих перед вами задач. Если применение предметно-ориентированных языков окажется
                                оправданным, то вам пригодится вторая часть книги, в которой подробно, на конкретных
                                примерах, описаны технологии, применяемые при создании таких языков. Методы, описанные в
                                данной книге, могут использоваться в большинстве современных объектно-ориентированных
                                языков программирования. В основном примеры в книге написаны на Java и C#, но в
                                некоторых из них использован Ruby. Все главы по возможности организованы в виде
                                самодостаточных частей, а большинство справочных разделов - в знакомом читателю формате
                                описания шаблонов программирования.
                                <div>
                                    <a href="#" target="_blank">Open full description</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookPage;
