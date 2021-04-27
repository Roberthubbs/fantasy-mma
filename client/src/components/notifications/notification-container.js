import { fetchUserNotifs, respondToJoinRequest } from '../../actions/notification-actions';
import Notifications from './notifications';
import { connect } from 'react-redux';

const mstp = (state, ownProps) => {
    console.log(state);
    return {

        leagueId: ownProps.match.params.leagueId,
        userId: state.session.id

    }
}

const mdtp = dispatch => ({
    getNotifications: (userId) => dispatch(fetchUserNotifs(userId)),
    respond: (userId, response, requestId) => dispatch(respondToJoinRequest(userId, response, requestId))
  //  fetchAllBids: (leagueId) => dispatch(fetchAllBids(leagueId))
})

export default connect(mstp, mdtp)(Notifications);