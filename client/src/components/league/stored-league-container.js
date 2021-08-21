import { gSL } from '../../actions/league-actions';
import StoredLeague from './stored-league';
import { connect } from 'react-redux';

const mstp = (state, ownProps) => {
    return {

        teamId: state.session.id

    }
}

const mdtp = dispatch => ({
    getStored: (teamId) => dispatch(gSL(teamId)),

})

export default connect(mstp, mdtp)(StoredLeague);
