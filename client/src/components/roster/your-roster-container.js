import { connect } from 'react-redux';

import YourRoster from './your-roster';
import { findYourRoster } from '../../actions/roster-actions';


const mdtp = dispatch => ({
    getYourRoster: (leagueId, playerId) => (dispatch(findYourRoster(leagueId,playerId)))
})

export default connect(null, mdtp)(YourRoster);