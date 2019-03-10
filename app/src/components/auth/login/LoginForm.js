import React from 'react';
import FormPageInput from '../../form/FormPageInput';
import {Link} from "react-router-dom";
import FormStatus from "../../form/FormStatus";

const LoginForm = (props) => {
    const {handleSubmit, isSubmitting, status} = props;
    return (
        <form className="form-page-form" onSubmit={handleSubmit}>
            <h1 className="form-page-header">Welcome!</h1>
            <div className="form-page-legend"/>
            <FormPageInput
                name="email"
                label="EMAIL:"
                placeholder="Your email..."
                autoComplete="email"
                disabled={isSubmitting}
            />
            <FormPageInput
                name="password"
                label="PASSWORD:"
                placeholder="Your password..."
                type="password"
                autoComplete="current-password"
                disabled={isSubmitting}
            />
            <div className="form-page-line">
                <FormStatus status={status}/>
                <button
                    type="submit"
                    className={isSubmitting ? "btn btn-disabled" : "btn"}
                    disabled={isSubmitting}>
                    LOG IN
                </button>
            </div>
            <div>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </form>
    )
};

export default LoginForm;