import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { getAccessTokenApi } from '../../utils/auth';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constants';
import './styles/auth.css';

function Login(){    

    const [user, setUser] = useState({
        email: null,
        password: null,
        repeatPassword: null
    })

    const [errorEmail, setErrorEmail] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const [errorRepeatPassword, setErrorRepeatPassword] = useState();    

    const handleSubmit = async(e) => {
        e.preventDefault();

        setErrorEmail();
        setErrorPassword();
        setErrorRepeatPassword();

        await axios.post('http://localhost:3000/api/users/signup', user)
        .then(response => {
            console.log(response.data);                        
            clearUser();
            setUser({
                email: null,
                password: null,
                repeatPassword: null
            });                
            const { accessToken, refreshToken } = response.data;            
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);

            window.location.href = '/home';            
        }).catch(error => {
            console.log(error.response.data.errors);            
            let errorsBack = error.response.data.errors;
            for(let i = 0; i < errorsBack.length; i++){
                if(errorsBack[i].path === "email"){                    
                    setErrorEmail(errorsBack[i].message);                                    
                }
                if(errorsBack[i].path === "password"){
                    setErrorPassword(errorsBack[i].message);                    
                }
                if(errorsBack[i].path === "repeatPassword"){
                    setErrorRepeatPassword(errorsBack[i].message);                    
                }
            }
        })
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })        
    }   

    const clearUser = () => {
        const inputEmail = document.getElementById('email');
        const inputPassword = document.getElementById('password');
        const inputRepeatPassword = document.getElementById('repeatPassword');

        inputEmail.value = '';
        inputPassword.value = '';
        inputRepeatPassword.value = '';
    }

    if (getAccessTokenApi()) {
        return <Redirect to="/home" />
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
                                                    className={errorEmail ? "form-control is-invalid" : "form-control"} 
                                                    name="email"                                                     
                                                    onChange={handleChange}
                                                    placeholder="Correo electrónico"
                                                />
                                                <div className={errorEmail ? "invalid-feedback" : "d-none"}>
                                                    {errorEmail}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">                  
                                            <div className="col-md-12">
                                                <input 
                                                    type="password" 
                                                    id="password" 
                                                    className={errorPassword ? "form-control is-invalid" : "form-control"} 
                                                    name="password"                                                                                                         
                                                    onChange={handleChange}
                                                    placeholder="Contraseña"
                                                />
                                                <div className={errorPassword ? "invalid-feedback" : "d-none"}>
                                                    {errorPassword}
                                                </div>
                                            </div>
                                        </div>                                  
                                        <div className="form-group row">                  
                                            <div className="col-md-12">
                                                <input 
                                                    type="password" 
                                                    id="repeatPassword" 
                                                    className={errorRepeatPassword ? "form-control is-invalid" : "form-control"}  
                                                    name="repeatPassword"                                                     
                                                    onChange={handleChange}
                                                    placeholder="Repetir Contraseña"
                                                />
                                                <div className={errorRepeatPassword ? "invalid-feedback" : "d-none"}>
                                                    {errorRepeatPassword}
                                                </div>
                                            </div>
                                        </div>                                  
                                        <div className="col-md-12">
                                            <button type="submit" className="btn btn-primary col-12 font-weight-bold">
                                                <i class="fas fa-user-plus mr-2"></i>
                                                Registrarse
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