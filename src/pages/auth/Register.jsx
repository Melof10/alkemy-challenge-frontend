import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { getAccessTokenApi } from '../../utils/auth';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constants';
import { useForm } from 'react-hook-form';
import { URL_USERS } from '../../utils/constants';
import './styles/auth.css';

function Login(){    

    const [user, setUser] = useState({
        email: null,
        password: null,
        repeatPassword: null
    })    

    const { register, errors, setError, handleSubmit, watch } = useForm();    


    const onSubmit = async(data, e) => {
        e.preventDefault();
        e.target.reset();

        if(data){
            await axios.post(URL_USERS + '/signup', user)
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
                let errorsBack = error.response.data.message;
                console.log(errorsBack)
                for(let i = 0; i < errorsBack.length; i++){
                    if(errorsBack[i].path === "email"){                    
                        setError('email', {
                            type: 'manual',
                            message: errorsBack[i].message
                        });
                    }
                    if(errorsBack[i].path === "password"){
                        setError('password', {
                            type: 'manual',
                            message: errorsBack[i].message
                        });
                    }
                }                
            })
        }        
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
                                <h5 className="text-center font-weight-bold pt-3">REGISTRARSE</h5>                               
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group row">                  
                                            <div className="col-md-12">
                                                <input 
                                                    type="email" 
                                                    id="email" 
                                                    className={errors?.email?.message ? "form-control is-invalid" : "form-control"}
                                                    name="email"                                                     
                                                    onChange={handleChange}
                                                    placeholder="Correo electrónico"
                                                    ref={register({
                                                        required: {
                                                            value: true, 
                                                            message: 'El correo es requerido'
                                                        },
                                                        minLength: {
                                                            value: 4, 
                                                            message: 'Mínimo 2 carácteres'
                                                        }
                                                    })}
                                                />  
                                                <div className={errors?.email?.message ? "invalid-feedback" : "d-none"}>
                                                    {errors?.email?.message}
                                                </div>                                                                                 
                                            </div>
                                        </div>
                                        <div className="form-group row">                  
                                            <div className="col-md-12">
                                                <input 
                                                    type="password" 
                                                    id="password" 
                                                    className={errors?.password?.message ? "form-control is-invalid" : "form-control"} 
                                                    name="password"                                                                                                         
                                                    onChange={handleChange}
                                                    placeholder="Contraseña"
                                                    ref={register({
                                                        required: {
                                                            value: true, 
                                                            message: 'La contraseña es requerida'
                                                        },
                                                        minLength: {
                                                            value: 2, 
                                                            message: 'Mínimo 4 carácteres'
                                                        }
                                                    })}
                                                />    
                                                <div className={errors?.password?.message ? "invalid-feedback" : "d-none"}>
                                                    {errors?.password?.message}
                                                </div>                                            
                                            </div>
                                        </div>                                  
                                        <div className="form-group row">                  
                                            <div className="col-md-12">
                                                <input 
                                                    type="password" 
                                                    id="repeatPassword" 
                                                    className={errors?.repeatPassword?.message ? "form-control is-invalid" : "form-control"} 
                                                    name="repeatPassword"                                                     
                                                    onChange={handleChange}
                                                    placeholder="Repetir Contraseña"
                                                    ref={register({     
                                                        required: {
                                                            value: true, 
                                                            message: 'Repetir la contraseña es requerido'
                                                        },
                                                        minLength: {
                                                            value: 2, 
                                                            message: 'Mínimo 4 carácteres'
                                                        },                                                   
                                                        validate: (value) => value === watch('password') || "Las contraseñas deben coincidir"
                                                    })}
                                                />      
                                                <div className={errors?.repeatPassword?.message ? "invalid-feedback" : "d-none"}>
                                                    {errors?.repeatPassword?.message}
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