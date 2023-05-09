import Menu                                       from "../../components/menu/index.jsx";
import ListaPessoa                                from '../../components/lista_pessoa/index';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate }                            from 'react-router-dom';
import Axios                                      from "axios";
import { AuthContext }                            from "../../context/auth.jsx";
import dns_api                       from '../../config/constante';

//const apiUrl = process.env.REACT_APP_API_URL; /*variavel de ambiente, tem que iniciar com REAC_APP_ e restante eh de livre digitacao*/
//const apiUrl = "http://localhost:5000";
//const apiUrl = "https://portsonline.com.br";
const apiUrl = dns_api();

function Pessoa(){
  const [pessoa,          setPessoa]        = useState();  
  const [excluido,        setExcluido]      = useState();
  const [flg_tipo_pessoa, setFlgTipoPessoa] = useState('T'); //Todos 

  const navigate = useNavigate();

  const {logado} = useContext(AuthContext);

//Inicio - lista todos  
  useEffect(() => {
    Axios.get(apiUrl + "/pessoa/listar/" + localStorage.getItem("cod_conta"))
    .then((response) =>{
      setPessoa(response.data);
    })
  }, []);

  useEffect(() => {
    Axios.get(apiUrl + "/pessoa/listar/" + localStorage.getItem("cod_conta"))
    .then((response) =>{
      setPessoa(response.data);
    })
  }, [excluido]);

  function Novo(){
    navigate('/pessoa/inserir');
  };

  async function Excluindo(cod_pessoa){
    return await Axios.delete(apiUrl + "/pessoa/excluir/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa);
  };

  function Excluir(cod_pessoa){
    let codigo = cod_pessoa;    
    Excluindo(cod_pessoa).then((response) =>{
      setExcluido(codigo);
    });    
  };

  function Pesquisar(){
  //Todos
    if (flg_tipo_pessoa === 'T'){
      Axios.get(apiUrl + "/pessoa/listar/" + localStorage.getItem("cod_conta"))
      .then((response) =>{
        setPessoa(response.data);
      });
    }

  // Pacientes
    else if (flg_tipo_pessoa === 'P'){
      Axios.get(apiUrl + "/paciente/listar/" + localStorage.getItem("cod_conta"))
      .then((response) =>{
        setPessoa(response.data);    
      });
    }
    
  //Colaboradores  
    else if (flg_tipo_pessoa === 'C'){
      Axios.get(apiUrl + "/colaborador/listar/" + localStorage.getItem("cod_conta"))
      .then((response) =>{
        setPessoa(response.data);    
      });
    }

  //Fornecedores  
    else if (flg_tipo_pessoa === 'F'){
      Axios.get(apiUrl + "/fornecedor/listar/" + localStorage.getItem("cod_conta"))
      .then((response) =>{
        setPessoa(response.data);    
      });
    }
    
  //Contatos  
    else if (flg_tipo_pessoa === 'N'){
      Axios.get(apiUrl + "/contato/listar/" + localStorage.getItem("cod_conta"))
      .then((response) =>{
        setPessoa(response.data);    
      });
    };
  };

  return <>
    {logado?    
      <Menu/>
    :null} 

    {logado?    
      <div className="container-fluid titulo justify-content-between mt-page">
      <h3 className = "text-center">Pessoas</h3>

      <div className="row">
        <div className="col-4">
        {/*Btn Novo*/}
          <button onClick={Novo} className="btn btn-primary mt-margembutton"  type="button">
            <span className="ms-2">Novo</span>
          </button>
        </div>

        <div className="col-8">
          <div className="input-group mb-3">

          {/*TipoPesso*/}
            <select className="form-control mt-margembutton mt-margembutton_30" onChange={(e)=>setFlgTipoPessoa(e.target.value)} onClick={Pesquisar} value={flg_tipo_pessoa} name="flg_tipo_pessoa" id="flg_tipo_pessoa">
              <option value="T">Todos         </option>
              <option value="P">Residentes    </option>
              <option value="C">Colaboradores </option>
              <option value="F">Fornecedores  </option>
              <option value="N">Familiar      </option>
            </select>

            <input type="text" className="form-control mt-margembutton" placeholder="Nome"aria-label="Recipient's username" aria-describedby="button-addon2" autoFocus/>
            <button onClick={Pesquisar} className="btn btn-outline-primary mt-margembutton" type="button" id="button-addon2">Pesquisar</button>
          </div>
        </div>
      </div>
        
      <ListaPessoa pessoa={pessoa} clickExcluir={Excluir}/>
      </div>
    :null}
  </>
}

export default Pessoa;