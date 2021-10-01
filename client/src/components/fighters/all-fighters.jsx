/* jshint strict: true */
import React, { useState, useEffect } from 'react';
import Fighter from './fighter';
import axios from 'axios';
const Fighters = (props) => {

    let [weight] = useState(['All', 'HW', 'LHW', 'MW', 'WW', 'LW', 'FW', 'BW', 'FLW', 'WBW', 'WFLW', 'WSW']);
    let [fighters, changeFighters] = useState(props.fighters);
    let [selectedWeightClass, changeWeightClass] = useState('All');
    let [updated, update] = useState(true);
    useEffect(() => {
        if (updated){
            update(!updated)
            axios.request('/all', {
                data: {
                    selectedWeightClass
                },
                method: "post",
                headers: { 'Content-Type': 'application/json'}
            }).then((res) => {
                changeFighters(res.data);
            });



    }
    }, [updated, selectedWeightClass]);

    const dropDownChange = (event) => {
        update(!updated);
        changeWeightClass(event)
    }

    
        if (!fighters){
            return(
                <div>

                    Loading...
                </div>
            )
        }
        return (
            <div>
                All Fighters:
                <div>
                    Choose Weight Class:
                    <br />
                    <select name="Max Players in League" value={selectedWeightClass} onChange={e => 
                        dropDownChange(e.currentTarget.value)
                        
                    } 
                        
                    id="">
                        {weight.map((listVal) => (
                            <option value={listVal} key={listVal} >{listVal}</option>
                        ))}

                    </select>
                </div>
                <div>{fighters.map((fighter, i) => (
                   
                    <Fighter
                        key={i}
                        firstName={fighter.firstName}
                        lastName={fighter.lastName}
                        ranking={fighter.ranking}
                        weightClass={fighter.lastWeight}
                        wins={fighter.wins}
                        losses={fighter.losses}
                    />
                    
                    
                ))}
                </div>
            </div>
        )
    }


export default Fighters;