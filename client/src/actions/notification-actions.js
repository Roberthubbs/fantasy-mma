import * as NotificationUtils from '../utils/notification-utils';
export const RECEIVE_NOTIFICATION = "RECEIVE_NOTIFICATION";
export const RECEIVE_NOTIFICATION_ERRORS ="RECIEVE_NOTIFICATION_ERRORS";

export const receiveNotifications = (notifications) => ({
    type: RECEIVE_NOTIFICATION,
    notifications
})

export const receiveErrors = (err) => ({
    type: RECEIVE_NOTIFICATION_ERRORS,
    errors: err
})
export const fetchUserNotifs = (userId) => dispatch => (
    NotificationUtils.getUserNotifs(userId).then((res) => 
    dispatch(receiveNotifications(res))
    , err => (
        dispatch(receiveErrors(err))
    ))
);
export const respondToJoinRequest = (userId, response, requestId, leagueId) => dispatch => (
    NotificationUtils.respondToLeagueJoin(userId, response, requestId).then((res) => 
        dispatch(receiveNotifications(res))
        , err => (
            dispatch(receiveErrors(err))
    ))
    
)