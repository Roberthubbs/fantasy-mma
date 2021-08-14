import { fetchAllFighters } from '../../actions/fighter-actions';
import Fighters from './all-fighters';
import { connect } from 'react-redux';

const mstp = (state) => {
    debugger;
    return {
        fighters: Object.values(state.entities.fighters)
    }
}

const mdtp = dispatch => ({

    receiveAllFighters: (selectedWeightClass) => dispatch(fetchAllFighters(selectedWeightClass))
})

export default connect(mstp, mdtp)(Fighters);
