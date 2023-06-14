import Menu from "../../components/menu/index.jsx";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.jsx";

function Principal(){
  const pessoa = [{id_pessoa: 1, dsc_nome: 'Pessoa 001', dsc_apelido: 'Apelido 001', dsc_cpf: '000.000.000-00', dsc_fone: '9 9000-0000'}, 
                  {id_pessoa: 2, dsc_nome: 'Pessoa 002', dsc_apelido: 'Apelido 002', dsc_cpf: '111.111.111-11', dsc_fone: '9 9111-1111'}, 
                  {id_pessoa: 3, dsc_nome: 'Pessoa 003', dsc_apelido: 'Apelido 003', dsc_cpf: '222.222.222-22', dsc_fone: '9 9222-2222'}];
  
  const {logado} = useContext(AuthContext);
  
  return <>
    {logado?
      <Menu/>
    :null}

    {logado?
      <div className="container-fluid mt-page justify-content-between">
      <div className="m-2 mt-4">
        <h3>Dashboard</h3>            
      </div>

      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              Pessoas cadastradas
            </div>
            <div className="card-body text-center">
              <h2 className="card-title">9</h2>
              <p className="card-text">(Todos)</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              Residentes cadastrados
            </div>
            <div className="card-body text-center">
              <h2 className="card-title">131</h2>
              <p className="card-text">(Todos)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="m-2 mt-5">
        <h2>Últimos cadastrados</h2>            
      </div>

      <div className="row ms-3 me-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Nome</th>
              <th scope="col">Apelido</th>
              <th scope="col">Cpf</th>
              <th scope="col">Fone</th>
            </tr>
          </thead>
          
          <tbody>
          {
            typeof pessoa !== 'undefined' &&
                   pessoa.map(function (pessoa){
              return <tr key={pessoa.id_pessoa}>
                <th scope="row">{pessoa.id_pessoa}</th>
                <td>{pessoa.dsc_nome}</td>
                <td>{pessoa.dsc_apelido}</td>
                <td>{pessoa.dsc_cpf}</td>
                <td>{pessoa.dsc_fone}</td>
              </tr>
            })
          }
          </tbody>
        </table>
      </div>

    {/*Rodape*/}
      <div>
        <br/ >
        <small className="d-flex justify-content-center align-items-center text-secondary"> &copy; Desenvolvido por Suíte Sistemas - Versão 1.001</small>
      </div>
      </div>
    :null}
  </>
}

export default Principal;