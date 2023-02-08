import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

function ListaPaciente(props){
  return <table className="table table-striped table-bordered">
    <thead>    
    {/*Cabecalho*/}    
      <tr className="table-secondary">
        <th scope="col" className='coluna_grid_80' >Código</th>
        <th scope="col" className='coluna_grid_80' >Referência</th>
        <th scope="col">Nome</th>
        <th scope="col" className='coluna_grid_200'>Apelido</th>
        <th scope="col" className='coluna_grid_150'>Cpf/Cnpj</th>
        <th scope="col" className='coluna_grid_150'>Celular</th>
        <th scope="col" className='coluna_grid_80'></th>
      </tr>
    </thead>    
  
    <tbody>
  {/*Itens*/}
    {typeof props.paciente !== 'undefined' &&
            props.paciente.map(function (paciente){      
      return <tr key={paciente.cod_pessoa}>
             <th scope="row">{paciente.cod_pessoa}</th>
             <td>{paciente.dsc_referencia}</td>
             <td>{paciente.dsc_nome_pessoa}</td>
             <td>{paciente.dsc_nome_fantasia}</td>
             <td>{paciente.dsc_cpf_cnpj}</td>
             <td>{paciente.dsc_ddd_celular_01} {paciente.dsc_celular_01}</td>
             <td>
               <Link to={'/paciente/editar/' + paciente.cod_pessoa}><i className='icone_acao'>Editar</i></Link>   
               <Link to='#' onClick={() => props.clickExcluir(paciente.cod_pessoa)}><i className='icone_acao icone_acao_vermelho'>Excluir</i></Link>
             </td>
      </tr>
    })}

    </tbody>
    
  </table>
}

export default ListaPaciente;