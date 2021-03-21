import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Home from '../Home';
import Income from '../Income';
import Expenses from '../Expenses';

function MenuDashboard(){

  const [option, setOption] = useState(1);  
  
  return (
    <Fragment>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">    
        <Link to="/" className="brand-link text-center">      
          <span className="brand-text font-weight-light font-weight-bold text-warning">ALKEMY CHALLENGE</span>
        </Link>    
        <div className="sidebar-dark-primary">  
          <div className="user-panel py-2 text-center bg-warning" title="Nombre del torneo">        
            <div className="info m-0 pr-2">
              <h6 className="text-dark pt-2 font-weight-bold m-0">Administrador de Presupuesto</h6>
            </div>
          </div>                 
          <nav>
            <ul className="nav nav-sidebar sidebar-dark-primary flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <Link onClick={() => setOption(1)} to="#" className={option === 1 ? "nav-link text-white font-weight-bold active" : "nav-link text-white"}>
                  <i class="fas fa-home nav-icon mr-1" />
                  <p>Home</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link onClick={() => setOption(2)} to="#" className={option === 2 ? "nav-link text-white font-weight-bold active" : "nav-link text-white"}>
                  <i className="fas fa-arrow-down nav-icon mr-1" />
                  <p>Ingresos</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link onClick={() => setOption(3)} to="#" className={option === 3 ? "nav-link text-white font-weight-bold active" : "nav-link text-white"}>
                  <i class="fas fa-arrow-up nav-icon mr-1" />
                  <p>Egresos</p>
                </Link>
              </li>
            </ul>
          </nav>      
        </div>    
      </aside>
      <div className="content-wrapper">    
        <section className="content">
          <div className="container d-flex justify-content-center">  
            {option === 1 &&
              <Home/>
            }
            {option === 2 &&
              <Income />
            }
            {option === 3 &&
              <Expenses />
            }
          </div>
        </section>    
      </div>
    </Fragment>
  )
}

export default MenuDashboard;
