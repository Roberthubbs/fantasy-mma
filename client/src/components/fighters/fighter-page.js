import fetch from 'node-fetch';
import React, { useState } from 'react';

const FighterPage = (props) => {

    let [fighter, updateFighter] = useState({});
    let [received, receive] = useState(false);
    if (!received){
        receive(!received);
        const id = props.match.params.id
        debugger;
        
        // props.fightersPage(id).then((res) => {
        //     debugger;
        //     updateFighter(res.data)
        // })
        // return await axios.request(`/fighter/cumulative-stats/${id}`, {
        // method: "post",
        // headers: allHeaders
        // })
        fetch(`/fighter/cumulative-stats/${id}`,{
            method: 'get',
            headers: { 'Content-Type': 'application/json' },

        })
        .then(res => res.json())
        .then(res => updateFighter(res));
    }
    if (fighter){
        return (
        <div>
            {fighter.fighter_name}
            <br />
            {fighter.nickname}
            <br />
            Height: {fighter.height}
            <br />
            Reach: {fighter.reach}
            <br />
            Stance: {fighter.stance}
            <br />
            Date of Birth: {fighter.dob} 
            <br />
            Strikes Landed Per Minute: {fighter.slpm}
            <br />
            Striking Accuracy: {fighter.slaccuracy}
            <br />
            Strikes Attempted Per Minute: {fighter.sapminute}
            <br />
            Striking Defense: {fighter.strdef}
            <br />
            Takedown Average{fighter.tdavg}
            <br />
            Takedown Accuracy: {fighter.tdacc}
            <br />
            Takedown Defense: {fighter.tddef}
            <br />
            Submission Attempts Per Fifteen: {fighter.subattperfifteen}
            <br />
            {fighter.record}
        
        </div>
        )
    } else {
        return (
            <div>Ooops</div>
        )
    }

}

export default FighterPage;