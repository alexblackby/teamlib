import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCurrentBookspace, getCurrentUser} from "../../../store/selectors/auth";
import {Link} from "react-router-dom";

class InvitedPage extends Component {

    render() {
        const {bookspace} = this.props;
        return (
            <div className="form-page">
                <div className="form-page-form">
                    <div className="form-page-legend">
                        You have just joined <b>"{bookspace.name}"</b> bookspace.
                        <br/><br/>
                        Now you can <Link to="/">start using it</Link>!
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bookspace: getCurrentBookspace(state),
    };
};

export default connect(mapStateToProps)(InvitedPage);