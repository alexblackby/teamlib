import React, {Component} from 'react';
import get from 'lodash/get';

class NeedVerificationPage extends Component {
    render() {
        const email = get(this.props, 'location.state.email');
        return (
            <div className="form-page">
                <div className="form-page-form">
                    <h1 className="form-page-header">Almost complete...</h1>
                    <div className="form-page-legend">
                        Now we need to verify your email.
                        <br/><br/>
                        Please, go to {email ? <b>{email}</b> : 'your mailbox'},
                        find email from TeamLib and click verification link.
                    </div>
                </div>
            </div>
        );
    }
}

export default NeedVerificationPage;
