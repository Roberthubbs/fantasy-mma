import { useState } from 'react';

const YourRoster = (props) => {
    debugger;
    let [yourRoster, addYourRoster] = useState([]);
    let [searched, setSearch] = useState(false);
    const getRoster = () => {
        if (!searched && !yourRoster.length) {
            setSearch(true);

            props.getYourRoster(props.leagueId,props.playerId).then((fighters) => {
                addYourRoster(fighters.roster.data);
            })
        }

    }
    if (!yourRoster.length) {
        //       debugger;
        getRoster();
    }

    if (yourRoster.length) {
        return (
            <div className='your-roster'>
                <span className='notif-header-span'>
                    <h4 className='your-roster-header'>Roster: </h4>
                </span>
                {yourRoster.map((fighter) => (
                    <div>
                    <p>{fighter.weightClass}</p>

                   <p>{fighter.fighterName}</p>
                   </div>
                ))}
            </div>
        )
    } else {
        return (
            <div>No Roster</div>
        )
    }

}

export default YourRoster;