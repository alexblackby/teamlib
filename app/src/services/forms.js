import {signup} from "./auth";

export const submitForm = (handler, values, actions) => {
    actions.setStatus({});
    return new Promise( (resolve, reject) => {
        handler(values)
            .then(data => {
                actions.setSubmitting(false);
                resolve(data);
            })
            .catch(submitErrors => {
                actions.setSubmitting(false);
                actions.setStatus(submitErrors);
                reject(new Error("Validation failed"));
            });
    });
};