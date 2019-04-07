import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCurrentUserFirstName} from "../../../store/selectors/auth";
import {getMainDomain, getSubdomain} from "../../../utils/helpers";

class BookspaceSelectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'menu',
        };

        this.switchToJoinMode = this.switchToJoinMode.bind(this);
    }

    switchToJoinMode() {
        this.setState({mode: 'join'});
    }

    render() {
        const {mode} = this.state;
        const goToCreatePage = () => this.props.history.push('/bookspace/create');
        const subdomain = getSubdomain();
        const domain = getMainDomain();
        const sampleUrl = `http://${subdomain === 'app' ? 'your-company' : subdomain}.${domain}/invite/abc12345`;
        return (
            <div className="form-page">
                <div className="form-page-form">
                    {mode === 'menu' &&
                    <div>
                        <h1 className="form-page-header">Hi, {this.props.firstName}!</h1>
                        <div className="form-page-legend">
                            To share books with someone, you should be members of the same Bookspace.<br/>
                            Bookspace can be set up for a whole company or for a single office.
                        </div>
                        <div className="form-page-legend">
                            <div>You are not a member of any bookspace yet.</div>
                            <div>To join existing bookspace you should ask any bookspace member for an invite link.
                            </div>
                            <div>Or you can create a new bookspace!</div>
                            <br/><br/>
                            <div className="clearfix">
                                <button className="btn fl" onClick={goToCreatePage}>CREATE NEW BOOKSPACE</button>
                                <button className="btn btn-outline fl" onClick={this.switchToJoinMode}>
                                    JOIN EXISTING
                                </button>
                            </div>
                        </div>
                    </div>}
                    {mode === 'join' &&
                    <div>
                        <h1 className="form-page-header">Join your bookspace</h1>
                        <div className="form-page-legend">
                            To join existing bookspace you should have an invite.<br/>
                            You can ask any member of your bookspace to send you invite link.
                            <br/><br/>
                            When you have the link, open it and log in with credentials you used for the signup.
                        </div>
                    </div>}
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
