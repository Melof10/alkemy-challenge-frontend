import React, { Fragment } from 'react';
import './styles/auth.css';

function Login(){
    return(
        <Fragment>                                            
            <main className="my-form">
                <div className="cotainer">
                    <div className="row justify-content-center align-items-center minh-100">
                        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
                            <div className="card py-3"> 
                                <h5 className="text-center font-weight-bold pt-3">ALKEMY CHALLENGE</h5>                               
                                <div className="card-body">
                                    <form name="my-form" onsubmit="return validform()" action="success.php" method>
                                        <div className="form-group row">                  
                                            <div className="col-md-12">
                                                <input type="text" id="full_name" className="form-control" name="full-name" placeholder="Correo electrónico"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">                  
                                            <div className="col-md-12">
                                                <input type="text" id="email_address" className="form-control" name="email-address" placeholder="Contraseña"/>
                                            </div>
                                        </div>                                  
                                        <div className="form-group row">                  
                                            <div className="col-md-12">
                                                <input type="text" id="email_address" className="form-control" name="email-address" placeholder="Repetir Contraseña"/>
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