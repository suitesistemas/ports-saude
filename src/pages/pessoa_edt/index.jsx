import Menu                         from '../../components/menu/index.jsx';
import React, {useState, useEffect} from 'react';
import {useNavigate, useParams}     from 'react-router-dom';
import './style.css';
import Axios                        from "axios";
import ListaContato                 from '../../components/lista_contato/index.jsx';

//const apiUrl = process.env.REACT_APP_API_URL; /*variavel de ambiente, tem que iniciar com REAC_APP_ e restante eh de livre digitacao*/
//const apiUrl = "https://15.229.119.177:3001";
//const apiUrl = "http://localhost:3002";
const apiUrl = "https://portsonline.com.br";

function Pessoa_Edt(){
  const[referencia,        setReferencia]       = useState('');
  const[nomepessoa,        setNomePessoa]       = useState('');
  const[nomefantasia,      setNomeFantasia]     = useState('');  
  const[cpfcnpj,           setCpfCnpj]          = useState('');
  const[rginscestadual,    setRgInscEstadual]   = useState('');  
  const[ddd01,             setDdd01]            = useState('37');
  const[fone01,            setFone01]           = useState('');
  const[dddcelular01,      setDddCelular01]     = useState('37');
  const[celular01,         setCelular01]        = useState('');  
  const[cep,               setCep]              = useState('');
  const[bairro,            setBairro]           = useState('');
  const[cidade,            setCidade]           = useState('');
  const[logradouro,        setLogradouro]       = useState('');
  const[numlogradouro,     setNumLogradouro]    = useState(''); 
  const[datcadastro,       setDatCadastro]      = useState('');
  const[datnascimento,     setDatNascimento]    = useState('');
  const[flg_tipo_pessoa,   setFlgTipoPessoa]    = useState('');
  const[flg_tipo_cadastro, setFlgTipoCadastro]  = useState();
  const[flg_usuario,       setFlgUsuario]       = useState('N');
  const[flgsexo,           setFlgSexo]          = useState(''); 
  const[flguf,             setFlgUf]            = useState('');
  const[dsc_cidade_natal,  setDscCidadeNatal]   = useState();

  const[lblcpfcnpj, setLblCpfCnpj] = useState('CPF:');
  const[lblrgie,    setLblRgIe]    = useState('RG:');

  const [confirmado, setConfirmado] = useState(false);
  
//Variaveis do contato  
  const[contato,               setContato]             = useState();
  const[fky_contato,           setFkyContato]          = useState();
  const[dsc_profissao,         setDscProfissao]        = useState();
  const[dsc_local_trabalho,    setDscLocalTrabalho]    = useState();
  const[dsc_ddd_fone_trabalho, setDscDddFoneTrabalho]  = useState();
  const[dsc_fone_trabalho,     setDscFoneTrabalho]     = useState();
  const[flg_tipo_contato,      setFlgTipoContato]      = useState('P');
  const[flg_contato_principal, setFlgContatoPrincipal] = useState('N');
  const[con_flg_estado_civil,  setConFlgEstadoCivil]   = useState('S');

  const[listar_contato,        setListarContato]      = useState();
  const[listar_contato_combo,  setListarContatoCombo] = useState();
  const[excluido_contato,      setExcluidoContato]    = useState();                               

//Variaveis do paciente
  const[dsc_filiacao_pai,         setDscFiliacaoPai]         = useState('');
  const[dsc_filiacao_mae,         setDscFiliacaoMae]         = useState('');
  const[dsc_religiao,             setDscReligiao]            = useState('');
  const[dsc_tipo_renda,           setDscTipoRenda]           = useState('');
  const[dsc_cidade_ant,           setDscCidadeAnt]           = useState('');
  const[dat_residencia_cidade,    setDatResidenciaCidade]    = useState('');
  const[dbl_valor_renda,          setDblValorRenda]          = useState(0);
  const[fky_curador,              setFkyCurador]             = useState('');
  const[pac_flg_estado_civil,     setPacFlgEstadoCivil]      = useState('S');
  const[flg_frequenta_religiao,   setFlgFrequentaReligiao]   = useState('N');
  const[flg_possui_filho,         setFlgPossuiFilho ]        = useState('N');
  const[flg_possui_casa_propria,  setFlgPossuiCasaPropria]   = useState('N');
  const[flg_possui_renda,         setFlgPossuiRenda]         = useState('N');
  const[flg_paciente_interditado, setFlgPacienteInterditado] = useState('N');  
  const[int_quant_filho,          setIntQuantFilho]          = useState(0);
  const[int_quant_filho_vivo,     setIntQuantFilhoVivo]      = useState(0);
  const[mem_dados_resguardado,    setMemDadosResguardado]    = useState('');  

  let {cod_pessoa} = useParams();

  function fun_formataData(lData){
    return lData.substring(0, 10)
  }

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

  function fun_tipopessoa(lValor){
    setFlgTipoPessoa(lValor);

    if (lValor === "F"){
      setLblCpfCnpj('CPF:');
      setLblRgIe('RG:');
    } else{
      setLblCpfCnpj('CNPJ:');
      setLblRgIe('IE:');
    }

    return lValor;
  }

//Listar dados Pessoa  
  async function fun_listar_pessoa(){
    return await Axios.get(apiUrl + "/pessoa/listar/" + cod_pessoa);
  }

  useEffect(() => {
    fun_listar_pessoa().then((response) => {
      setReferencia(     response.data[0].dsc_referencia);
      setNomePessoa(     response.data[0].dsc_nome_pessoa);
      setNomeFantasia(   response.data[0].dsc_nome_fantasia);      
      setCpfCnpj(        response.data[0].dsc_cpf_cnpj);
      setRgInscEstadual( response.data[0].dsc_rg_insc_estadual);
      setDdd01(          response.data[0].dsc_ddd_01);
      setFone01(         response.data[0].dsc_fone_01);
      setDddCelular01(   response.data[0].dsc_ddd_celular_01);
      setCelular01(      response.data[0].dsc_celular_01);
      setCep(            response.data[0].dsc_cep);
      setDscCidadeNatal( response.data[0].dsc_cidade_natal);
      setBairro(         response.data[0].dsc_bairro);
      setCidade(         response.data[0].dsc_cidade);
      setLogradouro(     response.data[0].dsc_logradouro);
      setNumLogradouro(  response.data[0].num_logradouro);
      setFlgTipoCadastro(response.data[0].flg_tipo_cadastro);
      setFlgTipoPessoa(  response.data[0].flg_tipo_pessoa);
      setFlgSexo(        response.data[0].flg_sexo);
      setFlgUf(          response.data[0].flg_uf);
      
    //formatar datas
      setDatCadastro(  fun_formataData(response.data[0].dat_cadastro));
      setDatNascimento(fun_formataData(response.data[0].dat_nascimento));
      
      fun_tipopessoa( response.data[0].flg_tipo_pessoa);
      })      
  }, []);

//Listar dados Paciente (Dados Especificos)
  async function fun_listar_paciente(){
    return await Axios.get(apiUrl + "/pessoa/paciente/listar/" + cod_pessoa);
  };

  useEffect(() => {
    fun_listar_paciente().then((response) =>{
      if (response.data.length > 0) {
        setDscFiliacaoPai(         response.data[0].dsc_filiacao_pai);
        setDscFiliacaoMae(         response.data[0].dsc_filiacao_mae);
        setDscReligiao(            response.data[0].dsc_religiao);
        setDscTipoRenda(           response.data[0].dsc_tipo_renda);
        setDscCidadeAnt(           response.data[0].dsc_cidade_ant);
        setDatResidenciaCidade(    response.data[0].dat_residencia_cidade);
        setDblValorRenda(          response.data[0].dbl_valor_renda);    
        setFkyCurador(             response.data[0].fky_curador);    
        setPacFlgEstadoCivil(      response.data[0].pac_flg_estado_civil);    
        setFlgFrequentaReligiao(   response.data[0].flg_frequenta_religiao);    
        setFlgPossuiFilho(         response.data[0].flg_possui_filho);
        setFlgPossuiCasaPropria(   response.data[0].flg_possui_casa_propria);
        setFlgPossuiRenda(         response.data[0].flg_possui_renda);
        setFlgPacienteInterditado( response.data[0].flg_paciente_interditado);
        setIntQuantFilho(          response.data[0].int_quant_filho);
        setIntQuantFilhoVivo(      response.data[0].int_quant_filho_vivo);
        setMemDadosResguardado(    response.data[0].mem_dados_resguardado);
      }
    })
  }, []);

//Listar os Contatos da Pessoa
  useEffect(() => {
    fun_listar_contato().then((response) =>{     
      setContato(response.data);
  })      
  }, [listar_contato, excluido_contato]);

  async function fun_listar_contato(){
    return await Axios.get(apiUrl + "/pessoa/contato/listar/" + cod_pessoa);
  };

//Listar os Contatos do Combo Box
  useEffect(() => {
    fun_listar_contato_combo().then((response) =>{     
      setListarContatoCombo(response.data); 
  })      
  }, []);

  const navigate = useNavigate();

  async function fun_listar_contato_combo(){
    return await Axios.get(apiUrl + "/contato/listar/");
  };

//Excluir Contato  
  function fun_excluircontato(fky_contato){
    let codigo = fky_contato;
        
    fun_excluindocontato(fky_contato).then((response) =>{
      setExcluidoContato(codigo);
    });    
  };

  async function fun_excluindocontato(fky_contato){
    return await Axios.delete(apiUrl + "/pessoa/contato/excluir/" + cod_pessoa + '/' + fky_contato);
  };

  function AdicionarContato(){
    AdicionandoContato().then((response)=>{      
      setListarContato(response); //Retornando o insertid    
    });

    return;
  }

  async function AdicionandoContato(){    
    let response = await Axios.post(apiUrl + "/pessoa/contato/inserir",
    {
      fky_pessoa:            cod_pessoa,
      fky_contato:           fky_contato,
      dsc_profissao:         dsc_profissao,
      dsc_local_trabalho:    dsc_local_trabalho,
      dsc_ddd_fone_trabalho: dsc_ddd_fone_trabalho,
      dsc_fone_trabalho:     dsc_fone_trabalho,      
      flg_tipo_contato:      flg_tipo_contato,
      flg_contato_principal: flg_contato_principal,
      flg_estado_civil:      con_flg_estado_civil 
    });

    return response;
  }

//*Dados Pessoa
  function Editar(){
    Axios.put(apiUrl + "/pessoa/editar/" + cod_pessoa,
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
      dsc_cidade_natal:     dsc_cidade_natal,
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
      fun_editar_paciente().then((response)=>{
        setConfirmado(true);      
      });      
    });
  }

