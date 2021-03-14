import React from 'react';

function Header(){    
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">        
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars" /></a>
          </li>      
        </ul>            
        <ul className="navbar-nav ml-auto">                    
          <li className="nav-item my-0 py-0 dropdown">
            <a className="nav-link dropdown-toggle font-weight-bold" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                        
              95fedemelo@gmail.com
            </a>
            <div className="dropdown-menu dropdown-menu-right text-left">
              <a href="#" className="dropdown-item">
                <i className="fas fa-user mr-2"></i>
                Perfil
              </a>                            
              <div className="dropdown-divider"></div>
              <a href="/logout" className="dropdown-item text-danger">
                <i className="fas fa-power-off mr-2"></i>
                Cerrar Sesión
              </a>                        
            </div>
          </li>
        </ul>        
      </nav>
    </div>
  )  
}

export default Header;