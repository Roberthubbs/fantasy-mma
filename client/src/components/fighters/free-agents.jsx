import React from 'react';
import Fighter from './fighter';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

export default class FreeAgents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fighters: this.props.fighters,
            weight: ['All', 'HW', 'LHW', 'MW', 'WW', 'LW', 'FW', 'BW', 'FLW', 'WBW', 'WFLW', 'WSW'],
            weightClass: 'All',
            cost: 0,
            bids: []
        }
        this.dropDownChange = this.dropDownChange.bind(this);
        this.bidChange = this.bidChange.bind(this);
    }
    componentDidMount(){
        this.props.fetchAllFreeAgents(this.props.leagueId, this.state.weightClass);
    }
    
    componentDidUpdate(prevProps){

        if (prevProps.match.params.leagueId !== this.props.leagueId){
            this.props.fetchAllFreeAgents(this.props.leagueId);
        }

        if (prevProps.fighters !== this.props.fighters){
            this.setState({fighters: this.props.fighters})
        }
    }

    bidChange(e){
        this.setState({cost: e.target.value})
    }
    dropDownChange(event) {
        this.props.fetchAllFreeAgents(this.props.leagueId, event.currentTarget.value);

        this.setState({ weightClass: event.currentTarget.value })

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
                Free Agents:
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

                <div>
                        <Fighter
                            key={i}
                            firstName={fighter.firstName}
                            lastName={fighter.lastName}
                            ranking={fighter.ranking}
                            weightClass={fighter.lastWeight}
                            wins={fighter.wins}
                            losses={fighter.losses}
                        />
                        {fighter.current_bid ? 
                        <div>
                        <p>Current Bid: {fighter.current_bid}</p> 
                        <br />
                        <Link to={`/league-auction/${this.props.leagueId}`}>To Auction</Link>
                        </div>
                        : 
                        <div>
                        <input type="text" value={this.state.coast} onChange={this.bidChange}/>
                        <button onClick={(() => this.props.addFreeAgent(fighter.id, this.props.leagueId, this.props.teamId, this.state.cost).then(this.props.history.push(`/league-auction/${this.props.leagueId}`)))}>
                        
                        
                    Bid
                   
                    
                    </button>
                    </div>}
                </div>
                    
                    
                ))}
                </div>
            </div>
        )
    }

}
