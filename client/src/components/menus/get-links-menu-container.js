import GetLinksMenu from './get-links-menu';
import { connect } from 'react-redux';



const mstp = (state) => {
    return {
        league: state.entities.league.leagueId  || 'no league'  
    }
}



export default connect(mstp, null)(GetLinksMenu);
