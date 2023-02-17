import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

var lDscTipo      = '';
var lDscPrincipal = '';

function ListaContato(props){
  return <table className="table table-striped table-bordered">
    <thead>    
    {/*Cabecalho*/}    
      <tr className="table-secondary">        
        <th scope="col" className='coluna_grid_80' >Tipo       </th>        
        <th scope="col">Nome                                   </th>
        <th scope="col" className='coluna_grid_200'>Fone      </th>
        <th scope="col" className='coluna_grid_200'>Celular   </th>
        <th scope="col" className='coluna_grid_200'>Principal  </th>
        <th scope="col" className='coluna_grid_80'>            </th>
      </tr>
    </thead>    
  
    <tbody>
    {/*Itens*/}
      {typeof props.contato !== 'undefined' &&
              props.contato.map(function (contato){
                
      //Tipo contato
        if        (contato.flg_tipo_contato === 'P'){
            lDscTipo = 'Parente';
        } else if (contato.flg_tipo_contato === 'C'){
            lDscTipo = 'Conjugue';
        } else if (contato.flg_tipo_contato === 'A'){
            lDscTipo = 'Amigo';
        } else if (contato.flg_tipo_contato === 'V'){
            lDscTipo = 'Vizinho';
        } else if (contato.flg_tipo_contato === 'R'){
            lDscTipo = 'Curador';
        };

      //Principal
      if        (contato.flg_contato_principal === 'S'){
        lDscPrincipal = 'Sim';
      } else if (contato.flg_contato_principal === 'N'){
        lDscPrincipal = 'Não';
      }
        
        return <tr key={contato.fky_contato}>
                <th scope="row">{lDscTipo}                                     </th>                
                <td>{contato.dsc_nome_contato}                                 </td>
                <td>{contato.dsc_ddd_01         + ' ' + contato.dsc_fone_01}   </td>
                <td>{contato.dsc_ddd_celular_01 + ' ' + contato.dsc_celular_01}</td>
                <td>{lDscPrincipal}                                            </td>
                <td>
                <Link to={'/contato/editar/' + contato.fky_pessoa}><i className='icone_acao'>Editar</i></Link>   
                <Link to='#' onClick={() => props.clickExcluirContato(contato.fky_contato)}><i className='icone_acao icone_acao_vermelho'>Excluir</i></Link>
                </td>
        </tr>
      })}
          
    </tbody>    
  </table>
}

export default ListaContato;