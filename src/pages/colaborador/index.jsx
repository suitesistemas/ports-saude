import Menu                         from "../../components/menu/index.jsx";
import ListaColaborador             from '../../components/lista_colaborador/index';
import React, {useState, useEffect} from 'react';
import {useNavigate}                from 'react-router-dom';
import Axios                        from "axios";

//const apiUrl = process.env.REACT_APP_API_URL; /*variavel de ambiente, tem que iniciar com REAC_APP_ e restante eh de livre digitacao*/
const apiUrl = "https://15.229.119.177:3001";
//const apiUrl = "http://localhost:3002";

function Colaborador(){
  const [colaborador, setColaborador] = useState();
  const [filtro,      setFiltro]      = useState();
  const [busca,       setBusca]       = useState();
  const [excluido,    setExcluido]    = useState();  

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(apiUrl + "/colaborador/listar")
    .then((response) =>{
      setColaborador(response.data);
    })
  }, []);

  useEffect(() => {
    Axios.get(apiUrl + "/colaborador/listar")
    .then((response) =>{
      setColaborador(response.data);
    })
  }, [excluido, busca]);

  function Novo(){
    navigate('/colaborador/inserir');
  };

  async function Excluindo(cod_pessoa){
    let resultado = await Axios.delete(apiUrl + "/pessoa/excluir/" + cod_pessoa);
    return resultado;
  };

  function Excluir(cod_pessoa){
    let codigo = cod_pessoa;    
    Excluindo(cod_pessoa).then((response) =>{
      setExcluido(codigo);
    });    
  };

  function Pesquisar(){    
      Axios.get(apiUrl + "/colaborador/listar")
      .then((response) =>{
        setBusca(filtro);
    })
  };

  return <> 
    <Menu/>

    <div className="container-fluid titulo justify-content-between mt-page">
      <h3 className = "text-center">Colaboradores</h3>

      <div className="row">
        <div className="col-4">
        {/*Btn Novo*/}
          <button onClick={Novo} className="btn btn-primary mt-margembutton"  type="button">
            <span className="ms-2">Novo</span>
          </button>
        </div>

        <div className="col-8">
          <div className="input-group mb-3">
            <input onChange={(e) => setFiltro(e.target.value)} type="text" className="form-control mt-margembutton" placeholder="Nome" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <button onClick={Pesquisar} className="btn btn-outline-primary mt-margembutton" type="button" id="button-addon2">Pesquisar</button>
          </div>
        </div>
      </div>
        
      <ListaColaborador colaborador={colaborador} clickExcluir={Excluir}/>
    </div>  
  </>
}

export default Colaborador;