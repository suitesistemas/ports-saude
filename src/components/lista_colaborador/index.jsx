import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

function ListaColaborador(props){
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
    {typeof props.colaborador !== 'undefined' &&
            props.colaborador.map(function (colaborador){      
      return <tr key={colaborador.cod_pessoa}>
             <th scope="row">{colaborador.cod_pessoa}</th>
             <td>{colaborador.dsc_referencia}</td>
             <td>{colaborador.dsc_nome_pessoa}</td>
             <td>{colaborador.dsc_nome_fantasia}</td>
             <td>{colaborador.dsc_cpf_cnpj}</td>
             <td>{colaborador.dsc_ddd_celular_01} {colaborador.dsc_celular_01}</td>
             <td>
               <Link to={'/colaborador/editar/' + colaborador.cod_pessoa}><i className='icone_acao'>Editar</i></Link>   
               <Link to='#' onClick={() => props.clickExcluir(colaborador.cod_pessoa)}><i className='icone_acao icone_acao_vermelho'>Excluir</i></Link>
             </td>
      </tr>
    })}

    </tbody>
    
  </table>
}

export default ListaColaborador;