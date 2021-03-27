import React from 'react';
import useAuth from '../hooks/useAuth';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from '../pages/auth/Auth';

function Layout(props){
    const { routes } = props;  
    const { user, isLoading } = useAuth();          

    if (!user && !isLoading) {
        return (
          <>
            <Route path="/login" component={Auth} />
            <Redirect to="/login" />
          </>
        );
    }

    if(user && !isLoading){
        return(                        
            <div>                
                <LoadRoutes routes={routes} />                        
            </div>
        );
    }    

    return null;
}

function LoadRoutes({ routes }) {
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    );
}

export default Layout;