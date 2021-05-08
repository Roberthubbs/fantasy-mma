import React, {useState, useEffect} from 'react'

const UserLeagues = (props) => {
    let [clicked, click] = useState(false);
    let [fetched, fetch] = useState(false);
    let [leagues, changeLeagues] = useState([])
    const fetchLeagues = () => {
        if (!fetched && !leagues.length){
            fetch(!fetched)
            props.getAllUserLeagues(props.userId).then((res) => {
                console.log(res);
                changeLeagues(res.userLeagues.data)
            });
        }
    }
    const clickLeagues = () => {
        click(!clicked);
    }
   
    if (!leagues.length && !fetched){
        fetchLeagues();
    }
    // return (
    //     <div>
            
    //     </div>
    // )
    if (!clicked){
        return (
            <ul className='your-leagues-list'>

                <li className='leagues-li-top'><button onClick={clickLeagues} className='your-leagues-btn'>Your Leagues</button></li>
            </ul>

        )
    } else {
        return (
            <ul className='your-leagues-list'> 
              <li className='leagues-li-top'><button onClick={clickLeagues} className='your-leagues-btn'>Your Leagues</button></li>
                {leagues.map((league) => (
                    <li className='leagues-li' onClick={(() => props.sendLeague(league.id))}><button className='your-leagues-list-btn' >{league.leagueName}</button></li>
                ))}
            </ul>
        )
    }
}
//your-leagues-div
//your-leagues-btn
//your-leagues-list-btn
export default UserLeagues
