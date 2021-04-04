import React from 'react';
import Fighter from './fighter';
class Fighters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fighters: this.props.fighters
        }
        this.arr = ['2','4','6','7']
    }
    componentDidMount(){
        this.props.receiveAllFighters();
    }
    componentDidUpdate(prevProps){
        if (prevProps.fighters != this.props.fighters){
            this.setState({fighters: this.props.fighters})
        }
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