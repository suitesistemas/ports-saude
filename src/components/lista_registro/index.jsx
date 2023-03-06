import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

function ListaCadastro(props){
  return <table className="table table-striped table-bordered">
    <thead>    
    {/*Cabecalho*/}    
      <tr className="table-secondary">                
        <th scope="col">Descrição                   </th>        
        <th scope="col" className='coluna_grid_80'> </th>
      </tr>
    </thead>    
  
    <tbody>
    {/*Itens*/}
      {typeof props.registro !== 'undefined' &&
              props.registro.map(function (registro){
                 
        return <tr key={registro.cod_registro}>
                <td scope="row">{registro.dsc_registro} </td>                
                <td>
                <Link to={'/registro/editar/' + registro.cod_registro}><i className='icone_acao'>Editar</i></Link>   
                <Link to='#' onClick={() => props.clickExcluirRegistro(registro.cod_registro)}><i className='icone_acao icone_acao_vermelho'>Excluir</i></Link>
                </td>
        </tr>
      })}
          
    </tbody>    
  </table>
}

export default ListaCadastro;