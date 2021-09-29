import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
function Logout (props) {
    const history = useHistory();
    const [refreshed, refresh] = useState(false)

    function refreshIt(e){
        refresh(!refreshed)
    }
    if (props.user){
        return (
            <button className='logout-button' onClick={() => props.logout({user: {id: props.user, password: props.pw}}).then(refreshIt).then(() => history.push('/all'))}>Logout</button>
        )
    } else {
        return (<div></div>)
    }
}

export default Logout;