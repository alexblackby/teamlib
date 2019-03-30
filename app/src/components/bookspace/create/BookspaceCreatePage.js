import React, {Component} from 'react';
import {Formik} from "formik";
import validate from './validate';
import BookspaceCreateForm from './BookspaceCreateForm';
import {getCurrentUserFirstName} from "../../../store/selectors/auth";
import {connect} from "react-redux";
import {submitForm} from "../../../services/forms";
import urlSlug from 'url-slug';
import {refreshAuth} from "../../../store/actions/auth";

class BookspaceSelectPage extends Component {
    constructor(props) {
        super(props);
        this.initialValues = {
            name: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values, actions) {
        const subdomain = this.generateSubdomain(values.name);
        const payload = {...values, subdomain};
        submitForm('/api/bookspaces', payload, actions)
            .then(data => {
                this.props.refreshAuth();
            })
            .catch(error => {
            });
    }

    generateSubdomain(name) {
        return urlSlug(name, '', 'lowercase');
    }

    render() {
        const propsToForm = {
            generateSubdomain: this.generateSubdomain,
        };
        return (
            <div className="form-page">
                <Formik
                    initialValues={this.initialValues}
                    onSubmit={this.handleSubmit}
                    validate={validate}
                    render={formikProps =>
                        <BookspaceCreateForm
                            {...formikProps}
                            {...propsToForm}
                        />
                    }
                />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        firstName: getCurrentUserFirstName(state),
    };
};

const mapDispatchToProps = {
    refreshAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookspaceSelectPage);
