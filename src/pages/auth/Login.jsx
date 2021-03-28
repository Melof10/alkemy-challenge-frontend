import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constants';
import { useForm } from 'react-hook-form';
import { URL_USERS } from '../../utils/constants';
import './styles/auth.css';

function Login(){
    
    const [user, setUser] = useState({
        email: null, 
        password: null
    });    

    const {register, errors, setError, handleSubmit} = useForm();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }    

    const onSubmit = async(data, e) => {        
        e.preventDefault();
        e.target.reset();
        if(data){                            
            await axios.post(URL_USERS + '/signin', user)
            .then(response => {
                const { accessToken, refreshToken } = response.data;            
                localStorage.setItem(ACCESS_TOKEN, accessToken);
                localStorage.setItem(REFRESH_TOKEN, refreshToken);
        
                window.location.href = '/home';
            }).catch(error => {              
                setError('email', {
                    type: 'manual',
                    message: error.response.data.message 
                });
                setError('password', {
                    type: 'manual',
                    message: ' '
                });
                console.log(error.response.data.message);
            })            
        }
                
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
                                                            value: 2, 
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
                                                    name="password" 
                                                    className={errors?.password?.message ? "form-control is-invalid" : "form-control"}
                                                    ref={register({
                                                        required: {
                                                            value: true, 
                                                            message: 'La contraseña es requerida'
                                                        },
                                                        minLength: {
                                                            value: 2, 
                                                            message: 'Mínimo 2 carácteres'
                                                        }
                                                    })}                                                    
                                                    onChange={handleChange}
                                                    placeholder="Contraseña"
                                                />
                                                <div className={errors?.password?.message ? "invalid-feedback" : "d-none"}>
                                                    {errors?.password?.message}
                                                </div>
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