import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Principal        from './pages/principal/index.jsx';
import Colaborador      from './pages/colaborador/index.jsx';
import Colaborador_Ins  from './pages/colaborador_ins/index.jsx';
import Colaborador_Edt  from './pages/colaborador_edt/index.jsx';
import Login            from './pages/login/index.jsx';
import Paciente         from './pages/paciente/index.jsx';
import Paciente_Ins     from './pages/paciente_ins/index.jsx';
import Paciente_Edt     from './pages/paciente_edt/index.jsx';

function Rotas(){
    return <BrowserRouter>
        <Routes>
            <Route path="/"                                element={<Login           />} />
            <Route path="/login"                           element={<Login           />} />
            <Route path="/principal"                       element={<Principal       />} />            
            <Route path="/colaborador"                     element={<Colaborador     />} />
            <Route path="/colaborador/inserir"             element={<Colaborador_Ins />} />
            <Route path="/colaborador/editar/:cod_pessoa"  element={<Colaborador_Edt />} />
            <Route path="/paciente"                        element={<Paciente        />} />
            <Route path="/paciente/inserir"                element={<Paciente_Ins    />} />
            <Route path="/paciente/editar/:cod_pessoa"     element={<Paciente_Edt    />} />           
        </Routes>
    </BrowserRouter>    
}

export default Rotas;