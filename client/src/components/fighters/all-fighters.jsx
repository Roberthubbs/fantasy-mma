/* jshint strict: true */
import React, { useState, useEffect } from 'react';
import Fighter from './fighter';
import axios from 'axios';
//class Fighters extends React.Component {
//const Fighters = (props) => {
const Fighters = (props) => {
    //constructor(props){
       // super(props);
 //       state = {
 //           fighters: props.fighters,
 //           weight: ['HW','LHW','MW','WW','LW','FW','BW','FLW','WBW','WFLW','WSW'],
 //           selectedWeightClass: 'All'
 //       }
        //dropDownChange = dropDownChange.bind(this);
    //}
    let [weight] = useState(['HW', 'LHW', 'MW', 'WW', 'LW', 'FW', 'BW', 'FLW', 'WBW', 'WFLW', 'WSW']);
    let [fighters, changeFighters] = useState(props.fighters);
    let [selectedWeightClass, changeWeightClass] = useState('All');
    //selectedWeightClass = useState(['HW', 'LHW', 'MW', 'WW', 'LW', 'FW', 'BW', 'FLW', 'WBW', 'WFLW', 'WSW']);
    let [updated, update] = useState(true);
    useEffect(() => {
        if (updated){
            update(!updated)
            console.log(selectedWeightClass);
            // props.receiveAllFighters(selectedWeightClass).then((res) => {
            //     debugger;
            //     changeFighters(props.fighters);
            //     //           changeWeightClass(event.target.value)
            // });
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
});

    // const componentDidUpdate = (prevProps) => {
    //     if (prevProps.fighters != fighters){
    //         changeFighters(props.fighters)
    //     }
    // }
    const dropDownChange = (event) => {
        update(!updated);
        //debugger;
        changeWeightClass(event)
    }
    // useEffect(() => {

    //})
    
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
                //    <li> <div>
                //             {/* <h2>{fighter.firstName} {fighter.lastName} #{fighter.ranking}</h2>
                //             <h3>{fighter.lastWeight}</h3>
                //             <h3>{fighter.wins} - {fighter.losses}</h3> */}
                            
                            
                //         </div>
                //     </li>
                    //console.log(fighter.id)
                   
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
//}

export default Fighters;