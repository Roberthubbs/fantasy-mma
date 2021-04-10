import React from 'react'
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './App';
const Root = ({ store }) => 
{
    console.log(store, "store");
    //debugger;
    return (
        <Provider store={store} >
            <HashRouter>
                <App user={store.getState().session.id} />
            </HashRouter>
        </Provider >
    )
        
    
    
};

export default Root;