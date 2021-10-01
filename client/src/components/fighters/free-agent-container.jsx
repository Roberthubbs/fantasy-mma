import { fetchAllFreeAgents, addToRoster } from '../../actions/fighter-actions';
import { fetchAllBids } from '../../actions/auction-actions';

import FreeAgents from './free-agents';
import { connect } from 'react-redux';

const mstp = (state, ownProps) => {
    return {
        fighters: Object.values(state.entities.fighters),
        leagueId: ownProps.match.params.leagueId,
        teamId: state.session.id
        
    }
}

const mdtp = dispatch => ({
    addFreeAgent: (leagueId, teamId, fighterId, cost) => dispatch(addToRoster(leagueId, teamId, fighterId, cost)),
    fetchAllFreeAgents: (leagueId, weightClass) => dispatch(fetchAllFreeAgents(leagueId, weightClass)),
    fetchAllBids: (leagueId) => dispatch(fetchAllBids(leagueId))
})

export default connect(mstp, mdtp)(FreeAgents);
