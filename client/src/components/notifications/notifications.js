import { useState } from 'react';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const Notifications = (props) => {
    let [notifications, addNotifications] = useState([]);
    let [searched, setSearch] = useState(false);
    const getNoti = () => {
        if (!searched && !notifications.length){
            setSearch(true);

            props.getNotifications(props.userId).then(res => {
                debugger;
                addNotifications(res.notifications.data);
            })
        }
        
    }
    if (!notifications.length){
 //       debugger;
        getNoti()
    }
   
    if (notifications.length){
        return (
            <div className='notifications'>
                <span className='notif-header-span'>
                <h4 className='notifications-header'>Notifications: </h4>
                </span>
                {notifications.map((notif) => (
                    <div class='league-request-noti-view'>
                        {notif.type == 1 ? (<p>{notif.sendername} would like to join your league</p>) : null}
                        <p>{notif.requestMessage}</p>
                        {notif.responded ? (
                        <span>
                        <button onClick={() => props.respond(notif.senderId, 1, notif.joinLeagueRequest).then(setSearch(false))}>Accept</button><button onClick={() => props.respond(notif.senderId, 1, notif.joinLeagueRequest).then(setSearch(false))}>Decline</button>
                            </span>) : <p><FontAwesomeIcon icon={faCheckCircle } /> Responded</p>}
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            <div>Nothing to see here...</div>
        )
    }
  
}

export default Notifications;