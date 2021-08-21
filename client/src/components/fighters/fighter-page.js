import React, { useState } from 'react';

const FighterPage = (props) => {

    let [fighter, updateFighter] = useState({});
    let [received, receive] = useState(false);
    if (!received){
        receive(!received);
        props.fightersPage(props.id).then((res) => {
            debugger;
            updateFighter(res.data)
        })
    }

    return (
        <div>{fighter.nickname}</div> 
    )
}

export default FighterPage;