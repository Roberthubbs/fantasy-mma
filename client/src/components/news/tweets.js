import { Timeline } from 'react-twitter-widgets'
import React from 'react';

const NewsFeed = (props) => {
    return (
        <Timeline 
            dataSource={{
                sourceType: 'list',
                id: '1429473826811924482'
            }}
            options={{
                height: '600',
                width: '500'
            }}
        />
    )

}

export default NewsFeed