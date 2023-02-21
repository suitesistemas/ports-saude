import Menu                            from '../../components/menu/index.jsx';
import React, { useState, useContext } from 'react';
import { useNavigate }                 from 'react-router-dom';
import Axios                           from "axios";
import { AuthContext }                 from "../../context/auth.jsx";

//const apiUrl = "http://localhost:5000";
const apiUrl = "https://portsonline.com.br";

function Pessoa_Ins(){  
  const [referencia,        setReferencia]      = useState('');
  const [nomepessoa,        setNomePessoa]      = useState('');
  const [nomefantasia,      setNomeFantasia]    = useState('');
  const [cpfcnpj,           setCpfCnpj]         = useState('');
  const [rginscestadual,    setRgInscEstadual]  = useState('');
  const [ddd01,             setDdd01]           = useState('37');
  const [fone01,            setFone01]          = useState('');
  const [dddcelular01,      setDddCelular01]    = useState('37');
  const [celular01,         setCelular01]       = useState('');  
  const [cep,               setCep]             = useState('');
  const [bairro,            setBairro]          = useState('');
  const [cidade,            setCidade]          = useState('');
  const [logradouro,        setLogradouro]      = useState('');
  const [numlogradouro,     setNumLogradouro]   = useState('');
  const [datcadastro,       setDatCadastro]     = useState('');
  const [datnascimento,     setDatNascimento]   = useState('');
  const [flg_tipo_pessoa,   setFlgTipoPessoa]   = useState('F');  //Pessoa Física 
  const [flg_tipo_cadastro, setFlgTipoCadastro] = useState('P');  //Paciente
  const [flg_usuario,       setFlgUsuario]      = useState('N');  //Não
  const [flgsexo,           setFlgSexo]         = useState('M');  //Masculino
  const [flguf,             setFlgUf]           = useState('MG'); //Minas Gerais  

  const [lblcpfcnpj, setLblCpfCnpj] = useState('CPF:');
  const [lblrgie,    setLblRgIe]    = useState('RG:');
  
  const [confirmado, setConfirmado] = useState(false);

  const navigate = useNavigate();

  const {logado} = useContext(AuthContext);
  console.log(logado);
  
  function fun_mascaraCpfCnpj(lValor){
    var lResultado = '';
    
    if (flg_tipo_pessoa === "F"){
      lResultado = lValor.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")            //*CPF  
    } else{
      lResultado = lValor.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"); //CNPJ
    }

    return  lResultado;
  }

  function fun_formatafone(lValor, lTipo){
    var lResultado = '';    
        
  
    if (lTipo === 1){
            lResultado = lValor.replace(/^(\d{4})(\d{4})/,        "$1-$2")     //1 = Fone Fixo
    } else{ lResultado = lValor.replace(/^(\d{1})(\d{4})(\d{4})/, "$1 $2-$3"); //2 = Celular
  }

    return  lResultado;
  }

//Tipo Pessoa (Física ou Juríca)  
  function fun_tipopessoa(lValor){
    setFlgTipoPessoa(lValor);
    console.log('tipo:' + {flg_tipo_pessoa});

    if (lValor === "F"){
      setLblCpfCnpj('CPF:');
      setLblRgIe('RG:');
    } else{
      setLblCpfCnpj('CNPJ:');
      setLblRgIe('IE:');
    }

    return lValor;
  }

//Dados Pessoa - Inserindo um registro
  const Cadastrar = async e =>{
    Axios.post(apiUrl + "/pessoa/inserir",
    {
      dsc_referencia:       referencia,
      dsc_nome_pessoa:      nomepessoa,
      dsc_nome_fantasia:    nomefantasia,
      dsc_cpf_cnpj:         cpfcnpj,
      dsc_rg_insc_estadual: rginscestadual,
      dsc_ddd_01:           ddd01,
      dsc_fone_01:          fone01,
      dsc_ddd_celular_01:   dddcelular01,
      dsc_celular_01:       celular01,
      dsc_cep:              cep,
      dsc_bairro:           bairro,
      dsc_cidade:           cidade,
      dsc_cidade_natal:     '', //sendo preenchida no editar pessoa
      dsc_logradouro:       logradouro,
      dat_cadastro:         datcadastro,
      dat_nascimento:       datnascimento,
      flg_tipo_pessoa:      flg_tipo_pessoa,
      flg_tipo_cadastro:    flg_tipo_cadastro,    
      flg_usuario:          flg_usuario,      
      flg_sexo:             flgsexo,
      flg_uf:               flguf,
      num_logradouro:       numlogradouro      
    })
    
    .then((response)=>{      
    });

    setConfirmado(true);    
  }

  function Cancelar(){
    setConfirmado(true);
  }

  return <div>
    {logado?    
      <Menu/>
    :null}

    {logado?    
      <div className="container-fluid mt-page">
      <form>
        <div >
          <h3 className = "text-center">Cadastro de Pessoa - Inserindo...</h3>
        </div>        
      
      {/*Tipo, Referencia, Data Cadastro, Data Nascimento, Idade*/} 
        <div className="input-group mt-margem">
          {/*Tipo (Paciente, Colaborador, etc)*/}
            <label htmlFor="flg_tipo_cadastro" className="mt-margem">Tipo:</label>
            <select className="form-control mt-margem-input-ref" onChange={(e)=>setFlgTipoCadastro(e.target.value)} value={flg_tipo_cadastro} name="flg_tipo_cadastro" id="flg_tipo_cadastro" autoFocus>
              <option value="P">Paciente   </option>
              <option value="C">Colaborador</option>
              <option value="F">Fornecedor </option>
              <option value="N">Contato    </option>
            </select>
          {/*Referencia*/}  
            <label htmlFor="dsc_referencia" className="mt-margem">Referência:</label>
            <input onChange={(e)=>setReferencia(e.target.value)} type="text" name="dsc_referencia" id="dsc_referencia" className="form-control mt-margem-input-ref"/>
          {/*Data Cadastro*/}  
            <label htmlFor="dat_cadasro" className="mt-margem">Cadastro:</label>
            <input onChange={(e)=>setDatCadastro(e.target.value)} type="date" name="dat_cadastro" id="dat_cadastro" className="form-control"/>
          {/*Data Nascimento*/}
            <label htmlFor="dat_nascimento" className="mt-margem">Nascimento:</label>
            <input onChange={(e)=>setDatNascimento(e.target.value)} type="date" name="dat_nascimento" id="dat_nascimento" className="form-control"/>
        </div>
        
      {/*Pessoa, Cpf Cnpj, Rg Insc Estadual, Sexo*/}  
        <div className="input-group mt-margem">
        {/*Pessoa (Cpf Cnpj*/}
          <label htmlFor="flg_tipo_pessoa" className="mt-margem">Pessoa:</label>
          <select className="form-control mt-margem-input-ref" onChange={(e)=>fun_tipopessoa(e.target.value)} value={flg_tipo_pessoa} name="flg_tipo_pessoa" id="flg_tipo_pessoa">
            <option value="F">Física  </option>
            <option value="J">Jurídica</option>
          </select>
        {/*Cpf Cnpj */}
          <label htmlFor="dsc_cpf_cnpj" className="mt-margem">{lblcpfcnpj}</label>
          <input onChange={(e)=>setCpfCnpj(fun_mascaraCpfCnpj(e.target.value))} value={cpfcnpj} type="text" name="dsc_cpf_cnpj" id="dsc_cpf_cnpj" className="form-control"/> 
        {/*Rg Insc Estadual */}          
          <label htmlFor="dsc_rg_insc_estadual"  className="mt-margem">{lblrgie}</label>
          <input onChange={(e)=>setRgInscEstadual(e.target.value)} type="text" name="dsc_rg_insc_estadual" id="dsc_rg_insc_estadual" className="form-control"/>
        {/*Sexo*/}
          <label htmlFor="flg_sexo" className="mt-margem">Sexo:</label>
          <select className="form-control mt-margem-input-ref" onChange={(e)=>setFlgSexo(e.target.value)} value={flgsexo} name="flg_sexo" id="flg_sexo">
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>
      
      {/*Nome Pessoa, Nome Fantasia*/}  
        <div className="input-group mt-margem">
        {/*Nome Pessoa*/}
          <label htmlFor="dsc_nome_pessoa" className="mt-margem">Nome Pessoa:</label>
          <input onChange={(e)=>setNomePessoa(e.target.value)} type="text" name="dsc_nome_pessoa" id="dsc_nome_pessoa" className='form-control'/> 
        {/*Nome Fangasia*/}  
          <label htmlFor="dsc_nome_fantasia" className="mt-margem">Nome Fantasia:</label>
          <input onChange={(e)=>setNomeFantasia(e.target.value)} type="text" name="dsc_nome_fantasia" id="dsc_nome_fantasia" className="form-control"/>
        </div>
      
      {/*DDD 01, Fone 01, DDD Celular 01, Celular 01, Cep*/}  
        <div className="input-group mt-margem">
        {/*DDD 01*/}  
          <label htmlFor="dsc_ddd_01" className="mt-margem">DDD:</label>            
          <input onChange={(e)=>setDdd01(e.target.value)} type="text" name='dsc_ddd_01' id='dsc_ddd_01' className="form-control mt-margem-input-seq" value="37"/>
        {/*FONE 01*/}
          <label htmlFor="dsc_fone_01" className="mt-margem">Fone:</label>
          <input onChange={(e)=>setFone01(fun_formatafone(e.target.value, 1))} type="tel" name="dsc_fone_01" id="dsc_fone_01" className="form-control"/>
        {/*DDD Celular 01*/}          
          <label htmlFor="dsc_ddd_celular_01" className="mt-margem">DDD:</label>
          <input onChange={(e)=>setDddCelular01(e.target.value)} type="text" name="dsc_ddd_celular_01" id="dsc_ddd_celular_01" className="form-control mt-margem-input-seq" value="37"/> 
        {/*Celular 01*/}
          <label htmlFor="dsc_celular_01" className="mt-margem">Celular:</label>
          <input onChange={(e)=>setCelular01(fun_formatafone(e.target.value, 2))} type="tel" name="dsc_celular_01" id="dsc_celular_01" className="form-control"/>
        {/*Cep*/}
          <label htmlFor="dsc_cep" className="mt-margem">Cep:</label>
          <input onChange={(e)=>setCep(e.target.value)} type="text" name="dsc_cep" id="dsc_cep" className="form-control"/>
        </div>

      {/*UF, Cidade, Bairro*/}  
        <div className="input-group mt-margem">
        {/*UF*/}
          <label htmlFor="flg_uf" className="mt-margem">UF:</label>
          <select className="form-control mt-margem mt-margem-input-seq" onChange={(e)=>setFlgUf(e.target.value)} name="flg_uf" id="flg_uf">
            <option value="MG">MG</option>
            <option value="AC">AC</option>
            <option value="AL">AL</option>
            <option value="AM">AM</option>
            <option value="AP">AP</option>
            <option value="BA">BA</option>
            <option value="CE">CE</option>
            <option value="DF">DF</option>
            <option value="ES">ES</option>
            <option value="GO">GO</option>
            <option value="MA">MA</option>
            <option value="MG">MG</option>
            <option value="MS">MS</option>
            <option value="MT">MT</option>
            <option value="PA">PA</option>
            <option value="PB">PB</option>
            <option value="PE">PE</option>
            <option value="PI">PI</option>
            <option value="PR">PR</option>
            <option value="RJ">RJ</option>
            <option value="RN">RN</option>
            <option value="RS">RS</option>
            <option value="RO">RO</option>
            <option value="RR">RR</option>
            <option value="SC">SC</option>
            <option value="SE">SE</option>
            <option value="SP">SP</option>
            <option value="TO">TO</option>
          </select>
        {/*Cidade*/}
          <label htmlFor="dsc_cidade" className="mt-margem">Cidade:</label>
          <input onChange={(e)=>setCidade(e.target.value)} type="text" name="dsc_cidade" id="dsc_cidade" className="form-control"/>
        {/*Bairro*/}         
          <label htmlFor="dsc_bairro" className="mt-margem">Bairro:</label>
          <input onChange={(e)=>setBairro(e.target.value)} type="text" name="dsc_bairro" id="dsc_bairro" className="form-control"/>
        </div>

      {/*Logradouro, Numero*/}  
        <div className="input-group mt-margem">
        {/*Logradouro*/}           
          <label htmlFor="dsc_logradouro" className="mt-margem">Lodradouro:</label>
          <input onChange={(e)=>setLogradouro(e.target.value)} type="text" name="dsc_logradouro" id="dsc_logradouro" className="form-control"/>          
        {/*Numero*/}  
          <label htmlFor="num_logradouro" className="mt-margem">nº:</label>
          <input onChange={(e)=>setNumLogradouro(e.target.value)} type="text" name="num_logradouro" id="num_logradouro" className="form-control mt-margem-input-seq"/> 
        </div>      
      </form>

    {/*Rodape*/}  
      <footer>        
        <div>
        {/*Btn Cancelar e Btn Confirmar*/}
          <div className="text-center mt-margem">          
            <button type='button' onClick={Cancelar}  className="btn btn-primary btn-acao">Cancelar </button>
            <button type='button' onClick={Cadastrar} className="btn btn-primary btn-acao">Confirmar</button>            
          </div>
                         
          <small className="d-flex justify-content-center align-items-center text-secondary"> &copy; Desenvolvido por Suíte Sistemas</small>
        </div>
      </footer>

      {
      confirmado ?
        navigate('/pessoa') : null
      }      
      </div>
    :null}

  </div>
}

export default Pessoa_Ins;