import React, { useState, Fragment } from 'react';
import Login from './Login';
import Register from './Register';
import { Link } from 'react-router-dom';
import { getAccessTokenApi } from '../../utils/auth';
import { Redirect } from 'react-router-dom';

function Auth(){
    const [option, setOption] = useState(1);
    
    if (getAccessTokenApi()) {
        return <Redirect to="/home" />
    }

    return(
        <Fragment>
            <nav className='navbar navbar-expand-lg navbar-dark fixed-top' id="mainNav">
                <div className="container-fluid">
                    <a className="navbar-brand js-scroll-trigger" href="#page-top"><small className="font-weight-bold">ALKEMY CHALLENGE</small></a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">                        
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto font-weight-bold">                            
                            <li className="nav-item">
                                <Link className="nav-link" onClick={() => setOption(1)} to="#">
                                    <i className="fas fa-sign-in-alt mr-1"></i>
                                    Ingresar
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={() => setOption(2)} to="#">
                                    <i className="fas fa-user-plus mr-1"></i>
                                    Registrarse
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {option === 1 &&
                <Login />
            }            
            {option === 2 &&
                <Register />
            }
        </Fragment>
    )
}

export default Auth;