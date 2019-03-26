import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCurrentUserFirstName} from "../../../store/selectors/auth";

class BookspaceSelectPage extends Component {
    render() {
        const goToCreatePage = () => this.props.history.push('/bookspace/create');
        return (
            <div className="form-page">
                <div className="form-page-form">
                    <h1 className="form-page-header">Hi, {this.props.firstName}!</h1>
                    <div className="form-page-legend">
                        To share books with someone, you should be members of the same Bookspace.<br/>
                        Bookspace can be set up for a whole company or for a single office.
                    </div>
                        <div className="form-page-legend">
                            <div>You are not a member of any bookspace yet.</div>
                            <div>To join existing bookspace you should use a link, provided by bookspace admin.</div>
                            <div>Or you can create a new bookspace!</div>
                            <br/><br/>
                            <div className="clearfix">
                                <button className="btn fl" onClick={goToCreatePage}>CREATE NEW BOOKSPACE</button>
                                <button className="btn btn-outline fl">JOIN EXISTING</button>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        firstName: getCurrentUserFirstName(state),
    };
};

export default connect(mapStateToProps)(BookspaceSelectPage);
