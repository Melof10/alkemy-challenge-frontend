import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constants';
import './styles/auth.css';

function Login(){
    
    const [user, setUser] = useState({
        email: null, 
        password: null
    });    

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/api/users/signin', user)
        .then(response => {
            const { accessToken, refreshToken } = response.data;            
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);

            window.location.href = '/home';
        }).catch(error => {
            let errorsBack = error.response.data.errors;
            /*for(let i = 0; i < errorsBack.length; i++){
                if(errorsBack[i].path === 'email'){
                    setErrorUser(errorsBack[i].message);
                }
                if(errorsBack[i].path === 'password'){
                    setErrorPassword(errorsBack[i].message);
                }
            }*/
            console.log(errorsBack);
        })
    }    

    return(
        <Fragment>                                            
            <main className="my-form">
                <div className="cotainer">
                    <div className="row justify-content-center align-items-center minh-100">
                        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
                            <div className="card py-3"> 
                                <h5 className="text-center font-weight-bold pt-3">ALKEMY CHALLENGE</h5>                               
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">                  
                                            <div className="col-md-12">
                                                <input 
                                                    type="email" 
                                                    id="email" 
                                                    className="form-control" 
                                                    name="email" 
                                                    onChange={handleChange}
                                                    placeholder="Correo electrónico"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">                  
                                            <div className="col-md-12">
                                                <input 
                                                    type="password" 
                                                    id="password" 
                                                    className="form-control" 
                                                    name="password" 
                                                    onChange={handleChange}
                                                    placeholder="Contraseña"
                                                />
                                            </div>
                                        </div>                                  
                                        <div className="col-md-12">
                                            <button type="submit" className="btn btn-primary col-12 font-weight-bold">
                                                <i class="fas fa-sign-in-alt mr-2"></i>
                                                Iniciar Sesión
                                            </button>
                                        </div>                                                                
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>            
        </Fragment>
    )
}

export default Login;