import { logout } from '../../actions/session-actions';
import Logout from './logout-button';
import { connect } from 'react-redux';

const mstp = (state, ownProps) => {
    debugger;
    return {
        pw: state.entities.users[Object.keys(state.entities.users)[0]].password,
        teamId: state.session.id

    }
}

const mdtp = dispatch => ({
    logout: (user) => dispatch(logout(user)),

})

export default connect(mstp, mdtp)(Logout);
