const Fighter = (props) => {
        
       return (

            <div>
                <h3>{props.firstName} {props.lastName} {props.ranking}</h3>
                <h2>{props.weightClass}</h2>
                <h2>{props.wins} - {props.losses}</h2>

            </div>
       )
        
    
}

export default Fighter;