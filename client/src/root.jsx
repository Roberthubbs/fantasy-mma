import React, { useContext }  from 'react'
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App-container';

const Root = ({ store }) => 
{
    
    return (
        <Provider store={store} >
            <HashRouter>
                <App user={store.getState().session.id} />
            </HashRouter>
        </Provider >
    )
        
    
    
};

export default Root;