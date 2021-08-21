import CreateLeague from './create-league';
import { connect } from 'react-redux';
import {createLeague} from '../../actions/league-actions';
const mstp = (state, ownProps) => {
    console.log(state);
    return {
    

        teamId: state.session.id

    }
}

const mdtp = dispatch => ({
    createLeague: (leagueName, teamId, maxPlayerCount, leagueStartDate, leagueEndDate, eventTotal) => dispatch(createLeague(leagueName, teamId, maxPlayerCount, leagueStartDate, leagueEndDate, eventTotal))
})

export default connect(mstp, mdtp)(CreateLeague);