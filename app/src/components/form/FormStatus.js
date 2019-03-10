import React from 'react';

const FormStatus = ({status}) => {
    return (
        <div>
            {status &&
            Object.keys(status).map((key) =>
                <div className="form-page-error" key={key}>{status[key]}</div>
            )
            }
        </div>
    );
};

export default FormStatus;