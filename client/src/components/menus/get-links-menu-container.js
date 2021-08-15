import { fetchAllFighters } from '../../actions/fighter-actions';
import GetLinksMenu from './get-links-menu';
import { connect } from 'react-redux';



const mstp = (state) => {
    debugger;
    return {
        league: state.entities.league.id    
    }
}

const mdtp = dispatch => ({

    //receiveAllFighters: (selectedWeightClass) => dispatch(fetchAllFighters(selectedWeightClass))
})

export default connect(mstp, null)(GetLinksMenu);
