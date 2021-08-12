import React from 'react';
import { withRouter } from 'react-router-dom';
import { RECEIVE_CURRENT_USER } from '../actions/session-actions';
class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            success: false,
            errors: []
        };
        this.handleGuestSubmit = this.handleGuestSubmit.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);


    }


    componentWillUnmount() {
        this.props.resetErrors();
    }



    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);

        this.props.processForm(user).then((action) => {
            if (action.type == 'RECEIVE_SESSION_ERRORS'){
                this.setState({errors: action.errors})
            } else {
                this.props.history.push("/all")
                window.location.reload();

            }
         }
            
        
        );
      
    }
    handleGuestSubmit(e) {
        e.preventDefault();

        this.props.loginDemo({ username: "DemoUser", password: "Password" }).then(() => this.props.history.push("/"));
    }

   
    renderErrors() {
        return (
            <div className="login-errors">
                <ul className="error-list">
                    {this.props.errors.map((error, i) => (

                        <li key={`error-${i}`}>
                            {error}
                        </li>
                    ))}
                </ul>
            </div>

        )
    }





    decideText() {
        if (this.props.formType === 'Login') {
            return "New to Fantasy? "
        } else {
            return "Returning User? "
        }
    };

    render() {
        return (

            <div className="background-image-signup">
                <div className="login-form-container">
                    <form onSubmit={this.handleSubmit} className="login-box">
                        {/* <h2 className="title-login"></h2> */}
                        <br />


                        <div className="login-form">
                            <br />
                            <label className="login-label">
                                <input type="text"
                                    placeholder="  Username"
                                    value={this.state.username}
                                    onChange={this.update('username')}
                                    className="login-input" />
                            </label>
                            <label className="login-label">
                                <input type="password"
                                    placeholder="   Password"
                                    value={this.state.password}
                                    onChange={this.update('password')}
                                    className="password-input" />
                            </label>
                            {this.props.formType === "Signup" ?
                                <div className="decider-div">

                                </div> : null}
                            {this.props.errors.length > 0 ? <h2 className="impt-label">{this.renderErrors()}</h2> : null}
                            <br />

                            <input className="session-form-submit" type="submit" value={this.props.formType} />
                            <button className="session-form-submit" onClick={this.handleGuestSubmit} >Continue As Guest</button>
                            <h2 className="link-change">{this.decideText()}{this.props.navLink}</h2>

                        </div>
                    </form>

                </div>

            </div>
        )

    }
}

export default withRouter(SessionForm);