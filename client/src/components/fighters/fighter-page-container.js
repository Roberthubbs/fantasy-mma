import FighterPage from './fighter-page';
import { connect } from 'react-redux';
import { fightersPage } from '../../actions/fighter-actions';


const mdtp = dispatch => ({
    fightersPage: (id) => dispatch(fightersPage(id))
})

export default connect(null, mdtp)(FighterPage);