import React, {useState } from 'react';
export default function RecentFights (props) {
    let [fights, setFights] = useState([]);
    let [fetched, fetch] = useState(false);
    let [page, changePage] = useState(1);
    let [pages, addPages] = useState([]);

    const fetchFights = () => {
        fetch(!fetched);
        props.getRecentFights().then((res) => {
            setFights(res.fights.data)
            if (res.fights.data && res.fights.data.length > 0){
                let total = Math.ceil(res.fights.data.length/10);
                let pageNumbers = []
                let i = 1;
                while (i <= total){
                    pageNumbers.push(i);
                    i++
                }
                console.log('pageNumbers: ', pageNumbers)
                addPages(pageNumbers);
            }
        })
        
    };

    if (!fetched){
        fetchFights()
    }

   
    

    if (fights && fights[0]){

        return (
            <div className='recent-fights-outher'>
                {fights.map((fight, i) => 
                (i <= Math.ceil(page * 10) && i >= Math.ceil((page-1) * 10)) ? (
                    <div className='recent-fight' key={i} >
                        {/* {fight.fighteroneid} */}
                        <p className='fight-date'>{new Date(fight.fightdate).toLocaleDateString('en-US')}</p>
                        
                        
                        {/* {fight.fighteroneid} */}
                        {/* {fight.fighteronestatsid} */}
                        <div className='recent-fighter-one'>
                        <p className='fighter-name-stats'>{fight.fighteronefullname}</p>
                        <p className='fight-stats'>Strikes Attempted: {fight.fighteronestrikesattempted}</p>
                        <p className='fight-stats'>Strikes Landed: {fight.fighteronestrikeslanded}</p>
                        <p className='fight-stats'>Takedowns Attempted On: {fight.fighteronetakedownattemptagainst}</p>
                        <p className='fight-stats'>Takedowns Defended: {fight.fighteronetakedownattemptdefended}</p>
                        <p className='fight-stats'>Takdowns Attempted: {fight.fighteronetakedownattempted}</p>
                        <p className='fight-stats'>Takedowns Completed: {fight.fighteronetakedowncompleted || 0}</p>
                        {/* {fight.fightertwoid} */}
                        {/* {fight.fightertwostatsid} */}
                        </div>
                        <p className='recent-vs'>VS</p>
                        <div className='recent-fighter-two'>
                        <p className='fighter-name-stats'>{fight.fightertwofullname}</p>
                        <p className='fight-stats'>Strikes Attempted: {fight.fightertwostrikesattempted}</p>
                        <p className='fight-stats'>Strikes Landed: {fight.fightertwostrikeslanded}</p>
                        <p className='fight-stats'>Takedowns Attempted On: {fight.fightertwotakedownattemptagainst}</p>
                        <p className='fight-stats'>Takedowns Defended: {fight.fightertwotakedownattemptdefended}</p>
                        <p className='fight-stats'>Takdowns Attempted: {fight.fightertwotakedownattempted}</p>
                        <p className='fight-stats'>Takedowns Completed: {fight.fightertwotakedowncompleted || 0}</p>
                        </div>
                        {/* {fight.fightid} */}
                    
                    </div>) : <p></p>
                )}
                <div className='page-selector'>
                {pages.map((p, i) => (
                p === page ? (
                     <button onClick={() => changePage(p)} className='selected-page'>{p}</button>

                ) : (
                    <button onClick={() => changePage(p)} className='unselected-page'>{p}</button>

                )))}
                </div>
            </div>
        )
    } else {
        return (
            <div>NONE FOUND</div>
        )
    }
}