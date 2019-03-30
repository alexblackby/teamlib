import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCurrentBookspace} from "../../../store/selectors/auth";
import {submitForm} from "../../../services/forms";
import apiActions from "../../../services/apiActions";
import {refreshAuth} from "../../../store/actions/auth";
import {Redirect} from "react-router-dom";
import {getMainDomain} from "../../../utils/helpers";

class BookspaceOnboardingPage extends Component {

    constructor(props) {
        super(props);
        this.finishOnboarding = this.finishOnboarding.bind(this);
    }


    selectOnFocus(e) {
        e.target.select();
    }

    finishOnboarding() {
        const payload = {show_onboarding: false};
        apiActions.put('/api/bookspaces/' + this.props.bookspace._id, payload)
            .then(data => {
                this.props.refreshAuth();
            })
            .catch(error => {
            });
    }

    render() {
        const {bookspace} = this.props;
        const mainDomain = getMainDomain();
        if (!bookspace.show_onboarding) {
            return <Redirect to="/"/>;
        }
        return (
            <div className="form-page">
                <div className="form-page-form">
                    <h1 className="form-page-header">Welcome to {bookspace.name}!</h1>
                    <div className="form-page-legend">
                        To invite members to this bookspace, send them an invite link:
                        <br/>
                        <br/>
                        <input
                            className="inputAutoselect"
                            readOnly={true}
                            value={`http://${bookspace.subdomain}.${mainDomain}/invite/${bookspace.invite_codes[0]}`}
                            onClick={this.selectOnFocus}/>
                        <br/>
                        <br/>
                        You can later find this link on the Bookspace management page.
                        <br/>
                        <br/>
                        <br/>
                        <button className="btn fl" onClick={this.finishOnboarding}>OK, I GOT IT</button>
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

const mapDispatchToProps = {
    refreshAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookspaceOnboardingPage);
