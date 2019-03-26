import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCurrentBookspace} from "../../../store/selectors/auth";

class BookspaceOnboardingPage extends Component {
    render() {
        const {bookspace} = this.props;
        return (
            <div className="form-page">
                <div className="form-page-form">
                    <h1 className="form-page-header">Welcome to {bookspace.name}!</h1>
                    <div className="form-page-legend">
                        To invite members to this bookspace, send them an invite link:
                        <br/>
                        http://{bookspace.subdomain}.teamlib.local/invite/{bookspace.invite_codes[0]}
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

export default connect(mapStateToProps)(BookspaceOnboardingPage);
