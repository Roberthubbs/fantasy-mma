import React from 'react';

class Fighters extends React.Component {
    constructor(props){
        super(props);
     //   this.state.fighters = this.props.fighters;
    }
    componentDidMount(){
        this.props.receiveAllFighters();
    }
    render(){
        if (!this.props.fighters){
            return(
                <div>

                    Loading...
                </div>
            )
        }
        return (
            <div>
                Console Logging Fighters...
                {this.props.fighters.map((fighter) => {
                    console.log(fighter)
                })}
            </div>
        )
    }

}
export default Fighters;