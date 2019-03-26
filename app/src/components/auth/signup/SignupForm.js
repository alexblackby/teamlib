import React from 'react';
import FormPageInput from '../../form/FormPageInput';
import FormStatus from "../../form/FormStatus";
import {Link} from "react-router-dom";

const SignupForm = (props) => {
    const {handleSubmit, isSubmitting, status} = props;
    return (
        <form className="form-page-form" onSubmit={handleSubmit}>
            <h1 className="form-page-header">Create account</h1>
            <div className="form-page-legend"/>
            <FormPageInput
                name="email"
                label="EMAIL:"
                placeholder="Your corporate email..."
                autoComplete="email"
                disabled={isSubmitting}
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