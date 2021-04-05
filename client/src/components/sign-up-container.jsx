import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../actions/session-actions';
import SessionForm from './login';
import { signup } from '../actions/session-actions';
import { resetErrors } from '../actions/session-actions';


const mapStateToProps = ({ errors }) => {

    return {
        errors: errors.session,
        formType: 'Signup',
        navLink: <Link to="/login">Login</Link>
    };
};

const mapDispatchToProps = dispatch => {

    return {
        processForm: (user) => dispatch(signup(user)),
        loginDemo: (user) => dispatch(login(user)),
        resetErrors: () => dispatch(resetErrors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);