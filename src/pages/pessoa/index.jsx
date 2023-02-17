import Menu                         from "../../components/menu/index.jsx";
import ListaPessoa                  from '../../components/lista_pessoa/index';
import React, {useState, useEffect} from 'react';
import {useNavigate}                from 'react-router-dom';
import Axios                        from "axios";

//const apiUrl = process.env.REACT_APP_API_URL; /*variavel de ambiente, tem que iniciar com REAC_APP_ e restante eh de livre digitacao*/
//const apiUrl = "https://15.229.119.177:3001";
const apiUrl = "http://localhost:3002";

function Pessoa(){
  const [pessoa,          setPessoa]        = useState();  
  const [excluido,        setExcluido]      = useState();
  const [flg_tipo_pessoa, setFlgTipoPessoa] = useState('T'); //Todos 

  const navigate = useNavigate();

//Inicio - lista todos  
  useEffect(() => {
    Axios.get(apiUrl + "/pessoa/listar")
    .then((response) =>{
      setPessoa(response.data);
    })
  }, []);

  useEffect(() => {
    Axios.get(apiUrl + "/pessoa/listar")
    .then((response) =>{
      setPessoa(response.data);
    })
  }, [excluido]);

  function Novo(){
    navigate('/pessoa/inserir');
  };

  async function Excluindo(cod_pessoa){
    return await Axios.delete(apiUrl + "/pessoa/excluir/" + cod_pessoa);
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
      Axios.get(apiUrl + "/pessoa/listar")
      .then((response) =>{
        setPessoa(response.data);
      });
    }

  // Pacientes
    else if (flg_tipo_pessoa === 'P'){
      Axios.get(apiUrl + "/Paciente/listar")
      .then((response) =>{
        setPessoa(response.data);    
      });
    }
    
  //Colaboradores  
    else if (flg_tipo_pessoa === 'C'){
      Axios.get(apiUrl + "/colaborador/listar")
      .then((response) =>{
        setPessoa(response.data);    
      });
    }

  //Fornecedores  
    else if (flg_tipo_pessoa === 'F'){
      Axios.get(apiUrl + "/fornecedor/listar")
      .then((response) =>{
        setPessoa(response.data);    
      });
    }
    
  //Contatos  
    else if (flg_tipo_pessoa === 'N'){
      Axios.get(apiUrl + "/contato/listar")
      .then((response) =>{
        setPessoa(response.data);    
      });
    };
  };

  return <> 
    <Menu/>

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
              <option value="P">Pacientes     </option>
              <option value="C">Colaboradores </option>
              <option value="F">Fornecedores  </option>
              <option value="N">Contatos      </option>
            </select>

            <input type="text" className="form-control mt-margembutton" placeholder="Nome"aria-label="Recipient's username" aria-describedby="button-addon2" autoFocus/>
            <button onClick={Pesquisar} className="btn btn-outline-primary mt-margembutton" type="button" id="button-addon2">Pesquisar</button>
          </div>
        </div>
      </div>
        
      <ListaPessoa pessoa={pessoa} clickExcluir={Excluir}/>
    </div>  
  </>
}

export default Pessoa;