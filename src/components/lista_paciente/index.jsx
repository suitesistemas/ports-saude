import React, {useState, useEffect, useInsertionEffect} from 'react';
import './style.css';

import Axios from "axios";

function ListaPaciente(){  
  
  const [paciente, setPaciente] = useState();

  useEffect(() => {
  Axios.get("http://localhost:3001/paciente/listar").then((response) =>{
    setPaciente(response.data);
  })
  }, []);

  return <table className="table table-striped table-bordered">
    <thead>    
    {/*Cabecalho*/}    
      <tr className="table-secondary">
        <th scope="col">Código</th>
        <th scope="col">Referência</th>
        <th scope="col">Nome</th>
        <th scope="col">Apelido</th>
        <th scope="col">Cpf/Cnpj</th>
        <th scope="col">Celular</th>
      </tr>
    </thead>    
  
    <tbody>
  {/*Itens*/}
    {typeof paciente !== 'undefined' &&
            paciente.map(function (paciente){
      return <tr key={paciente.cod_pessoa}>
             <th scope="row">{paciente.cod_pessoa}</th>
             <td>{paciente.dsc_referencia}</td>
             <td>{paciente.dsc_nome_pessoa}</td>
             <td>{paciente.dsc_nome_fantasia}</td>
             <td>{paciente.dsc_cpf_cnpj}</td>
             <td>{paciente.dsc_ddd_celular_01} {paciente.dsc_celular_01}</td>
      </tr>
    })}

    </tbody>
    
  </table>
}

export default ListaPaciente;