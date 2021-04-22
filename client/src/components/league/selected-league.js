import {useState} from 'react';
export default function SelectedLeague(props){
    let [requestSent,switchRequest] = useState(false);
    let [requestMessage, composeMessage] = useState('');
    const sendJoinRequest = () => {
        const { leagueName, leagueId, adminId, userId } = props.selectedLeague;
        debugger;
        props.joinLeague(userId, leagueName, leagueId, adminId, requestMessage);
        switchRequest(true);
    }
    if (requestSent){
        return (
            <div>Your Request has been sent!</div>
        )
    }
    return (
        <div>

            <h4>{props.selectedLeague.leagueName}</h4>
            <p>{props.selectedLeague.adminId}</p>
            <label>Send A Message With Your Request (optional)
                <textarea 
                    name='message'
                    value={requestMessage}
                    onChange={e => composeMessage(e.target.value)}
                />
            </label>
            {/* <input
                key={i}
                type="text"
                placeholder={bid.bidCost + 1}
                value={bid.bidding}
                onChange={this.updateBid(i)}
                className="bid-input" /> */}
            <button onClick={sendJoinRequest}>Join This League</button><button>Clear Selection</button>
        </div>
    )
}