import Menu                         from "../../components/menu/index.jsx";
import ListaPaciente                from '../../components/lista_paciente/index';
import React, {useState, useEffect} from 'react';
import {useNavigate}                from 'react-router-dom';
import Axios                        from "axios";
import SweetAlert                   from "react-bootstrap-sweetalert";

function Paciente(){
  const [paciente, setPaciente]      = useState();  
  const [busca, setBusca]             = useState();
  const [excluido, setExcluido]       = useState();
  const [confirmado, setConfirmado]   = useState(false);
  const [regexcluido, setRegExcluido] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/paciente/listar")
    .then((response) =>{
      setPaciente(response.data);
    })
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/paciente/listar")
    .then((response) =>{
      setPaciente(response.data);
    })
  }, [excluido]);

  function Novo(){
    navigate('/paciente/inserir');
  }

  function Excluindo(cod_pessoa){
    setRegExcluido(cod_pessoa);
    setConfirmado(true);
  }

  function Excluir(cod_pessoa){
    Axios.delete("http://localhost:3001/paciente/excluir/" + cod_pessoa)

    setConfirmado(false);
    setExcluido(cod_pessoa);    
  };

  function Pesquisar(){    
      Axios.get('http://localhost:3001/paciente/listar')
      .then((response) =>{
        setPaciente(response.data);
    })
  }

  return <> 
    <Menu/>

    <div className="container-fluid titulo justify-content-between mt-page">
      <h3>Pacientes</h3>

      <div className="row">
        <div className="col-4">
        {/*Btn Novo*/}
          <button onClick={Novo} className="btn btn-primary mt-margembutton"  type="button">
            <span className="ms-2">Novo</span>
          </button>
        </div>

        <div className="col-8">
          <div className="input-group mb-3">
            <input onChange={(e) => setBusca(e.target.value)} type="text" className="form-control mt-margembutton" placeholder="Nome" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <button onClick={Pesquisar} className="btn btn-outline-primary mt-margembutton" type="button" id="button-addon2">Pesquisar</button>
          </div>
        </div>
      </div>
        
      <ListaPaciente Pacientees={paciente} clickExcluir={Excluindo}/>

      {
        confirmado ?
          <SweetAlert
            warning
            showCancel
            showCloseButton
              
            confirmBtnText    = "Sim"
            confirmBtnBsStyle = "danger"
              
            cancelBtnText    = "Não"
            cancelBtnBsStyle = "light"

            title = "Exclusão!"

            onConfirm= {() => Excluir(regexcluido)}
            onCancel = {() => setConfirmado(false)}
              
            focusCancelBtn
            reverseButtons = {true}
            > Deseja excluir o registro? 
          </SweetAlert> : null
      }

      {/*{Pesquisar()};*/}
    </div>  
  </>
}

export default Paciente;