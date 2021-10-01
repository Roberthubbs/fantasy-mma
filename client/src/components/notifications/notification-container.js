import { fetchUserNotifs, respondToJoinRequest } from '../../actions/notification-actions';
import Notifications from './notifications';
import { connect } from 'react-redux';

const mstp = (state, ownProps) => {
    return {

        leagueId: ownProps.match.params.leagueId,
        userId: state.session.id

    }
}

const mdtp = dispatch => ({
    getNotifications: (userId) => dispatch(fetchUserNotifs(userId)),
    respond: (userId, response, requestId, leagueId) => dispatch(respondToJoinRequest(userId, response, requestId, leagueId))
})

export default connect(mstp, mdtp)(Notifications);