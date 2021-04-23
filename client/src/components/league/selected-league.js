import {useState} from 'react';
import { useHistory } from "react-router-dom";
export default function SelectedLeague(props){
    let [requestSent,switchRequest] = useState(false);
    let [requestMessage, composeMessage] = useState('');
    
    const sendJoinRequest = () => {
        const { leagueName, leagueId, adminId, userId } = props.selectedLeague;
        debugger;
        props.joinLeague(userId, leagueName, leagueId, adminId, requestMessage);
        switchRequest(true);
    }
    const history = useHistory();

    const returnToJoin = () => {
        let path = `/join-league`;
        history.push(path);
    }
    if (requestSent){
        return (
            <div>Your Request has been sent!</div>
        )
    }
    return (
        <div className='selected-league'>

            <h4 className='selected-league-top'>{props.selectedLeague.leagueName}</h4>
            <p className='selected-league-bottom'>{props.selectedLeague.adminId}</p>
            <label className='selected-league-text-head'>Send A Message With Your Request (optional)
            <br></br>
                <textarea 
                    name='message'
                    value={requestMessage}
                    onChange={e => composeMessage(e.target.value)}
                    maxLength='255'
                    className='selected-league-text'/>
            </label>
            {/* <input
                key={i}
                type="text"
                placeholder={bid.bidCost + 1}
                value={bid.bidding}
                onChange={this.updateBid(i)}
                className="bid-input" /> */}
            <button onClick={sendJoinRequest} className='selected-league-button'>Join This League</button>
        </div>
    )
}