import FighterPage from './fighter-page';
import { connect } from 'react-redux';
import { fightersPage } from '../../actions/fighter-actions';
// const mstp = (state, ownProps) => {
//     console.log(state);
//     return {
    

//         fighter: state.session.id

//     }
// }

const mdtp = dispatch => ({
    fightersPage: (id) => dispatch(fightersPage(fightersPage))
})

export default connect(null, mdtp)(FighterPage);