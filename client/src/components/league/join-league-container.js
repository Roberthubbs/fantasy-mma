import { connect } from 'react-redux';
import JoinLeagueRequest from './join-league';
import {slr} from '../../actions/league-actions';
const mstp = (state, ownProps) => {
    console.log(state);
    return {

        userId: state.session.id

    }
}

const mdtp = dispatch => ({
    slr: (userId, leagueName, leagueId, adminId, requestMessage) => (dispatch(slr(userId, leagueName, leagueId, adminId, requestMessage)))
})

export default connect(mstp, mdtp)(JoinLeagueRequest);