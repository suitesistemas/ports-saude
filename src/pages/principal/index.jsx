import Menu from "../../components/menu/index.jsx";

function Principal(){
  const colaborador = [{id_colaborador: 1, dsc_nome: 'Colaborador 001', dsc_apelido: 'Apelido 001', dsc_cpf: '000.000.000-00', dsc_fone: '9 9000-0000'}, 
                       {id_colaborador: 2, dsc_nome: 'Colaborador 002', dsc_apelido: 'Apelido 002', dsc_cpf: '111.111.111-11', dsc_fone: '9 9111-1111'}, 
                       {id_colaborador: 3, dsc_nome: 'Colaborador 003', dsc_apelido: 'Apelido 003', dsc_cpf: '222.222.222-22', dsc_fone: '9 9222-2222'}];
  return <>
    <Menu/>
    
    <div className="container-fluid mt-page justify-content-between">
      <div className="m-2 mt-4">
        <h3>Dashboard</h3>            
      </div>

      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              Colaboradores cadastrados
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
              Pacientes cadastrados
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
            typeof colaborador !== 'undefined' &&
                   colaborador.map(function (colaborador){
              return <tr key={colaborador.id_colaborador}>
                <th scope="row">{colaborador.id_colaborador}</th>
                <td>{colaborador.dsc_nome}</td>
                <td>{colaborador.dsc_apelido}</td>
                <td>{colaborador.dsc_cpf}</td>
                <td>{colaborador.dsc_fone}</td>
              </tr>
            })
          }
          </tbody>
        </table>
      </div>

    {/*Rodape*/}
    <div>
        <br/ >
        <small className="d-flex justify-content-center align-items-center text-secondary"> &copy; Desenvolvido por Suíte Sistemas</small>
      </div>
    </div>
  </>
}

export default Principal;