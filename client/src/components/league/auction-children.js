const AuctionChildren = (props) => {
    let childrenSorted = [];
    if (props.children.length){
        for (let i = props.children.length-1; i >=0 ; i--)
        {
            let child = props.children[i];
            let bidVal = child.split('$');
            let bidder = bidVal[0];
            let val = bidVal[1];
            childrenSorted.push({ bidder: bidder, val: val })
        }
            
        
        return (
            <div className='child-bid'>
                {childrenSorted.map((child) => (
                    <p>{child.bidder} bid {child.val}</p>
                ))}
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
    
}
export default AuctionChildren;