import { fetchAllFreeAgents, addToRoster } from '../../actions/fighter-actions';
import FreeAgents from './free-agents';
import { connect } from 'react-redux';

const mstp = (state, ownProps) => {
    console.log(state);
    return {
        fighters: Object.values(state.entities.fighters),
        leagueId: ownProps.match.params.leagueId,
        teamId: state.session.id
        
    }
}

const mdtp = dispatch => ({
    addFreeAgent: (leagueId, teamId, fighterId) => dispatch(addToRoster(leagueId, teamId, fighterId)),
    fetchAllFreeAgents: (leagueId) => dispatch(fetchAllFreeAgents(leagueId))
})

export default connect(mstp, mdtp)(FreeAgents);
