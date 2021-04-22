import { getLeague } from '../../actions/league-actions';
import GetLeague from './get-league';
import { connect } from 'react-redux';

const mstp = (state, ownProps) => {
    console.log(state);
    return {

        teamId: state.session.id

    }
}

const mdtp = dispatch => ({
    getLeague: (teamId, leagueName) => dispatch(getLeague(teamId, leagueName)),

})

export default connect(mstp, mdtp)(GetLeague);
