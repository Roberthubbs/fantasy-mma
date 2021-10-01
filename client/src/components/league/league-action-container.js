import { fetchAllBids } from '../../actions/auction-actions';
import { addToRoster } from '../../actions/fighter-actions';
import LeagueAuction from './league-auction';
import { connect } from 'react-redux';

const mstp = (state, ownProps) => {
    return {
        
        leagueId: ownProps.match.params.leagueId,
        teamId: state.session.id

    }
}

const mdtp = dispatch => ({
    addFreeAgent: (leagueId, teamId, fighterId, cost) => dispatch(addToRoster(leagueId, teamId, fighterId, cost)),

    fetchAllBids: (leagueId) => dispatch(fetchAllBids(leagueId))
})

export default connect(mstp, mdtp)(LeagueAuction);
