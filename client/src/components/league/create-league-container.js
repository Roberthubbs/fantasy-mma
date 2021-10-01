import CreateLeague from './create-league';
import { connect } from 'react-redux';
import {createLeague} from '../../actions/league-actions';
const mstp = (state, ownProps) => {
    return {
    

        teamId: state.session.id

    }
}

const mdtp = dispatch => ({
    createLeague: (leagueName, teamId, maxPlayerCount, leagueStartDate, leagueEndDate, eventTotal) => dispatch(createLeague(leagueName, teamId, maxPlayerCount, leagueStartDate, leagueEndDate, eventTotal))
})

export default connect(mstp, mdtp)(CreateLeague);