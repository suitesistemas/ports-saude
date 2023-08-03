import React  from 'react';
import {Link} from 'react-router-dom';
import './style.css';

function ListaAnamnese(props){
  return <table className="table table-striped table-bordered">
    <thead>    
    {/*Cabecalho*/}    
      <tr className="table-secondary">                
        <th scope="col">Descrição                   </th>        
        <th scope="col" className='coluna_grid_40'> </th>
      </tr>
    </thead>    
  
    <tbody>
    {/*Itens*/}
      {typeof props.registro !== 'undefined' &&
              props.registro.map(function (registro){
                 
        return <tr key={registro.cod_registro}>
                <td scope="row">{registro.dsc_registro} </td>                
                <td>
                <Link to='#' onClick={() => props.clickImprimirRegistro(registro.dsc_registro)}><i className='icone_acao fa-regular fa-file-pdf'></i></Link>                
                </td>
        </tr>
      })}
          
    </tbody>    
  </table>
}

export default ListaAnamnese;