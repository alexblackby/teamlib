import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CatalogPage extends Component {
    render() {
        return (
            <div>
                <div className="search-bar clearfix">
                    <ul className="sorting ul-nav hoverable">
                        <li className="active">All</li>
                        <li>New</li>
                        <li>Available</li>
                    </ul>
                    <div className="search">
                        <input type="search" placeholder="Find a book..."/>
                    </div>
                </div>
                <div className="book-grid">
                    <div className="book-grid-item">
                        <Link to="/book/1234567890123456"><img className="book-grid-image" src="/img/book1.png"/></Link>
                        <a className="book-grid-title" href="book.html">Предметно-ориентированные языки
                            программирования</a>
                        <div className="author">Мартин Фаулер</div>
                        <div className="availability">
                            <div className="availability-green"><span className="cirlce"></span>Available now</div>
                        </div>
                    </div>
                    <div className="book-grid-item">
                        <a href="#"><img className="book-grid-image" src="/img/book2.png"/></a>
                        <a className="book-grid-title" href="#">Предметно-ориентированные языки программирования</a>
                        <div className="author">Мартин Фаулер</div>
                        <div className="availability">
                            <div className="availability-green"><span className="cirlce"></span>Will be free in 3 days
                            </div>
                        </div>
                    </div>
                    <div className="book-grid-item">
                        <a href="#"><img className="book-grid-image" src="/img/book3.png"/></a>
                        <a className="book-grid-title" href="#">Предметно-ориентированные языки программирования</a>
                        <div className="author">Мартин Фаулер</div>
                        <div className="availability">
                            <div className="availability-red"><span className="cirlce"></span>Available from September,
                                27
                            </div>
                        </div>
                    </div>
                    <div className="book-grid-item">
                        <a href="#"><img className="book-grid-image" src="/img/book3.png"/></a>
                        <a className="book-grid-title" href="#">Предметно-ориентированные языки программирования</a>
                        <div className="author">Мартин Фаулер</div>
                        <div className="availability">
                            <div className="availability-green"><span className="cirlce"></span>Available now</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CatalogPage;
