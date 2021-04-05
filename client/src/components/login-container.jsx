import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../actions/session-actions';
import SessionForm from './login';
import { resetErrors } from '../actions/session-actions';
const mapStateToProps = ({ errors }) => {

    return {
        errors: errors.session,
        formType: 'Login',
        navLink: <Link to="/register">Sign Up</Link>
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(login(user)),
        loginDemo: (user) => dispatch(login(user)),
        resetErrors: () => dispatch(resetErrors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
