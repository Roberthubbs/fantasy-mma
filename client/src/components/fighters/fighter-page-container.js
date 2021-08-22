import FighterPage from './fighter-page';
import { connect } from 'react-redux';
import { fightersPage } from '../../actions/fighter-actions';
// const mstp = (state, ownProps) => {
//     console.log(state);
//     debugger;
//     return {
    

//         fighterId: state.match.params.id

//     }
// }

const mdtp = dispatch => ({
    fightersPage: (id) => dispatch(fightersPage(id))
})

export default connect(null, mdtp)(FighterPage);