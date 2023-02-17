import React from 'react';
import {Link} from 'react-router-dom';

function Menu(){
    return <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-primary ps-3 pe-3">
        <div className="container-fluid">        
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                            
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link to="/principal"className="btn btn-outline-light me-3" aria-current="page"><i className="fas fa-home"></i>Início</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/pessoa" className="btn btn-outline-light me-3"><i className="fa-regular fa-users-medical"></i>Pessoas</Link>
                    </li>                                     
                </ul>

                <div className="btn-group">
                    <button type="button" className="btn btn-outline-light me-3 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-user"></i>adm
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">                    
                        <li><Link to="/#"     className="dropdown-item">Meus Perfil</Link></li>
                        <li><Link to="/#"     className="dropdown-item">Configurações</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link to="/" className="dropdown-item">Sair</Link></li> {/*login*/}
                    </ul>
                </div>
            </div>
        </div>
    </nav>
}

export default Menu;