import { connect } from 'react-redux';
import { getLeague } from './actions/league-actions';
import App from './App.js';

const mapStateToProps = (state) => {
    //debugger;
    return {
        leagueId: state.entities.league.id,
        userId: state.session.id
    };
};

const mdtp = dispatch => ({
    getLeague: (teamId, leagueName) => dispatch(getLeague(teamId, leagueName))
});

export default connect(mapStateToProps, mdtp)(App);