import urlSlug from "url-slug";

const validate = (values) => {
    let errors = {};
    if (!values.name) {
        errors.name = 'Required';
    } else {
        const subdomain = urlSlug(values.name, '');
        if (values.name.length<3 || subdomain.length<3) {
            errors.name = 'Minimum 3 letters or digits required.';
        }
    }
    return errors;
};

export default validate;