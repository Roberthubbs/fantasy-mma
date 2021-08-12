import { getAllUserLeagues } from '../../actions/league-actions';
import UserLeagues from './user-league'
import { connect } from 'react-redux';

// const mstp = (state, ownProps) => {
//     console.log(state);
//     return {

//         userId: state.session.id

//     }
// }

const mdtp = dispatch => ({
    getAllUserLeagues: (userId) => dispatch(getAllUserLeagues(userId)),

})

export default connect(null, mdtp)(UserLeagues);