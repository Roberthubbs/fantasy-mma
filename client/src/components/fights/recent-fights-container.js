import RecentFights from './recent-fights';
import { getRecentFights } from '../../actions/roster-actions';
import { connect } from 'react-redux';

const mdtp = dispatch => ({
    getRecentFights: () => (dispatch(getRecentFights()))
})

export default connect(null, mdtp)(RecentFights);
