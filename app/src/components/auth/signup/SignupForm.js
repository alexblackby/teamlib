import React from 'react';
import FormPageInput from '../../form/FormPageInput';
import FormStatus from "../../form/FormStatus";
import {Link} from "react-router-dom";
import {Field} from "formik";

const SignupForm = (props) => {
    const {handleSubmit, onClickOpenId, isSubmitting, status, invite, onClearInvite} = props;
    const openIdButton = () => {
        return (
            <div className="openid-microsoft" onClick={onClickOpenId('microsoft')}>
                Sign up with your Microsoft account
            </div>
        );
    };
    return (
        <form className="form-page-form" onSubmit={handleSubmit}>
            <h1 className="form-page-header">Create account</h1>
            <div className="form-page-legend">
                {invite && invite.name
                    ?
                    <div>
                        After signup you will join <b>"{invite.name}"</b> bookspace.<br/>
                    </div>
                    :
                    <div>
                        After signup you will be able to create new bookspace.<br/>
                        If you want to join existing bookspace you should use invite link.
                    </div>
                }
            </div>
            <FormPageInput
                name="email"
                label="EMAIL:"
                placeholder="Your corporate email..."
                autoComplete="email"
                disabled={isSubmitting}
                labelRightRender={openIdButton}
            />
            <FormPageInput
                name="name"
                label="NAME:"
                placeholder="Your full name..."
                autoComplete="name"
                disabled={isSubmitting}
            />
            <FormPageInput
                name="password"
                label="PASSWORD:"
                placeholder="Password..."
                type="password"
                autoComplete="new-password"
                disabled={isSubmitting}
            />
            <div className="form-page-line">
                <FormStatus status={status}/>
                <button
                    type="submit"
                    className={isSubmitting ? "btn btn-disabled" : "btn"}
                    disabled={isSubmitting}>
                    SIGN UP
                </button>
            </div>
            <div>
                Already have an account? <Link to="/login">Log in</Link>
            </div>
        </form>
    )
};

export default SignupForm;