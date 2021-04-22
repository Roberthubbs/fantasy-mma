import React, { Component } from 'react'
import AuctionChildren  from './auction-children';
import { Link } from 'react-router-dom';
export default class LeagueAuction extends Component {
    constructor(props){
        super(props);
        this.state = {
            bids: [],
            bid: "",
            callRefresh: true
        }
        this.updateBid = this.updateBid.bind(this);
    //    this.handleRefresh = this.handleRefresh.bind(this);
    }

    componentDidMount(){
        console.log(this.props);
        if(this.state.callRefresh){
          //  //debugger;
            this.setState({callRefresh: false});
            this.props.fetchAllBids(this.props.leagueId).then((res) => {
                console.log(this.props, 'props');
                let arr = res.bids.data;
                arr.forEach((bid, i) => {
                    bid.bidding = bid.bidCost + 1;
                    bid.caps = (i == 0 || (bid.fighterId !== arr[i-1].fighterId));
                    
                })
                this.setState({ bids: arr })
                //this.setState({ biddings: new Array(this.state.bids.length).fill("0") })

            })
        }
    }

    handleRefresh = () => {
        // by calling this method react re-renders the component
        this.setState({callRefresh: true});
        this.componentDidMount();
    };
    updateBid = (idx) => (evt) => {
        // let arr = this.state.bidding;
        // arr[i] = e.target.value;
        // this.setState({bidding: arr});
        const newBids = this.state.bids.map((bid, sidx) => {
            if (idx !== sidx) return bid;
            return { ...bid, bidding: evt.target.value };
        });

        this.setState({ bids: newBids });
    }
    render() {
        if (!this.state.bids){
            return false;
        }
        console.log(this.state.bids);
        return (
            <div className='league-auction'>
                <div className="auction-side-bar">
                    <h2>League {this.props.leagueId} Auction:</h2>
                    <br/>
                    <p className='auction-to-fa'><Link to={`/free-agents/${this.props.leagueId}`} className='fa-link'>Back To Free Agents</Link></p>
                </div>
                {this.state.bids.map((bid, i) => (
                    
                        <div className="caps-auction">
                            <form>
                                <h3>{bid.firstName} {bid.lastName}</h3>
                                <p>Weight Class: {bid.lastWeight}</p>
                                <p>Current Bid: {bid.bidCost} By: {bid.usernameOfBidder}</p>
                                <br />
                                <label>Bid:
                                    <br />
                            <input
                                        key={i}
                                        type="text"
                                        placeholder={bid.bidCost+1}
                                        value={bid.bidding}
                                        onChange={this.updateBid(i)}
                                        className="bid-input" />
                                </label>
                                <br/>
                                <button className="bid-button" onClick={(() => this.props.addFreeAgent(bid.fighterId, this.props.leagueId, this.props.teamId, bid.bidding).then(this.handleRefresh))}>Place Bid</button>
                            
                            
                            </form>
                        {bid.children ? <AuctionChildren
                            children={bid.children}
                        />: null }
                        </div>

                ))}
                      
                
            </div>
        )
    }
}
