import React from 'react';
import Fighter from './fighter';
export default class FreeAgents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fighters: this.props.fighters
        }
        
    }
    componentDidMount(){
        this.props.fetchAllFreeAgents(this.props.leagueId);
    }
    componentDidUpdate(prevProps){
        console.log(prevProps, "prevProps");
        console.log(this.props, "props");
       
        if (prevProps.match.params.leagueId !== this.props.leagueId){
            this.props.fetchAllFreeAgents(this.props.leagueId);
        }

        if (prevProps.fighters != this.props.fighters){
            this.setState({fighters: this.props.fighters})
        }
    }
    // handleClick(e, fighterId){
    //     e.preventDefault();
    //     this.props.addFreeAgent()
    // }
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
                Free Agents:
                
                <div>{this.state.fighters.map((fighter, i) => (
                //    <li> <div>
                //             {/* <h2>{fighter.firstName} {fighter.lastName} #{fighter.ranking}</h2>
                //             <h3>{fighter.lastWeight}</h3>
                //             <h3>{fighter.wins} - {fighter.losses}</h3> */}
                            
                            
                //         </div>
                //     </li>
                    //console.log(fighter.id)
                    <button onClick={(() => this.props.addFreeAgent(this.props.leagueId, this.props.teamId, fighter.id))}>
                    <Fighter
                        key={i}
                        firstName={fighter.firstName}
                        lastName={fighter.lastName}
                        ranking={fighter.ranking}
                        weightClass={fighter.lastWeight}
                        wins={fighter.wins}
                        losses={fighter.losses}
                    />
                    
                </button>
                    
                    
                ))}
                </div>
            </div>
        )
    }

}
