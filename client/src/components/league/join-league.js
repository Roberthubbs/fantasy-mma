import React, { useState, Component } from 'react';
import SelectedLeague from './selected-league';


export default class JoinLeagueRequest extends Component{
    constructor(props){
        super(props)
        this.state = {
            requestSent: false,
            leagueName: '',
            leagueAdmin: '',
            fetching: false,
            leagues: [],
            selectedLeague: {leagueName: '', leagueId: null, adminId: null}
        }
      //  this.handleSearch = this.handleSearch.bind(this);
        this.fetchLeaguesAPI = this.fetchLeaguesAPI.bind(this);
        
    }
    
    componentDidMount(){
        this.fetchLeaguesAPI();
    }
   
    fetchLeaguesAPI = () => {
        if (this.state.leagueName.length > 0){
            
            this.setState({ isFetching: true });
            fetch(`/all-leagues/${this.state.leagueName}`)
                .then(res => res.json())
                .then(results => this.setState({ isFetching: false, leagues: results }))
                .catch(error => {
                    console.log(error);
                    this.setState({ isFetching: false });
                });
        } else if (this.state.leagueName.length === 0){
            this.setState({leagues: []})
        }
        

    }
    handleSearch = (e) => {
        this.setState({leagueName: e.target.value}, this.fetchLeaguesAPI);
        //this.fetchLeaguesAPI(this.state.leagueName);
    }
    onLeagueSend = (e) => {
        this.props.sendLeagueRequest(this.props.userId, e)//.then(this.props.history.push('/'))
    }
    
    handleLeagueSelection = (e, league) => {
        e.preventDefault();
        this.setState({selectedLeague: league})
    }
    
    render(){
         
        if (!this.state.selectedLeague.leagueName.length){
            return (
                <div>
                    <h2>Enter League Name to Find A League</h2>
                    <input
                                                
                                                type="text"
                                                placeholder=''
                                                value={this.state.leagueName}
                                                onChange={this.handleSearch}
                                                className="bid-input" />
                    <ul id='league-list-master'>
                    {this.state.leagues.length ? (this.state.leagues.map((league) => (
                        <li className='league-list'> <button className='select-league' onClick={(e => { this.setState({ selectedLeague: { leagueName: league.leagueIdString, leagueId: league.leagueId, adminId: league.teamId, userId: this.props.userId}})})}>{league.leagueIdString} {league.teamId}</button></li>
                    ))) : null}
                    </ul>

                </div >
            ) 
        } else {
            return (
                <div className='outer-selected-league-div'>
                    <SelectedLeague
                        selectedLeague={this.state.selectedLeague}
                        joinLeague={this.props.slr}
                        return='/join-league'
                    />
                    <button onClick={() => this.setState({ selectedLeague: { leagueName: '', leagueId: null, adminId: null }})} className='clear-selected-btn'>Clear Selection</button>
                </div>
            )
            
        }
    }
        
}