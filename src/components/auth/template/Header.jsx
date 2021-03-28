import React  from 'react';
import { logout } from '../../../utils/auth';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import challengePDF from '../../../assets/pdf/alkemy-challenge-js.pdf';

function Header(){    

  const { user } = useAuth();

  const logoutUser = () => {
    logout();
    window.location.reload();
  }

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">        
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="/"><i className="fas fa-bars" /></a>
          </li>      
        </ul>            
        <ul className="navbar-nav ml-auto">                    
          <li className="nav-item my-0 py-0 dropdown">
            <a className="nav-link dropdown-toggle font-weight-bold" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                        
              {user.email}
            </a>
            <div className="dropdown-menu dropdown-menu-right text-left">
              <a href={challengePDF} target="_blank" className="dropdown-item">
              <i className="far fa-file-pdf mr-2"></i>
                Challenge PDF
              </a>                            
              <div className="dropdown-divider"></div>
              <Link onClick={logoutUser} to="#" className="dropdown-item text-danger">
                <i className="fas fa-power-off mr-2"></i>
                Cerrar Sesión
              </Link>                        
            </div>
          </li>
        </ul>        
      </nav>
    </div>
  )  
}

export default Header;