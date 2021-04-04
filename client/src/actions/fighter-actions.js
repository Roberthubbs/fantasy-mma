import * as FighterUtils from '../utils/fighter-utils';

export const RECEIVE_ALL_FIGHTERS = "RECEIVE_ALL_FIGHTERS";
export const receiveAllFighters = fighters => ({
    type: 'RECEIVE_ALL_FIGHTERS',
    fighters
});

export const fetchAllFighters = () => dispatch => (
    FighterUtils.receiveAll().then((fighters) => {
        dispatch(receiveAllFighters(fighters));
    })
);