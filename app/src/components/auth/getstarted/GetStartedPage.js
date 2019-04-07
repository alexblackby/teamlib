import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

class GetStartedPage extends Component {
    constructor(props) {
        super(props);
        this.goToSignupPage = this.goToSignupPage.bind(this);
        this.switchMode = this.switchMode.bind(this);
    }

    goToSignupPage() {
        this.props.history.push('/signup');
    }

    switchMode(mode) {
        this.props.history.push('/getstarted/' + mode);
    }

    render() {
        const {mode = 'menu'} = this.props.match.params;
        if (this.props.invite && this.props.invite.code) {
            return <Redirect to="/signup"/>;
        }
        return (
            <div className="form-page">
                <div className="form-page-form">
                    {mode === 'menu' && <>
                        <h1 className="form-page-header">Get started!</h1>
                        <div className="form-page-legend">
                            To share books with someone, you should be members of the same Bookspace.
                            <br/>
                            <br/>
                            Is there an existing Bookspace in your company or do you want to create a new one?
                            <br/>
                            <br/>
                            <br/>
                            <div className="clearfix">
                                <button className="btn fl" onClick={this.goToSignupPage}>
                                    CREATE NEW BOOKSPACE
                                </button>
                                <button className="btn fl" onClick={() => this.switchMode('join')}>
                                    JOIN EXISTING
                                </button>
                            </div>
                        </div>
                    </>}
                    {mode === 'join' && <>
                        <h1 className="form-page-header">Join existing bookspace</h1>
                        <div className="form-page-legend">
                            To join existing bookspace you need an invite.<br/>
                            You can ask administrator or any member of desired bookspace to send you invite link.
                        </div>
                    </>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        invite: state.auth.invite,
    };
};

export default connect(mapStateToProps)(GetStartedPage);
