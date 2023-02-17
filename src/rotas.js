import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Principal    from './pages/principal/index.jsx';
import Pessoa       from './pages/pessoa/index.jsx';
import Pessoa_Ins   from './pages/pessoa_ins/index.jsx';
import Pessoa_Edt   from './pages/pessoa_edt/index.jsx';
import Login        from './pages/login/index.jsx';

function Rotas(){
    return <BrowserRouter>
        <Routes>
            <Route path="/"                          element={<Login      />} /> {/*login*/}
            <Route path="/principal"                 element={<Principal  />} />            
            <Route path="/pessoa"                    element={<Pessoa     />} />
            <Route path="/pessoa/inserir"            element={<Pessoa_Ins />} />
            <Route path="/pessoa/editar/:cod_pessoa" element={<Pessoa_Edt />} /> 
        </Routes>
    </BrowserRouter>    
}

export default Rotas;