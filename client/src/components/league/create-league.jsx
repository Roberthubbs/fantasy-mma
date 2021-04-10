import React, { Component } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export default class CreateLeague extends Component {
    constructor(props){
        super(props);
        this.state = {
            leagueName: '',
            maxPlayerCount: 1,
            selectAbleCount: '1,2,3,4,5,6,7,8,9,10,11,12,13,14'.split(','),
            value: '',
            leagueStartDate: null, leagueEndDate: null, eventTotal: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.dropDownChange = this.dropDownChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.dropDownChange = this.dropDownChange.bind(this);
        this.eventTotalChange = this.eventTotalChange.bind(this);
    }

    handleStartDateChange(e){
        console.log(e);
        this.setState({leagueStartDate: e});

    }

    handleEndDateChange(e) {
        console.log(e);
        this.setState({ leagueEndDate: e });

    }
    eventTotalChange(e) {
        this.setState({eventTotal: e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.createLeague(this.state.leagueName, this.props.teamId, this.state.maxPlayerCount, this.state.leagueStartDate,this.state.leagueEndDate,this.state.eventTotal).then((res) => {
            this.props.history.push("/")

        })
    }
    handleChange(event) {
        this.setState({ leagueName: event.target.value });
    }


    dropDownChange(event){
        this.setState({ maxPlayerCount: event.target.value });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    New League Name:
                    <br/>
                    <input type="text" value={this.state.leagueName} onChange={this.handleChange} />
                </label>
                <div>
                    Maximum Number of Players:
                    <br />
                    <select name="Max Players in League" value={this.state.maxPlayerCount} onChange={this.dropDownChange} id="">
                        {this.state.selectAbleCount.map((listVal) => (
                            <option value={listVal}>{listVal}</option>
                        ))}

                    </select>
                </div>
                <div>
                    League Start Date:
                    <br />
                    <DatePicker selected={this.state.leagueStartDate} onChange={this.handleStartDateChange} />
                </div>
                <div>
                    League End Date:
                    <br />
                    <DatePicker selected={this.state.leagueEndDate} onChange={this.handleEndDateChange} />
                </div>
                <div>
                    Minimum Event Total:
                    <br/>
                    <input type="text" value={this.state.eventTotal} onChange={this.eventTotalChange} />

                </div>
                <input type="submit" value="Create League" onSubmit={this.handleSubmit}/>
            </form>
        )
    }
}
