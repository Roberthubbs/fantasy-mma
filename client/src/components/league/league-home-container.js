import { getLeaguePlayers } from '../../actions/league-actions';
import LeagueHomePlayers from './league-home';
import { connect } from 'react-redux';

const mstp = (state) => {
    return {
        leagueId: state.entities.league.leagueId  || 'no league'  
    }
}


const mdtp = dispatch => ({
    getLeaguePlayers: (leagueId) => dispatch(getLeaguePlayers(leagueId)),

})

export default connect(mstp, mdtp)(LeagueHomePlayers);