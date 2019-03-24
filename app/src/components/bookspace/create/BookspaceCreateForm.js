import React from 'react';
import FormPageInput from '../../form/FormPageInput';
import FormStatus from "../../form/FormStatus";

const BookspaceCreateForm = (props) => {
    const {handleSubmit, isSubmitting, status} = props;
    const subdomain = props.values.name ? props.generateSubdomain(props.values.name) : 'your-company';
    return (
        <form className="form-page-form" onSubmit={handleSubmit}>
            <h1 className="form-page-header">Create bookspace</h1>
            <div className="form-page-legend"/>
            <FormPageInput
                name="name"
                label="BOOKSPACE NAME:"
                placeholder="Example: name of your company"
                autoComplete="off"
                disabled={isSubmitting}
                autoFocus={true}
            />
            <div className="form-page-line">
                <b>URL:</b>
                <p>
                    <span style={{color: '#777'}}>Will be <b style={{color: 'green'}}>{subdomain}</b><b>.teamlib.net</b></span>
                </p>
            </div>
            <div className="form-page-line">
                <FormStatus status={status}/>
                <button
                    type="submit"
                    className={isSubmitting ? "btn btn-disabled" : "btn"}
                    disabled={isSubmitting}>
                    CREATE
                </button>
            </div>
        </form>
    )
};

export default BookspaceCreateForm;