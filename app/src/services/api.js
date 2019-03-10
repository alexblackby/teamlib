import axios from 'axios';

const parseErrorResponse = (error) => {
    if (error.response) {
        // the server responded with code another from 2xx
        switch (error.response.status) {
            case 422:
                return error.response.data ? error.response.data.data : {'api_error': 'Validation failed'};
            default:
                return {'api_error': 'Request failed.'};
        }
    } else if (error.request) {
        // the request was made, but no response received
        return {'api_error': 'Request was not sent. Check your internet connection.'};
    } else {
        // Something happened in setting up the request that triggered an Error
        return {'api_error': 'Request was not sent. Check your internet connection.'};
    }
};

export const postFormData = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                if (response.data && response.data.success) {
                    resolve(response.data.data);
                } else {
                    reject(parseErrorResponse({response}));
                }
            })
            .catch(error => {
                reject(parseErrorResponse(error));
            });
    });
};