//Dados Paciente
  async function fun_editar_paciente(){
    return await Axios.put(apiUrl + "/pessoa/paciente/editar/" + cod_pessoa,
      {
        fky_pessoa:               cod_pessoa,
        dsc_filiacao_pai:         dsc_filiacao_pai,
        dsc_filiacao_mae:         dsc_filiacao_mae,
        dsc_religiao:             dsc_religiao,
        dsc_tipo_renda:           dsc_tipo_renda,
        dsc_cidade_ant:           dsc_cidade_ant,
        dat_residencia_cidade:    dat_residencia_cidade,
        dbl_valor_renda:          dbl_valor_renda,
        fky_curador:              fky_curador,      
        flg_estado_civil:         pac_flg_estado_civil,      
        flg_frequenta_religiao:   flg_frequenta_religiao,      
        flg_possui_filho:         flg_possui_filho,
        flg_possui_casa_propria:  flg_possui_casa_propria,
        flg_possui_renda:         flg_possui_renda,
        flg_paciente_interditado: flg_paciente_interditado,
        int_quant_filho:          int_quant_filho,
        int_quant_filho_vivo:     int_quant_filho_vivo,      
        mem_dados_resguardado:    mem_dados_resguardado
      });
  }

  function Cancelar(){
    setConfirmado(true);
  }

  function renderComboContato(){    
    return typeof listar_contato_combo !== 'undefined' &&
                  listar_contato_combo.map(function (combo_contato){
      return <option key={combo_contato.cod_pessoa} value={combo_contato.cod_pessoa}>{combo_contato.dsc_nome_pessoa}</option>
  })}

  return <div>
    <Menu/>

    <div className="container-fluid mt-page">
      <div>
        <form>          
          <div>
            <h3  className = "text-center">Cadastro de Pessoa - Editando...</h3>
          </div>

        {/*Page tabs*/}
          <ul className="nav nav-tabs" id="myTab" role="tablist">
          {/*Aba Dados*/}  
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="dados-tab" data-bs-toggle="tab" data-bs-target="#dados-tab-pane" type="button" role="tab" aria-controls="dados-tab-pane" aria-selected="true">Dados</button>
            </li>

          {/*Aba Contatos*/} 
            {
              flg_tipo_cadastro === "P" ? //Paciente 
              <li className="nav-item" role="presentation">
              <button className="nav-link" id="contatos-tab" data-bs-toggle="tab" data-bs-target="#contatos-tab-pane" type="button" role="tab" aria-controls="contatos-tab-pane" aria-selected="false">Contatos</button>
              </li>
              : null
            }

            {/*Aba Específicos*/} 
            {
              flg_tipo_cadastro === "P" ? //Paciente 
              <li className="nav-item" role="presentation">
              <button className="nav-link" id="especificos-tab" data-bs-toggle="tab" data-bs-target="#especificos-tab-pane" type="button" role="tab" aria-controls="especificos-tab-pane" aria-selected="false">Específicos</button>
              </li>
              : null
            }

            {/*Aba Resguardados*/} 
            {
              flg_tipo_cadastro === "P" ? //Paciente 
              <li className="nav-item" role="presentation">
              <button className="nav-link" id="resguardado-tab" data-bs-toggle="tab" data-bs-target="#resguardado-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false">Resguardados</button>
              </li>
              : null
            } 

            {/*Aba Social*/} 
            {
              flg_tipo_cadastro === "P" ? //Paciente 
              <li className="nav-item" role="presentation">
              <button className="nav-link" id="social-tab" data-bs-toggle="tab" data-bs-target="#social-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Social</button>
              </li>
              :null
            }  
          </ul>

          <div className="tab-content" id="myTabContent">

          {/*Aba - Dados*/}  
            <div className="tab-pane fade show active" id="dados-tab-pane" role="tabpanel" aria-labelledby="dados-tab" tabIndex="0">
            {/*Referencia, Data Cadastro, Data Nascimento, Idade*/}  
              <div className="input-group mt-margem">
              {/*Pessoa (Paciente, Colaborador, etc)*/}
                <label  htmlFor="flg_tipo_cadastro" className="mt-margem">Tipo:</label>
                <select className="form-control mt-margem-input-ref" onChange={(e)=>setFlgTipoCadastro(e.target.value)} value={flg_tipo_cadastro} name="flg_tipo_cadastro" id="flg_tipo_cadastro" autoFocus>
                  <option value="P">Paciente   </option>
                  <option value="C">Colaborador</option>
                  <option value="F">Fornecedor </option>
                  <option value="N">Contato    </option>
                </select>
              {/*Usuário (S ou N)*/}
                <label  htmlFor="flg_usuario" className="mt-margem">Usuário:</label>
                <select className="form-control mt-margem-input-seq" onChange={(e)=>setFlgUsuario(e.target.value)} value={flg_usuario} name="flg_usuario" id="flg_usuario" autoFocus>
                  <option value="S">Sim</option>
                  <option value="N">Não</option>
                </select>
              {/*Referencia*/}  
                <label htmlFor="dsc_referencia" className="mt-margem">Referência :</label>
                <input onChange={(e)=>setReferencia(e.target.value)} value={referencia} type="text" name="dsc_referencia" id="dsc_referencia" className="form-control mt-margem-input-ref"/>
              {/*Data Cadastro*/}  
                <label htmlFor="dat_cadasro" className="mt-margem">Cadastro:</label>
                <input onChange={(e)=>setDatCadastro(e.target.value)} value={datcadastro} type="date" name="dat_cadastro" id="dat_cadastro" className="form-control"/>
              {/*Data Nascimento*/}
                <label htmlFor="dat_nascimento" className="mt-margem">Nascimento:</label>
                <input onChange={(e)=>setDatNascimento(e.target.value)} value={datnascimento} type="date" name="dat_nascimento" id="dat_nascimento" className="form-control"/>              
              </div>

            {/*Tipo Pessoa, Cpf Cnpj, RG IE, Sexo*/}  
              <div className="input-group mt-margem">
              {/*Tipo Pessoa*/}
                <label htmlFor="flg_tipo_pessoa" className="mt-margem">Tipo Pessoa:</label>
                <select className="form-control mt-margem-input-ref" onChange={(e)=>fun_tipopessoa(e.target.value)} value={flg_tipo_pessoa} name="flg_tipo_pessoa" id="flg_tipo_pessoa">
                  <option value="F">Física  </option>
                  <option value="J">Jurídica</option>
                </select>
              {/*CPF CNPJ */}          
                <label htmlFor="dsc_cpf_cnpj" className="mt-margem">{lblcpfcnpj}</label>
                <input onChange={(e)=>setCpfCnpj(fun_mascaraCpfCnpj(e.target.value))} value={cpfcnpj} type="text" name="dsc_cpf_cnpj" id="dsc_cpf_cnpj" className="form-control"/>          
              {/*RG Insc Estadual */}          
                <label htmlFor="dsc_rg_insc_estadual"  className="mt-margem">{lblrgie}</label>
                <input onChange={(e)=>setRgInscEstadual(e.target.value)} value={rginscestadual} type="text" name="dsc_rg_insc_estadual" id="dsc_rg_insc_estadual" className="form-control"/>
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
                <input onChange={(e)=>setNomePessoa(e.target.value)} value={nomepessoa} type="text" name="dsc_nome_pessoa" id="dsc_nome_pessoa" className='form-control'/> 
              {/*Nome Fangasia*/}  
                <label htmlFor="dsc_nome_fantasia" className="mt-margem">Nome Fantasia:</label>
                <input onChange={(e)=>setNomeFantasia(e.target.value)} value={nomefantasia} type="text" name="dsc_nome_fantasia" id="dsc_nome_fantasia" className="form-control"/>
              </div>
          
            {/* Ddd e Fone 001, Ddd e Celular 001, Cep*/}  
              <div className="input-group mt-margem">
              {/*DDD 01*/}  
                <label htmlFor="dsc_ddd_01" className="mt-margem ">DDD:</label>            
                <input onChange={(e)=>setDdd01(e.target.value)} value={ddd01} type="text" name='dsc_ddd_01' id='dsc_ddd_01' className="form-control mt-margem-input-seq"/>
              {/*FONE 01*/}
                <label htmlFor="dsc_fone_01" className="mt-margem">Fone:</label>
                <input onChange={(e)=>setFone01(fun_formatafone(e.target.value, 1))} value={fone01} type="tel" name="dsc_fone_01" id="dsc_fone_01" className="form-control"/>
              {/*DDD Celular 01*/}          
                <label htmlFor="dsc_ddd_celular_01" className="mt-margem">DDD:</label>
                <input onChange={(e)=>setDddCelular01(e.target.value)} value={dddcelular01} type="text" name="dsc_ddd_celular_01" id="dsc_ddd_celular_01" className="form-control mt-margem-input-seq"/> 
              {/*Celular 01*/}
                <label htmlFor="dsc_celular_01" className="mt-margem">Celular:</label>
                <input onChange={(e)=>setCelular01(fun_formatafone(e.target.value, 2))} value={celular01} type="tel" name="dsc_celular_01" id="dsc_celular_01" className="form-control"/>
              {/*Cep*/}
              <label htmlFor="dsc_cep" className="mt-margem">Cep:</label>
                <input onChange={(e)=>setCep(e.target.value)} value={cep} type="text" name="dsc_cep" id="dsc_cep" className="form-control"/>
              </div>

            {/*Uf, Cidade, Bairro*/}  
              <div className="input-group mt-margem">
              {/*UF*/}
              <label htmlFor="flg_uf" className="mt-margem">UF:</label>
                <select className="form-control mt-margem mt-margem-input-seq" onChange={(e)=>setFlgUf(e.target.value)} value={flguf} name="flg_uf" id="flg_uf">
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
                <input onChange={(e)=>setCidade(e.target.value)} value={cidade} type="text" name="dsc_cidade" id="dsc_cidade" className="form-control"/>
              {/*Bairro*/}         
                <label htmlFor="dsc_bairro" className="mt-margem">Bairro:</label>
                <input onChange={(e)=>setBairro(e.target.value)} value={bairro} type="text" name="dsc_bairro" id="dsc_bairro" className="form-control"/>
              </div>

            {/*Logradouro, Numero*/}  
              <div className="input-group mt-margem">
              {/*Logradouro*/}           
                <label htmlFor="dsc_logradouro" className="mt-margem">Lodradouro:</label>
                <input onChange={(e)=>setLogradouro(e.target.value)} value={logradouro} type="text" name="dsc_logradouro" id="dsc_logradouro" className="form-control"/> 
              {/*Numero*/}  
                <label htmlFor="num_logradouro" className="mt-margem">nº:</label>
                <input onChange={(e)=>setNumLogradouro(e.target.value)} value={numlogradouro} type="text" name="num_logradouro" id="num_logradouro" className="form-control mt-margem-input-seq"/> 
              </div>            
            </div>

          {/*Aba - Contatos*/}
            <div className="tab-pane fade" id="contatos-tab-pane" role="tabpanel" aria-labelledby="contatos-tab" tabIndex="1">
            
            {/*Tipo Contato, Contato, Contato Principal, Estados Civil*/}
              <div className="input-group mt-margem">
              {/*Tipo Contato (Parente, Conjugue, etc)*/}
                <label  htmlFor="flg_tipo_contato" className="mt-margem">Tipo:</label>
                <select className="form-control mt-margem-input-ref" onChange={(e)=>setFlgTipoContato(e.target.value)} value={flg_tipo_contato} name="flg_tipo_contato"  id="flg_tipo_contato">
                  <option key="P" value="P">Parente </option>
                  <option key="C" value="C">Conjugue</option>
                  <option key="A" value="A">Amigo   </option>
                  <option key="V" value="V">Vizinho </option>
                  <option key="R" value="R">Curador </option>
                </select>
              {/*Contato*/}
                <label  htmlFor="fky_contato" className="mt-margem">Contato:</label>
                <select className="form-control" onChange={(e)=>setFkyContato(e.target.value)} name="fky_contato"  id="fky_contato">
                <option key="0" value="0"></option> {/*Insere uma linha vazia*/}
                  {renderComboContato()};
                </select>
               {/*Contato Principal (S ou N)*/}
                <label  htmlFor="flg_contato_principal" className="mt-margem">Principal:</label>
                <select className="form-control mt-margem-input-seq" onChange={(e)=>setFlgContatoPrincipal(e.target.value)} value={flg_contato_principal} name="flg_contato_principal" id="flg_contato_principal">
                  <option value="S">Sim</option>
                  <option value="N">Não</option>
                </select>
              {/*Estado Civil (Casado, Solteiro, etc)*/}
                <label  htmlFor="con_flg_estado_civil" className="mt-margem">Estado Civil:</label>
                <select className="form-control mt-margem-input-ref" onChange={(e)=>setConFlgEstadoCivil(e.target.value)} value={con_flg_estado_civil} name="con_flg_estado_civil" id="con_flg_estado_civil">
                  <option value="1">Solteiro        </option>
                  <option value="2">Casado          </option>
                  <option value="3">Viúvo           </option>
                  <option value="4">Separado        </option>
                  <option value="5">Divorciado      </option>
                  <option value="6">Sem Companheiro </option>
                  <option value="7">Nunca Casou     </option>
                  <option value="8">Não Sabe        </option>
                  <option value="9">Outro           </option>
                </select>
              </div>

            {/*Profissao, Local Profissao, DDD 01, FONE 01, Botão Adicionar*/}  
              <div className="input-group mt-margem">
              {/*Profissao*/}  
                <label htmlFor="dsc_profissao" className="mt-margem">Profissão:</label>
                <input onChange={(e)=>setDscProfissao(e.target.value)} value={dsc_profissao} type="text" name="dsc_profissao" id="dsc_profissao" className="form-control"/>
              {/*Local Profissao*/}  
                <label htmlFor="dsc_local_trabalho" className="mt-margem">Local de Trabalho :</label>
                <input onChange={(e)=>setDscLocalTrabalho(e.target.value)} value={dsc_local_trabalho} type="text" name="dsc_local_tragalho" id="dsc_local_tragalho" className="form-control"/>
              {/*Edit DDD 01*/}  
                <label htmlFor="dsc_ddd_fone_trabalho" className="mt-margem ">DDD:</label>            
                <input onChange={(e)=>setDscDddFoneTrabalho(e.target.value)} value={dsc_ddd_fone_trabalho} type="text" name='dsc_ddd_fone_trabalho' id='dsc_ddd_fone_trabalho' className="form-control mt-margem-input-seq"/>
              {/*Edit FONE 01*/}
                <label htmlFor="dsc_fone_trabalho" className="mt-margem">Fone:</label>
                <input onChange={(e)=>setDscFoneTrabalho(e.target.value)} value={dsc_fone_trabalho} type="tel" name="dsc_fone_trabalho" id="dsc_fone_trabalho" className="form-control"/>
              {/*Botão Adicionar*/}    
                <button type='button' onClick={AdicionarContato} className="btn btn-light btn-adicionar">Adicionar</button>
              </div>
              
            {/*GridContato*/}  
              <div>
                <ListaContato contato={contato} clickExcluirContato={fun_excluircontato}/>              
              </div>

            </div> {/*Fecha Aba - Contatos*/}

          {/*Aba - Especificos*/}  
            <div className="tab-pane fade" id="especificos-tab-pane" role="tabpanel" aria-labelledby="espeficos-tab" tabIndex="2">

            {/*Estado Civil, Religião, Freguenta Religiao, Naturalidade, Tempo Cidade*/}
              <div className="input-group mt-margem">
              {/*Estado Civil (Casado, Solteiro, etc)*/}
                <label  htmlFor="pac_flg_estado_civil" className="mt-margem">Estado Civil:</label>
                <select className="form-control mt-margem-input-ref" onChange={(e)=>setPacFlgEstadoCivil(e.target.value)} value={pac_flg_estado_civil} name="pac_flg_estado_civil" id="pac_flg_estado_civil">
                  <option key="1" value="1">Solteiro        </option>
                  <option key="2" value="2">Casado          </option>
                  <option key="3" value="3">Viúvo           </option>
                  <option key="4" value="4">Separado        </option>
                  <option key="5" value="5">Divorciado      </option>
                  <option key="6" value="6">Sem Companheiro </option>
                  <option key="7" value="7">Nunca Casou     </option>
                  <option key="8" value="8">Não Sabe        </option>
                  <option key="9" value="9">Outro           </option>
                </select>
              {/*Naturalidade = Cidade Natal*/}
                <label htmlFor="dsc_cidade_natal" className="mt-margem">Natural de:</label>
                <input onChange={(e)=>setDscCidadeNatal(e.target.value)} value={dsc_cidade_natal} type="text" name="dsc_cidade_natal" id="dsc_cidade_natal" className="form-control"/>
              {/*Cidade Anterior*/}
                <label htmlFor="dsc_cidade_ant" className="mt-margem">Cidade anterior:</label>
                <input onChange={(e)=>setDscCidadeAnt(e.target.value)} value={dsc_cidade_ant} type="text" name="dsc_cidade_ant" id="dsc_cidade_ant" className="form-control"/>             
              </div>

              <div className="input-group mt-margem">
               {/*Frequenta Religião ?*/}
               <label  htmlFor="flg_frequenta_religiao" className="mt-margem">Frequenta Religião:</label>
                <select className="form-control mt-margem-input-seq" onChange={(e)=>setFlgFrequentaReligiao(e.target.value)} value={flg_frequenta_religiao} name="flg_frequenta_religiao" id="flg_frequenta_religiao">
                  <option key="S" value="S">Sim </option>
                  <option key="N" value="N">Não </option>                  
                </select>  
              {/*Religião*/}
                <label htmlFor="dsc_religiao" className="mt-margem">Religião:</label>
                <input onChange={(e)=>setDscReligiao(e.target.value)} value={dsc_religiao} type="text" name="dsc_religiao" id="dsc_religiao" className="form-control"/>
                {/*Possui Filhos ?*/}
                <label  htmlFor="flg_possui_filho" className="mt-margem">Possui Filhos:</label>
                <select className="form-control mt-margem-input-seq" onChange={(e)=>setFlgPossuiFilho(e.target.value)} value={flg_possui_filho} name="flg_possui_filho" id="flg_possui_filho">
                  <option key="S" value="S">Sim </option>
                  <option key="N" value="N">Não </option>                  
                </select>

               {/*Quantos Filhos*/}
                <label htmlFor="int_quant_filho" className="mt-margem">Quantos:</label>
                <input onChange={(e)=>setIntQuantFilho(e.target.value)} value={int_quant_filho} type="text" name="int_quant_filho" id="int_quant_filho" className="form-control mt-margem-input-seq"/>

              {/*Quantos Filhos Vivos*/}
                <label htmlFor="int_quant_filho_vivo" className="mt-margem">Quantos Vivos:</label>
                <input onChange={(e)=>setIntQuantFilhoVivo(e.target.value)} value={int_quant_filho_vivo} type="text" name="int_quant_filho_vivo" id="int_quant_filho_vivo" className="form-control mt-margem-input-seq"/>

              {/*Casa Propria ?*/}
                <label  htmlFor="flg_possui_casa_propria" className="mt-margem">Casa Propria:</label>
                <select className="form-control mt-margem-input-seq" onChange={(e)=>setFlgPossuiCasaPropria(e.target.value)} value={flg_possui_casa_propria} name="flg_possui_casa_propria" id="flg_possui_casa_propria">
                  <option key="S" value="S">Sim </option>
                  <option key="N" value="N">Não </option>                  
                </select>
              </div>

              <div className="input-group mt-margem">
              {/*Nome Mae*/}
                <label htmlFor="dsc_filiacao_mae" className="mt-margem">Nome Mãe:</label>
                <input onChange={(e)=>setDscFiliacaoMae(e.target.value)} value={dsc_filiacao_mae} type="text" name="dsc_filiacao_mae" id="dsc_filiacao_mae" className="form-control"/>
              {/*Nome Pai*/}
                <label htmlFor="dsc_filiacao_pai" className="mt-margem">Nome Pai:</label>
                <input onChange={(e)=>setDscFiliacaoPai(e.target.value)} value={dsc_filiacao_pai} type="text" name="dsc_filiacao_pai" id="dsc_filiacao_pai" className="form-control"/>
              </div>

              <div className="input-group mt-margem">
              {/*Possui Renda ?*/}
                <label  htmlFor="flg_possui_renda" className="mt-margem">Possui Renda:</label>
                <select className="form-control mt-margem-input-seq" onChange={(e)=>setFlgPossuiRenda(e.target.value)} value={flg_possui_renda} name="flg_possui_renda" id="flg_possui_renda">
                  <option key="S" value="S">Sim </option>
                  <option key="N" value="N">Não </option>                  
                </select>
              {/*Tipo Renda*/}
                <label htmlFor="dsc_tipo_renda" className="mt-margem">Tipo Renda:</label>
                <input onChange={(e)=>setDscTipoRenda(e.target.value)} value={dsc_tipo_renda} type="text" name="dsc_tipo_renda" id="dsc_tipo_renda" className="form-control"/>
              {/*Valor Renda*/}
                <label htmlFor="dbl_valor_renda" className="mt-margem">Valor Renda:</label>
                <input onChange={(e)=>setDblValorRenda(e.target.value)} value={dbl_valor_renda} type="text" name="dbl_valor_renda" id="dbl_valor_renda" className="form-control"/>
              {/*Paciente Interditado ?*/}
                <label  htmlFor="flg_paciente_interditado" className="mt-margem">Paciente Interdidato:</label>
                <select className="form-control mt-margem-input-seq" onChange={(e)=>setFlgPacienteInterditado(e.target.value)} value={flg_paciente_interditado} name="flg_paciente_interditado" id="flg_paciente_interditado">
                  <option key="S" value="S">Sim </option>
                  <option key="N" value="N">Não </option>                  
                </select>              
              </div>

            </div> {/*Fecha Aba - Especificos*/} 
            
          {/*Aba - Resguardados*/}    
            <div className="tab-pane fade" id="resguardado-tab-pane" role="tabpanel" aria-labelledby="resguardado-tab" tabIndex="3">

            {/*Observacoes  - Dados Resguardados*/}
              <label htmlFor="mem_dados_resguardado" className="mt-margem">Observações:</label>
              <textarea rows="14" onChange={(e)=>setMemDadosResguardado(e.target.value)} value={mem_dados_resguardado} name="mem_dados_resguardado" id="mem_dados_resguardado"
                        className="form-control">
              </textarea>  

            </div> {/*Fecha Aba - Resguardados*/}

          {/*Aba - Social*/}    
            <div className="tab-pane fade" id="social-tab-pane" role="tabpanel" aria-labelledby="social-tab" tabIndex="4">...</div> {/*Fecha Aba - Social*/}
          </div>        
        </form>

      {/*Rodape*/}  
        <footer>        
          <div>
          {/*Btn Cancelar e Btn Confirmar*/}
            <div className="text-center mt-margem">          
              <button type='button' onClick={Cancelar} className="btn btn-primary btn-acao">Cancelar </button>
              <button type='button' onClick={Editar}   className="btn btn-primary btn-acao">Confirmar</button>            
            </div>

            <small className="d-flex justify-content-center align-items-center text-secondary"> &copy; Desenvolvido por Suíte Sistemas</small>
          </div>
        </footer>

        {
          confirmado ?
            navigate('/pessoa') : null
        }
       
        
      </div>
    </div>
  </div>
}

export default Pessoa_Edt;