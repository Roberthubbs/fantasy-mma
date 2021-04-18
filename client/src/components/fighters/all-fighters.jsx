import React from 'react';
import Fighter from './fighter';
class Fighters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fighters: this.props.fighters,
            weight: ['HW','LHW','MW','WW','LW','FW','BW','FLW','WBW','WFLW','WSW'],
            selectedWeightClass: 'All'
        }
        this.dropDownChange = this.dropDownChange.bind(this);
    }
    componentDidMount(){
        this.props.receiveAllFighters(this.state.selectedWeightClass)
    }
    componentDidUpdate(prevProps){
        if (prevProps.fighters != this.props.fighters){
            this.setState({fighters: this.props.fighters})
        }
    }
    dropDownChange(event) {
        debugger;
        this.props.receiveAllFighters(event.target.value);

        this.setState({ selectedWeightClass: event.currentTarget.value })
        //console.log(this.state.selectedWeightClass);
       
    }
    
    render(){
        if (!this.state.fighters){
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
                    <select name="Max Players in League" value={this.state.weightClass} onChange={this.dropDownChange} id="">
                        {this.state.weight.map((listVal) => (
                            <option value={listVal}>{listVal}</option>
                        ))}

                    </select>
                </div>
                <div>{this.state.fighters.map((fighter, i) => (
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

}
export default Fighters;