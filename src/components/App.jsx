import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Main from './Main';
import NotFound from '../pages/NotFound';

function App(){    
    return(
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Main}/>                    
                    <Route exact path="/login" component={Login}/>                    
                    <Route exact path="/register" component={Register}/>                                        
                    <Route component={NotFound}/>                                        
                </Switch>
            </Layout>            
        </BrowserRouter>
    )
}

export default App;