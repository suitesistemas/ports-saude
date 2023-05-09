import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

var lDscTipo = 'Paciente'; 

function ListaPessoa(props){
  return <table className="table table-striped table-bordered">
    <thead>    
    {/*Cabecalho*/}    
      <tr className="table-secondary">
        <th scope="col" className='coluna_grid_80' >Código     </th>
        <th scope="col" className='coluna_grid_80' >Tipo       </th>
        <th scope="col" className='coluna_grid_80' >Referência </th>
        <th scope="col">Nome                                   </th>
        <th scope="col" className='coluna_grid_200'>Apelido    </th>
        <th scope="col" className='coluna_grid_200'>Cpf/Cnpj   </th>
        <th scope="col" className='coluna_grid_150'>Celular    </th>
        <th scope="col" className='coluna_grid_80'>            </th>
      </tr>
    </thead>    
  
    <tbody>
  {/*Itens*/}
    {typeof props.pessoa !== 'undefined' &&
            props.pessoa.map(function (pessoa){
    // Pacientes
      if      (pessoa.flg_tipo_cadastro === 'P'){
        lDscTipo = 'Residentes';
      }
      
    //Colaboradores  
      else if (pessoa.flg_tipo_cadastro === 'C'){
        lDscTipo = 'Colaborador';
      }

    //Fornecedores  
      else if (pessoa.flg_tipo_cadastro === 'F'){
        lDscTipo = 'Fornecedor';
      }
      
    //Contatos  
      else if (pessoa.flg_tipo_cadastro === 'N'){
        lDscTipo = 'Familiar';
      };
      
      return <tr key={pessoa.cod_pessoa}>
             <th scope="row">{pessoa.cod_pessoa}</th>
             <td>{lDscTipo}</td>
             <td>{pessoa.dsc_referencia}</td>
             <td>{pessoa.dsc_nome_pessoa}</td>
             <td>{pessoa.dsc_nome_fantasia}</td>
             <td>{pessoa.dsc_cpf_cnpj}</td>
             <td>{pessoa.dsc_ddd_celular_01} {pessoa.dsc_celular_01}</td>
             <td>
               <Link to={'/pessoa/editar/' + pessoa.cod_pessoa}><i className='icone_acao'>Editar</i></Link>   
               <Link to='#' onClick={() => props.clickExcluir(pessoa.cod_pessoa)}><i className='icone_acao icone_acao_vermelho'>Excluir</i></Link>
             </td>
      </tr>
    })}

    </tbody>
    
  </table>
}

export default ListaPessoa;