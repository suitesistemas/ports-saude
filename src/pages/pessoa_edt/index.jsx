import Menu                                       from '../../components/menu/index.jsx';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams }                 from 'react-router-dom';
import Axios                                      from "axios";
import ListaContato                               from '../../components/lista_contato/index.jsx';
import ListaRegistro                              from '../../components/lista_registro/index.jsx';
import { AuthContext }                            from "../../context/auth.jsx";
import dns_api                                    from '../../config/constante';

//const apiUrl = "http://localhost:5000";
//const apiUrl = "https://portsonline.com.br";
const apiUrl = dns_api();

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
  const[flg_tipo_cadastro, setFlgTipoCadastro]  = useState('');
  const[flg_usuario,       setFlgUsuario]       = useState('N');
  const[flgsexo,           setFlgSexo]          = useState(''); 
  const[flguf,             setFlgUf]            = useState('');
  const[dsc_cidade_natal,  setDscCidadeNatal]   = useState('');

  const[lblcpfcnpj, setLblCpfCnpj] = useState('CPF:');
  const[lblrgie,    setLblRgIe]    = useState('RG:');

  const [confirmado, setConfirmado] = useState(false);

//Usuario
  const[dsc_usuario,                setDscUsuario]               = useState('');
  const[dsc_senha,                  setDscSenha]                 = useState('');
  const[flg_visualizar_resguardado, setFlgVisualizarResguardado] = useState('S');
  
//Contato  
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

//Paciente
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

//Paciente - Aba Saude
  const[dsc_plano_saude,            setDscPlanoSaude]           = useState('');
  const[dsc_paciente_lucido,        setDscPacienteLucido]       = useState('');
  const[dsc_cirurgia_feita,         setDscCirurgiaFeita]        = useState('');
  const[dsc_obs_covid_19,           setDscObsCovid19]           = useState('');
  const[dsc_usa_medicamento,        setDscUsaMedicamento]       = useState('');
  const[dsc_usou_outra_instituicao, setDscUsouOutraInstituicao] = useState('');
  const[dsc_condicao_habitual,      setDscCondicaoHabitual]     = useState('');
  const[dbl_valor_medicamento,      setDblValorMedicamento]     = useState(0);
  const[dat_teve_covid_19,          setDatTeveCovid19]          = useState('');  
  const[flg_medicamento_caro,       setFlgMedicamentoCaro]      = useState('N');
  const[flg_auxilio_banho,          setFlgAuxilioBanho]         = useState(false);
  const[flg_auxilio_alimentacao,    setFlgAuxilioAlimentacao]   = useState(false);
  const[flg_auxilio_locomocao,      setFlgAuxilioLocomocao]     = useState(false);
  const[flg_auxilio_vestimenta,     setFlgAuxilioVestimenta]    = useState(false);
  const[flg_auxilio_higiene,        setFlgAuxilioHigiene]       = useState(false);
  const[flg_usa_frauda,             setFlgUsaFrauda]            = useState(false);
  const[flg_paciente_lucido,        setFlgPacienteLucido]       = useState('N');
  const[flg_fez_cirurgia,           setFlgFezCirurgia]          = useState('N');
  const[flg_teve_covid_19,          setFlgTeveCovid19]          = useState('N'); 
  const[num_cartao_sus,             setNumCartaoSus]            = useState('');

  const[excluido_tratamento,      setExcluidoTratamento]     = useState();
  const[excluido_doenca,          setExcluidoDoenca]         = useState();
  const[excluido_vacina,          setExcluidoVacina]         = useState();
  const[excluido_servico_saude,   setExcluidoServicoSaude]   = useState();
  const[excluido_programa_social, setExcluidoProgramaSocial] = useState();

  const[listar_tratamento,      setListarTratamento]     = useState();
  const[listar_doenca,          setListarDoenca]         = useState();
  const[listar_vacina,          setListarVacina]         = useState();
  const[listar_servico_saude,   setListarServicoSaude]   = useState();
  const[listar_programa_social, setListarProgramaSocial] = useState();

  const[listar_especialidade_medico_combo, setListarEspecialidadeMedicoCombo] = useState();
  const[listar_doenca_combo,               setListarDoencaCombo]              = useState();
  const[listar_vacina_combo,               setListarVacinaCombo]              = useState();
  const[listar_servico_saude_combo,        setListarServicoSaudeCombo]        = useState();
  const[listar_programa_social_combo,      setListarProgramaSocialCombo]      = useState();

//Paciente - Aba Saude - Tratamento 
  const[tratamento,               setTratamento]             = useState();
  const[fky_especialidade_medico, setFkyEspecialidadeMedico] = useState();

//Paciente - Aba Saude - Saude 
  const[saude,     setSaude]    = useState();
  const[fky_saude, setFkySaude] = useState(); 
  
//Paciente - Aba Saude - Doenca 
  const[doenca,     setDoenca]    = useState();
  const[fky_doenca, setFkyDoenca] = useState(); 
  
//Paciente - Aba Saude - Vacina 
  const[vacina,     setVacina]    = useState();
  const[fky_vacina, setFkyVacina] = useState();  
  const[num_dose,   setNumDose]   = useState();
  const[dat_dose,   setDatDose]   = useState();

//Paciente - Aba Saude - Servico Saude 
  const[servico_saude,     setServicoSaude]    = useState();
  const[fky_servico_saude, setFkyServicoSaude] = useState();  

//Paciente - Aba Saude - Programa Social 
  const[programa_social,     setProgramaSocial]    = useState();
  const[fky_programa_social, setFkyProgramaSocial] = useState();  

  let {cod_pessoa} = useParams();

  const {logado} = useContext(AuthContext);

  const navigate = useNavigate();

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
    return await Axios.get(apiUrl + "/pessoa/listar/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa);
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
      setFlgUsuario(     response.data[0].flg_usuario);
      setFlgTipoPessoa(  response.data[0].flg_tipo_pessoa);
      setFlgSexo(        response.data[0].flg_sexo);
      setFlgUf(          response.data[0].flg_uf);
      
    //formatar datas
      setDatCadastro(  fun_formataData(response.data[0].dat_cadastro));
      setDatNascimento(fun_formataData(response.data[0].dat_nascimento));
      
      fun_tipopessoa( response.data[0].flg_tipo_pessoa);
      })      
  }, []);

//Listar dados Usuario (Dados Usuario)
  async function fun_listar_usuario(){
    return await Axios.get(apiUrl + "/pessoa/usuario/listar/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa);
  };

  useEffect(() => {
    fun_listar_usuario().then((response) =>{
      if (response.data.length > 0) {
        setDscUsuario(              response.data[0].dsc_usuario);
        setDscSenha(                response.data[0].dsc_senha);
        setFlgVisualizarResguardado(response.data[0].flg_visualizar_resguardado);
      }
    })
  }, []);

//Listar dados Paciente (Dados Especificos)
  async function fun_listar_paciente(){
    return await Axios.get(apiUrl + "/pessoa/paciente/listar/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa);
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

      {/*Aba Saude*/}
        setDscPlanoSaude(          response.data[0].dsc_plano_saude);
        setDscPacienteLucido(      response.data[0].dsc_paciente_lucido);
        setDscCirurgiaFeita(       response.data[0].dsc_cirurgia_feita);
        setDscObsCovid19(          response.data[0].dsc_obs_covid_19);
        setDscUsaMedicamento(      response.data[0].dsc_usa_medicamento);
        setDscUsouOutraInstituicao(response.data[0].dsc_usou_outra_instituicao);
        setDscCondicaoHabitual(    response.data[0].dsc_condicao_habitual);
        setDblValorMedicamento(    response.data[0].dbl_valor_medicamento);
        setDatTeveCovid19(         fun_formataData(response.data[0].dat_teve_covid_19));
        setFlgMedicamentoCaro(     response.data[0].flg_medicamento_caro);
        setFlgAuxilioBanho(        response.data[0].flg_auxilio_banho);
        setFlgAuxilioAlimentacao(  response.data[0].flg_auxilio_alimentacao);
        setFlgAuxilioLocomocao(    response.data[0].flg_auxilio_locomocao);
        setFlgAuxilioVestimenta(   response.data[0].flg_auxilio_vestimenta);
        setFlgAuxilioHigiene(      response.data[0].flg_auxilio_higiene);
        setFlgUsaFrauda(           response.data[0].flg_usa_frauda);
        setFlgPacienteLucido(      response.data[0].flg_paciente_lucido);
        setFlgFezCirurgia(         response.data[0].flg_fez_cirurgia);
        setFlgTeveCovid19(         response.data[0].flg_teve_covid_19);
        setNumCartaoSus(           response.data[0].num_cartao_sus);
      }
    })
  }, []);

//Listar os Contatos da Pessoa
  useEffect(() => {
    console.log('entrou contato');
    fun_listar_contato().then((response) =>{     
      setContato(response.data);
  })      
  }, [listar_contato, excluido_contato]);

  async function fun_listar_contato(){
    return await Axios.get(apiUrl + "/pessoa/contato/listar/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa);
  };

//Listar os Tratamentos da Pessoa
  useEffect(() => {    
    fun_listar_tratamento().then((response) =>{      
      setTratamento(response.data);
  })      
  }, [listar_tratamento, excluido_tratamento]);

  async function fun_listar_tratamento(){
    return await Axios.get(apiUrl + "/pessoa/tratamento/listar/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa);
  };

//Listar as Doencas da Pessoa
  useEffect(() => {    
    fun_listar_doenca().then((response) =>{      
      setDoenca(response.data);
  })      
  }, [listar_doenca, excluido_doenca]);

  async function fun_listar_doenca(){
    return await Axios.get(apiUrl + "/pessoa/doenca/listar/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa);
  };

//Listar as Vacinas da Pessoa
  useEffect(() => {    
    fun_listar_vacina().then((response) =>{      
      setVacina(response.data);
  })      
  }, [listar_vacina, excluido_vacina]);

  async function fun_listar_vacina(){
    return await Axios.get(apiUrl + "/pessoa/vacina/listar/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa);
  };

//Listar os Serviços de Saude da Pessoa
  useEffect(() => {    
    fun_listar_servico_saude().then((response) =>{      
      setServicoSaude(response.data);
  })      
  }, [listar_servico_saude, excluido_servico_saude]);

  async function fun_listar_servico_saude(){
    return await Axios.get(apiUrl + "/pessoa/servico_saude/listar/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa);
  };

//Listar os Programas Sociais da Pessoa
  useEffect(() => {    
    fun_listar_programa_social().then((response) =>{      
      setProgramaSocial(response.data);
  })      
  }, [listar_programa_social, excluido_programa_social]);

  async function fun_listar_programa_social(){
    return await Axios.get(apiUrl + "/pessoa/programa_social/listar/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa);
  };

//Abrindo os Combos Box
  useEffect(() => {
    fun_listar_contato_combo().then((response) =>{     
      setListarContatoCombo(response.data);
    })
    fun_listar_especialidade_medico_combo().then((response) =>{     
      setListarEspecialidadeMedicoCombo(response.data);
    })
    fun_listar_doenca_combo().then((response) =>{     
      setListarDoencaCombo(response.data);
    })
    fun_listar_vacina_combo().then((response) =>{     
      setListarVacinaCombo(response.data);
    })
    fun_listar_servico_saude_combo().then((response) =>{     
      setListarServicoSaudeCombo(response.data);
    })
    fun_listar_programa_social_combo().then((response) =>{     
      setListarProgramaSocialCombo(response.data);
    })         
  }, []);

  async function fun_listar_contato_combo(){
    return await Axios.get(apiUrl + "/contato/listar/" + localStorage.getItem("cod_conta"));
  };

  async function fun_listar_doenca_combo(){
    return await Axios.get(apiUrl + "/doenca/listar/" + localStorage.getItem("cod_conta"));
  };

  async function fun_listar_especialidade_medico_combo(){
    return await Axios.get(apiUrl + "/especialidade_medico/listar/" + localStorage.getItem("cod_conta"));
  };

  async function fun_listar_vacina_combo(){
    return await Axios.get(apiUrl + "/vacina/listar/" + localStorage.getItem("cod_conta"));
  };

  async function fun_listar_servico_saude_combo(){
    return await Axios.get(apiUrl + "/servico_saude/listar/" + localStorage.getItem("cod_conta"));
  };

  async function fun_listar_programa_social_combo(){
    return await Axios.get(apiUrl + "/programa_social/listar/" + localStorage.getItem("cod_conta"));
  };

//Excluir Contato  
  function fun_excluircontato(fky_contato){
    let codigo = fky_contato;
        
    fun_excluindocontato(fky_contato).then((response) =>{
      setExcluidoContato(codigo);
    });    
  };

  async function fun_excluindocontato(fky_contato){
    return await Axios.delete(apiUrl + "/pessoa/contato/excluir/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa + '/' + fky_contato);
  };

  //Excluir Tratamento  
  function fun_excluirtratamento(fky_especialidade_medico){
    let codigo = fky_especialidade_medico;
        
    fun_excluindotratamento(fky_especialidade_medico).then((response) =>{
      setExcluidoTratamento(codigo);
    });    
  };

  async function fun_excluindotratamento(fky_especialidade_medico){
    return await Axios.delete(apiUrl + "/pessoa/tratamento/excluir/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa + '/' + fky_especialidade_medico);
  };

  //Excluir Doenca  
  function fun_excluirdoenca(fky_doenca){
    let codigo = fky_doenca;
        
    fun_excluindodoenca(fky_doenca).then((response) =>{
      setExcluidoDoenca(codigo);
    });    
  };

  async function fun_excluindodoenca(fky_doenca){
    return await Axios.delete(apiUrl + "/pessoa/doenca/excluir/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa + '/' + fky_doenca);
  };

   //Excluir Vacina  
   function fun_excluirvacina(fky_vacina){
    let codigo = fky_vacina;
        
    fun_excluindovacina(fky_vacina).then((response) =>{
      setExcluidoVacina(codigo);
    });    
  };

  async function fun_excluindovacina(fky_vacina){
    return await Axios.delete(apiUrl + "/pessoa/vacina/excluir/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa + '/' + fky_vacina);
  };

  //Excluir Servico Saude  
  function fun_excluirservicosaude(fky_servico_saude){
    let codigo = fky_servico_saude;
        
    fun_excluindoservicosaude(fky_servico_saude).then((response) =>{
      setExcluidoServicoSaude(codigo);
    });    
  };

  async function fun_excluindoservicosaude(fky_servico_saude){
    return await Axios.delete(apiUrl + "/pessoa/servico_saude/excluir/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa + '/' + fky_servico_saude);
  };

  //Excluir Programa Social  
  function fun_excluirprogramasocial(fky_programa_social){
    let codigo = fky_programa_social;
        
    fun_excluindoprogramasocial(fky_programa_social).then((response) =>{
      setExcluidoProgramaSocial(codigo);
    });    
  };

  async function fun_excluindoprogramasocial(fky_programa_social){
    return await Axios.delete(apiUrl + "/pessoa/programa_social/excluir/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa + '/' + fky_programa_social);
  };

//Inserir Contato
  function AdicionarContato(){
    AdicionandoContato().then((response)=>{      
      setListarContato(response); //Retornando o insertid    
    });

    return;
  }

  async function AdicionandoContato(){    
    let response = await Axios.post(apiUrl + "/pessoa/contato/inserir/" + localStorage.getItem("cod_conta"),
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

//Inserir Tratamento
  function AdicionarTratamento(){
    AdicionandoTratamento().then((response)=>{
      console.log(response);      
      setListarTratamento(response); //Retornando o insertid    
  });

  return;
  }  

  async function AdicionandoTratamento(){    
    let response = await Axios.post(apiUrl + "/pessoa/tratamento/inserir/" + localStorage.getItem("cod_conta"),
    {
      fky_paciente:             cod_pessoa,
      fky_especialidade_medico: fky_especialidade_medico
    });

    return response;
  }

//Inserir Doenca
  function AdicionarDoenca(){
    AdicionandoDoenca().then((response)=>{      
      setListarDoenca(response); //Retornando o insertid    
    });

    return;
  }

  async function AdicionandoDoenca(){    
    let response = await Axios.post(apiUrl + "/pessoa/doenca/inserir/" + localStorage.getItem("cod_conta"),
    {
      fky_paciente:          cod_pessoa,
      fky_doenca:            fky_doenca
    });

    return response;
  }

//Inserir Vacina
  function AdicionarVacina(){
    AdicionandoVacina().then((response)=>{      
      setListarVacina(response); //Retornando o insertid    
    });

    return;
  }

  async function AdicionandoVacina(){    
    let response = await Axios.post(apiUrl + "/pessoa/vacina/inserir/" + localStorage.getItem("cod_conta"),
    {
      fky_paciente: cod_pessoa,
      fky_vacina:   fky_vacina,
      num_dose:     num_dose,
      dat_dose:     dat_dose
    });

    return response;
  }

//Inserir Servico Saude
  function AdicionarServicoSaude(){
    AdicionandoServicoSaude().then((response)=>{      
      setListarServicoSaude(response); //Retornando o insertid    
    });

    return;
  }

  async function AdicionandoServicoSaude(){    
    let response = await Axios.post(apiUrl + "/pessoa/servico_saude/inserir/" + localStorage.getItem("cod_conta"),
    {
      fky_paciente:      cod_pessoa,
      fky_servico_saude: fky_servico_saude
    });
    
    return response;
  }

//Inserir Programa Social
  function AdicionarProgramaSocial(){
    AdicionandoProgramaSocial().then((response)=>{      
      setListarProgramaSocial(response); //Retornando o insertid    
    });

    return;
  }

  async function AdicionandoProgramaSocial(){
    let response = await Axios.post(apiUrl + "/pessoa/programa_social/inserir/" + localStorage.getItem("cod_conta"),
    {
      fky_paciente:        cod_pessoa,
      fky_programa_social: fky_programa_social
    });
    
    return response;
  }

//*Dados Pessoa
  function Editar(){
    Axios.put(apiUrl + "/pessoa/editar/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa,
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
        fun_editar_usuario().then((response)=>{
          setConfirmado(true);      
        });
      });      
    });
  }

//Dados Usuario
  async function fun_editar_usuario(){
    return await Axios.put(apiUrl + "/pessoa/usuario/editar/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa,
    {
      fky_pessoa:                 cod_pessoa,
      dsc_usuario:                dsc_usuario,
      dsc_senha:                  dsc_senha,
      flg_visualizar_resguardado: flg_visualizar_resguardado
    });
  }

//Dados Paciente
  async function fun_editar_paciente(){
    return await Axios.put(apiUrl + "/pessoa/paciente/editar/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa,
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
      mem_dados_resguardado:    mem_dados_resguardado,

      dsc_plano_saude:           dsc_plano_saude,
      dsc_paciente_lucido:       dsc_paciente_lucido,
      dsc_cirurgia_feita:        dsc_cirurgia_feita,
      dsc_obs_covid_19:          dsc_obs_covid_19,
      dsc_usa_medicamento:       dsc_usa_medicamento,
      dsc_usou_outra_instituicao:dsc_usou_outra_instituicao,
      dsc_condicao_habitual:     dsc_condicao_habitual,
      dbl_valor_medicamento:     dbl_valor_medicamento,
      dat_teve_covid_19:         dat_teve_covid_19,
      flg_medicamento_caro:      flg_medicamento_caro,
      flg_auxilio_banho:         flg_auxilio_banho,
      flg_auxilio_alimentacao:   flg_auxilio_alimentacao,
      flg_auxilio_locomocao:     flg_auxilio_locomocao,
      flg_auxilio_vestimenta:    flg_auxilio_vestimenta,
      flg_auxilio_higiene:       flg_auxilio_higiene,
      flg_usa_frauda:            flg_usa_frauda,
      flg_paciente_lucido:       flg_paciente_lucido,
      flg_fez_cirurgia:          flg_fez_cirurgia,
      flg_teve_covid_19:         flg_teve_covid_19,
      num_cartao_sus:            num_cartao_sus
    });
  }

  function Cancelar(){
    setConfirmado(true);
  }

//Combo Contato  
  function renderComboContato(){    
    return typeof listar_contato_combo !== 'undefined' &&
                  listar_contato_combo.map(function (registro){
      return <option key={registro.cod_pessoa} value={registro.cod_pessoa}>{registro.dsc_nome_pessoa}</option>
  })}

//Combo Especialidade Medico  
  function renderComboEspecialidadeMedico(){    
    return typeof listar_especialidade_medico_combo !== 'undefined' &&
                  listar_especialidade_medico_combo.map(function (registro){
      return <option key={registro.cod_especialidade_medico} value={registro.cod_especialidade_medico}>{registro.dsc_especialidade_medico}</option>
  })}

//Combo Doença  
  function renderComboDoenca(){    
    return typeof listar_doenca_combo !== 'undefined' &&
                  listar_doenca_combo.map(function (registro){
      return <option key={registro.cod_doenca} value={registro.cod_doenca}>{registro.dsc_doenca}</option>
  })}

//Combo Vacina
  function renderComboVacina(){    
    return typeof listar_vacina_combo !== 'undefined' &&
                  listar_vacina_combo.map(function (registro){
      return <option key={registro.cod_vacina} value={registro.cod_vacina}>{registro.dsc_vacina}</option>
  })}

//Combo Servico Saude  
  function renderComboServicoSaude(){    
    return typeof listar_servico_saude_combo !== 'undefined' &&
                  listar_servico_saude_combo.map(function (registro){
      return <option key={registro.cod_servico_saude} value={registro.cod_servico_saude}>{registro.dsc_servico_saude}</option>
  })}
  
//Combo Programa Social  
  function renderComboProgramaSocial(){    
    return typeof listar_programa_social_combo !== 'undefined' &&
                  listar_programa_social_combo.map(function (registro){
      return <option key={registro.cod_programa_social} value={registro.cod_programa_social}>{registro.dsc_programa_social}</option>
  })}

  return <div>
    {logado?    
      <Menu/>
    :null}

    {logado?    
      <div className="container-fluid mt-page">      
        <form>
          <div>
            <h3  className = "text-center">{nomepessoa}</h3>
          </div>

        {/*Page tabs - Titulos Abas*/}
          <ul className="nav nav-tabs" id="myTab" role="tablist">
          {/*Aba Dados*/}  
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="dados-tab" data-bs-toggle="tab" data-bs-target="#dados-tab-pane" type="button" role="tab" aria-controls="dados-tab-pane" aria-selected="true">Dados</button>
            </li>

          {/*Aba Usuario*/} 
            {
              flg_tipo_cadastro === "C" ? //Controlador
              <li className="nav-item" role="presentation">
              <button className="nav-link" id="usuario-tab" data-bs-toggle="tab" data-bs-target="#usuario-tab-pane" type="button" role="tab" aria-controls="usuario-tab-pane" aria-selected="false">Usuário</button>
              </li>
              : null
            }  

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
              flg_tipo_cadastro === "P" && localStorage.getItem("user_flg_visualizar_resguardado") === "S" ? //Paciente 
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

         {/*Page tabs - Conteudos Abas*/}  
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
              {/*Referencia*/}  
                <label htmlFor="dsc_referencia" className="mt-margem">Referência :</label>
                <input onChange={(e)=>setReferencia(e.target.value)} value={referencia} type="text" name="dsc_referencia" id="dsc_referencia" className="form-control mt-margem-input-ref"/>
              {/*Data Cadastro*/}  
                <label htmlFor="dat_cadastro" className="mt-margem">Cadastro:</label>
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
              < div className="input-group mt-margem">
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

            </div> {/*Fecha Aba - Dados*/}

         {/*Aba - Usuario*/}    
           <div className="tab-pane fade" id="usuario-tab-pane" role="tabpanel" aria-labelledby="usuario-tab" tabIndex="1">
           {/*Usuario (S/N), nome, senha, visualizar_resguardado*/}  
             <div className="input-group mt-margem"> 
             {/*Usuário (S ou N)*/}
               <label  htmlFor="flg_usuario" className="mt-margem">Usuário:</label>
               <select className="form-control mt-margem-input-seq" onChange={(e)=>setFlgUsuario(e.target.value)} value={flg_usuario} name="flg_usuario" id="flg_usuario" autoFocus>
                  <option value="S">Sim</option>
                 <option value="N">Não</option>
               </select>
             {/*Nome*/}  
               <label htmlFor="dsc_usuario" className="mt-margem">Nome :</label>
               <input onChange={(e)=>setDscUsuario(e.target.value)} value={dsc_usuario} type="text" name="dsc_usuario" id="dsc_usuario" className="form-control mt-margem-input-ref"/>
             {/*Senha*/}  
               <label htmlFor="dsc_senha" className="mt-margem">Senha :</label>
               <input onChange={(e)=>setDscSenha(e.target.value)} value={dsc_senha} type="password" name="dsc_senha" id="dsc_senha" className="form-control mt-margem-input-ref"/>  
             {/*Visualizar Resguardado (S ou N)*/}
               <label  htmlFor="flg_visualizar_resguardado" className="mt-margem">Visualizar Resguardado:</label>
               <select className="form-control mt-margem-input-seq" onChange={(e)=>setFlgVisualizarResguardado(e.target.value)} value={flg_visualizar_resguardado} name="flg_visualizar_resguardado" id="flg_visualizar_resguardado" autoFocus>
                  <option value="S">Sim</option>
                 <option value="N">Não</option>
               </select>  
             </div>
           </div> {/*Fecha Aba - Usuario*/}

          {/*Aba - Contatos*/}
            <div className="tab-pane fade" id="contatos-tab-pane" role="tabpanel" aria-labelledby="contatos-tab" tabIndex="2">
            
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
            <div className="tab-pane fade" id="especificos-tab-pane" role="tabpanel" aria-labelledby="espeficos-tab" tabIndex="3">

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
            <div className="tab-pane fade" id="resguardado-tab-pane" role="tabpanel" aria-labelledby="resguardado-tab" tabIndex="4">

            {/*Observacoes  - Dados Resguardados*/}
              <label htmlFor="mem_dados_resguardado" className="mt-margem">Observações:</label>
              <textarea rows="14" onChange={(e)=>setMemDadosResguardado(e.target.value)} value={mem_dados_resguardado} name="mem_dados_resguardado" id="mem_dados_resguardado"
                        className="form-control">
              </textarea>  

            </div> {/*Fecha Aba - Resguardados*/}

          {/*Aba - Social*/}    
            <div className="tab-pane fade" id="social-tab-pane" role="tabpanel" aria-labelledby="social-tab" tabIndex="5">
            {/*Page Vertical*/}
              <div className="d-flex align-items-start">
              {/*Page Titulos*/}
                <div className="nav flex-column nav-pills me-3 mt-page" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <button className="nav-link active" id="v-pills-diversos-tab"   data-bs-toggle="pill" data-bs-target="#v-pills-diversos"   type="button" role="tab" aria-controls="v-pills-diversos"   aria-selected="true"> Diversos</button>
                  <button className="nav-link"        id="v-pills-tratamento-tab" data-bs-toggle="pill" data-bs-target="#v-pills-tratamento" type="button" role="tab" aria-controls="v-pills-tratamento" aria-selected="false">Tratamentos</button>
                  <button className="nav-link"        id="v-pills-doenca-tab"     data-bs-toggle="pill" data-bs-target="#v-pills-doenca"     type="button" role="tab" aria-controls="v-pills-doenca"     aria-selected="false">Doenças</button>
                  <button className="nav-link"        id="v-pills-vacina-tab"     data-bs-toggle="pill" data-bs-target="#v-pills-vacina"     type="button" role="tab" aria-controls="v-pills-vacina"     aria-selected="false">Vacinas</button>
                  <button className="nav-link"        id="v-pills-servico-tab"    data-bs-toggle="pill" data-bs-target="#v-pills-servico"    type="button" role="tab" aria-controls="v-pills-servico"    aria-selected="false">Serviços</button>
                  <button className="nav-link"        id="v-pills-programa-tab"   data-bs-toggle="pill" data-bs-target="#v-pills-programa"   type="button" role="tab" aria-controls="v-pills-programa"   aria-selected="false">Programas</button>
                  <button className="nav-link"        id="v-pills-relato-tab"     data-bs-toggle="pill" data-bs-target="#v-pills-relato"     type="button" role="tab" aria-controls="v-pills-relato"     aria-selected="false">Relato</button>
                </div>

              {/*Page Dados*/}  
                <div className="tab-content container-fluid" id="v-pills-tabContent">
                {/*Aba - Diversos*/}                
                  <div className="tab-pane fade show active" id="v-pills-diversos" role="tabpanel" aria-labelledby="v-pills-diversos-tab" tabindex="0">
                    <div className="input-group mt-margem">              
                    {/*Cartão SUS*/}  
                      <label htmlFor="num_cartao_sus" className="mt-margem">Cartão SUS:</label>
                      <input onChange={(e)=>setNumCartaoSus(e.target.value)} value={num_cartao_sus} type="text" name="num_cartao_sus" id="num_cartao_sus" className="form-control mt-margem-input-ref"/>                    
                    {/*Uso de Medicamento*/}  
                      <label htmlFor="dsc_usa_medicamento" className="mt-margem">Faz uso de algum tipo de medicamento? Quais?:</label>
                      <input onChange={(e)=>setDscUsaMedicamento(e.target.value)} value={dsc_usa_medicamento} type="text" name="dsc_usa_medicamento" id="dsc_usa_medicamento" className="form-control"/>
                    </div>

                    <div className="input-group mt-margem">                      
                     {/*Medicamento Caro ?*/}
                      <label  htmlFor="flg_medicamento_caro" className="mt-margem">Apresentam-se de alto custo?</label>
                      <select className="form-control mt-margem-input-seq" onChange={(e)=>setFlgMedicamentoCaro(e.target.value)} value={flg_medicamento_caro} name="flg_medicamento_caro" id="flg_medicamento_caro">
                        <option key="S" value="S">Sim </option>
                        <option key="N" value="N">Não </option>                  
                      </select>
                    {/*Valor Medicamento*/}
                      <label htmlFor="dbl_valor_medicamento" className="mt-margem">Valor Medicamentos:</label>
                      <input onChange={(e)=>setDblValorMedicamento(e.target.value)} value={dbl_valor_medicamento} type="text" name="dbl_valor_medicamento" id="dbl_valor_medicamento" className="form-control mt-margem-input-valor"/>
                    {/*Plano de Saude, convênio, etc*/}
                      <label htmlFor="dsc_plano_saude" className="mt-margem">Plano de Saude, convênio, etc:</label>
                      <input onChange={(e)=>setDscPlanoSaude(e.target.value)} value={dsc_plano_saude} type="text" name="dsc_plano_saude" id="dsc_plano_saude" className="form-control"/>
                    </div>

                    <div className="mt-margem">                      
                      <div className="mt-margem">
                      <h6 >Paciente necessita de auxílio?</h6>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" onChange={(e)=>setFlgAuxilioBanho(e.target.checked)} value="" name="flg_auxilio_banho" id="flg_auxilio_banho" checked={flg_auxilio_banho}/>
                          <label className="form-check-label" for="flg_auxilio_banho">
                            Banho
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" onChange={(e)=>setFlgAuxilioAlimentacao(e.target.checked)} value="" name="flg_auxilio_alimentacao" id="flg_auxilio_alimentacao" checked={flg_auxilio_alimentacao}/>
                          <label className="form-check-label" for="flg_auxilio_alimentacao">
                            Alimentação
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" onChange={(e)=>setFlgAuxilioLocomocao(e.target.checked)} value="" name="flg_auxilio_locomocao" id="flg_auxilio_locomocao" checked={flg_auxilio_locomocao}/>
                          <label className="form-check-label" for="flg_auxilio_locomocao">
                            Locomoção
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" onChange={(e)=>setFlgAuxilioVestimenta(e.target.checked)} value="" name="flg_auxilio_vestimenta" id="flg_auxilio_vestimenta" checked={flg_auxilio_vestimenta}/>
                          <label className="form-check-label" for="flg_auxilio_vestimenta">
                            Vestir-se
                          </label>
                        </div>                        
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" onChange={(e)=>setFlgAuxilioHigiene(e.target.checked)} value="" name="flg_auxilio_higiene" id="flg_auxilio_higiene" checked={flg_auxilio_higiene}/>
                          <label className="form-check-label" for="flg_auxilio_higiene">
                            Higiene
                          </label>
                        </div>                        
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" onChange={(e)=>setFlgUsaFrauda(e.target.checked)} value="" name="flg_usa_frauda" id="flg_usa_frauda" checked={flg_usa_frauda}/>
                          <label className="form-check-label" for="flg_usa_frauda">
                            Usa Fraldas
                          </label>
                        </div>
                      </div>
                    </div>                    
                
                    <div className="input-group mt-margem">                    
                     {/*Paciente Lúcido?*/}
                       <label  htmlFor="flg_paciente_lucido" className="mt-margem">Paciente Lúcido?</label>
                      <select className="form-control mt-margem-input-seq" onChange={(e)=>setFlgPacienteLucido(e.target.value)} value={flg_paciente_lucido} name="flg_paciente_lucido" id="flg_paciente_lucido">
                        <option key="S" value="S">Sim </option>
                        <option key="N" value="N">Não </option>                  
                      </select>
                    {/*Obervacao Paciente Lúcido*/}
                      <label htmlFor="dsc_paciente_lucido" className="mt-margem"></label>
                      <input onChange={(e)=>setDscPacienteLucido(e.target.value)} value={dsc_paciente_lucido} type="text" name="dsc_paciente_lucido" id="dsc_paciente_lucido" className="form-control" placeholder='Observação quanto a lúcidez'/>
                    </div>

                    <div className="input-group mt-margem">
                    {/*Fez Cirurgia?*/}
                      <label  htmlFor="flg_fez_cirurgia" className="mt-margem">Já fez alguma cirurgia?</label>
                      <select className="form-control mt-margem-input-seq" onChange={(e)=>setFlgFezCirurgia(e.target.value)} value={flg_fez_cirurgia} name="flg_fez_cirurgia" id="flg_fez_cirurgia">
                        <option key="S" value="S">Sim </option>
                        <option key="N" value="N">Não </option>                  
                      </select>
                    {/*Quais Cirurgias*/}
                      <label htmlFor="dsc_cirurgia_feita" className="mt-margem"></label>
                      <input onChange={(e)=>setDscCirurgiaFeita(e.target.value)} value={dsc_cirurgia_feita} type="text" name="dsc_cirurgia_feita" id="dsc_cirurgia_feita" className="form-control" placeholder='Quais cirurgias?'/>
                    </div>

                    <div className="input-group mt-margem">                    
                    {/*Teve Covid-19?*/}
                      <label  htmlFor="flg_teve_covid_19" className="mt-margem">Teve Covid-19?</label>
                      <select className="form-control mt-margem-input-seq" onChange={(e)=>setFlgTeveCovid19(e.target.value)} value={flg_teve_covid_19} name="flg_teve_covid_19" id="flg_teve_covid_19">
                        <option key="S" value="S">Sim </option>
                        <option key="N" value="N">Não </option>                  
                      </select>
                    {/*Data Teve Covid-19*/}  
                      <label htmlFor="dat_teve_covid_19" className="mt-margem">Data:</label>
                      <input onChange={(e)=>setDatTeveCovid19(e.target.value)} value={dat_teve_covid_19} type="date" name="dat_teve_covid_19" id="dat_teve_covid_19" className="form-control mt-margem-input-ref"/>
                    {/*Observações da Covid*/}
                     <label htmlFor="dsc_obs_covid_19" className="mt-margem"></label>
                      <input onChange={(e)=>setDscObsCovid19(e.target.value)} value={dsc_obs_covid_19} type="text" name="dsc_obs_covid_19" id="dsc_obs_covid_19" className="form-control" placeholder='Observações sobre a Covid.'/>
                    </div>

                    <div className="input-group mt-margem">
                    {/*Acolhido Outra Instituição*/}
                     <label htmlFor="dsc_usou_outra_instituicao" className="mt-margem">Já foi acolhido em outra instituição como: ilpi, casa de repouso ou outra instituição?</label>
                     <input onChange={(e)=>setDscUsouOutraInstituicao(e.target.value)} value={dsc_usou_outra_instituicao} type="text" name="dsc_usou_outra_instituicao" id="dsc_usou_outra_instituicao" className="form-control"/>
                    </div>

                    <div className="input-group mt-margem">
                    {/*Condições habitualiade*/}
                     <label htmlFor="dsc_condicao_habitual" className="mt-margem">Quais são as condições de habitualidade/socialização do paciente: higiene, organização, convívio social, relacionamento familiar, com vizinhos, etc..</label>
                     <input onChange={(e)=>setDscCondicaoHabitual(e.target.value)} value={dsc_condicao_habitual} type="text" name="dsc_condicao_habitual" id="dsc_condicao_habitual" className="form-control"/>
                    </div>  
                  </div>

                {/*Aba - Tratamentos*/}  
                  <div className="tab-pane fade" id="v-pills-tratamento" role="tabpanel" aria-labelledby="v-pills-tratamento-tab" tabindex="1">
                  {/*titulo Pergunta*/}  
                    <div className='input-group mt-margem'>
                      <label htmlFor='fky_especialidade_medico' className='mt-margem'>Está realizando algum tipo de tratamento/ acompanhamento médico ou especialista, psiquiátrico, psicológico, neurologista, cardiologista, geriátrico, dermatologista, oftalmologista, ortopedista, neurologista, urologista, entre outros?</label>
                    </div>

                  {/*Especialidade do Médico*/}
                    <div className="input-group mt-margem">                 
                      <label  htmlFor="fky_especialidade_medico" className="mt-margem">Especialidade do Médico:</label>
                      <select className="form-control" onChange={(e)=>setFkyEspecialidadeMedico(e.target.value)} name="fky_especialidade_medico"  id="fky_especialidade_medico">
                      <option key="0" value="0"></option> {/*Insere uma linha vazia*/}
                        {renderComboEspecialidadeMedico()};
                      </select>  
                  
                    {/*Botão Adicionar*/}    
                      <button type='button' onClick={AdicionarTratamento} className="btn btn-light btn-adicionar">Adicionar</button>
                    </div>

                  {/*GridTratamento*/}  
                    <div>                      
                      <ListaRegistro registro={tratamento} clickExcluirRegistro={fun_excluirtratamento}/>              
                    </div>
                  </div>
                  
                {/*Aba - Doenças*/}  
                  <div className="tab-pane fade" id="v-pills-doenca" role="tabpanel" aria-labelledby="v-pills-doenca-tab" tabindex="2">
                  {/*titulo Pergunta*/}  
                    <div className='input-group mt-margem'>
                      <label htmlFor='fky_doenca' className='mt-margem'>Relatar as doenças que acometem o paciente:</label>
                    </div>

                  {/*Doenca*/}
                    <div className="input-group mt-margem">                      
                      <label  htmlFor="fky_doenca" className="mt-margem">Doença:</label>
                      <select className="form-control" onChange={(e)=>setFkyDoenca(e.target.value)} name="fky_doenca"  id="fky_doenca">
                      <option key="0" value="0"></option> {/*Insere uma linha vazia*/}
                        {renderComboDoenca()};
                      </select>  
                  
                    {/*Botão Adicionar*/}    
                      <button type='button' onClick={AdicionarDoenca} className="btn btn-light btn-adicionar">Adicionar</button>
                    </div>

                  {/*GridDoenca*/}  
                    <div>
                      <ListaRegistro registro={doenca} clickExcluirRegistro={fun_excluirdoenca}/>              
                    </div>
                  </div>

                {/*Aba - Vacinas*/}  
                  <div className="tab-pane fade" id="v-pills-vacina" role="tabpanel" aria-labelledby="v-pills-vacina-tab" tabindex="3">
                  {/*titulo Pergunta*/}  
                    <div className='input-group mt-margem'>
                      <label htmlFor='fky_vacina' className='mt-margem'>Informe as vacinas que o paciente já tomou:</label>
                    </div>

                  {/*Vacina*/}
                    <div className="input-group mt-margem">                      
                      <label  htmlFor="fky_vacina" className="mt-margem">Vacina:</label>
                      <select className="form-control" onChange={(e)=>setFkyVacina(e.target.value)} name="fky_vacina"  id="fky_vacina">
                      <option key="0" value="0"></option> {/*Insere uma linha vazia*/}
                        {renderComboVacina()};
                      </select>
                    {/*Nº Dose*/}
                      <label htmlFor="num_dose" className="mt-margem">Nº Dose:</label>
                      <input onChange={(e)=>setNumDose(e.target.value)} value={num_dose} type="text" name="num_dose" id="num_dose" className="form-control mt-margem-input-seq"/>
                    {/*Data Dose*/}  
                      <label htmlFor="dat_dose" className="mt-margem">Data:</label>
                      <input onChange={(e)=>setDatDose(e.target.value)} value={dat_dose} type="date" name="dat_dose" id="dat_dose" className="form-control mt-margem-input-ref"/>
                    {/*Botão Adicionar*/}    
                      <button type='button' onClick={AdicionarVacina} className="btn btn-light btn-adicionar">Adicionar</button>
                    </div>

                  {/*GridVacina*/}  
                    <div>
                      <ListaRegistro registro={vacina} clickExcluirRegistro={fun_excluirvacina}/>              
                    </div>
                  </div>

                {/*Aba - Serviços*/}  
                  <div className="tab-pane fade" id="v-pills-servico" role="tabpanel" aria-labelledby="v-pills-servico-tab" tabindex="4">
                  {/*titulo Pergunta*/}  
                    <div className='input-group mt-margem'>
                      <label htmlFor='fky_servico_saude' className='mt-margem'>Paciente atendido pelos serviços de saúde do bairro/município?</label>
                    </div>

                  {/*Serviços*/}
                    <div className="input-group mt-margem">                      
                      <label  htmlFor="fky_servico_saude" className="mt-margem">Serviço de Saúde:</label>
                      <select className="form-control" onChange={(e)=>setFkyServicoSaude(e.target.value)} name="fky_servico_saude" id="fky_servico_saude">
                      <option key="0" value="0"></option> {/*Insere uma linha vazia*/}
                        {renderComboServicoSaude()};
                      </select>  
                  
                    {/*Botão Adicionar*/}    
                      <button type='button' onClick={AdicionarServicoSaude} className="btn btn-light btn-adicionar">Adicionar</button>
                    </div>

                  {/*GridServisosSaude*/}  
                    <div>
                      <ListaRegistro registro={servico_saude} clickExcluirRegistro={fun_excluirservicosaude}/>              
                    </div>
                  </div>

                {/*Aba - Programas*/}
                  <div className="tab-pane fade" id="v-pills-programa" role="tabpanel" aria-labelledby="v-pills-programa-tab" tabindex="5">
                  {/*titulo Pergunta*/}  
                    <div className='input-group mt-margem'>
                        <label htmlFor='fky_programa_social' className='mt-margem'>Está inserido em algum programa social ou participa de alguma atividade/acompanhado por algum serviço da rede socioassistencial?</label>
                    </div>

                  {/*Programas*/}
                    <div className="input-group mt-margem">                      
                      <label  htmlFor="fky_programa_social" className="mt-margem">Programa Social:</label>
                      <select className="form-control" onChange={(e)=>setFkyProgramaSocial(e.target.value)} name="fky_programa_social" id="fky_programa_social">
                      <option key="0" value="0"></option> {/*Insere uma linha vazia*/}
                        {renderComboProgramaSocial()};
                      </select>  
                  
                    {/*Botão Adicionar*/}    
                      <button type='button' onClick={AdicionarProgramaSocial} className="btn btn-light btn-adicionar">Adicionar</button>
                    </div>

                  {/*GridProgramaSocial*/}  
                    <div>
                      <ListaRegistro registro={programa_social} clickExcluirRegistro={fun_excluirprogramasocial}/>              
                    </div>
                  </div>

                {/*Aba - Relato*/}
                  <div className="tab-pane fade" id="v-pills-relato" role="tabpanel" aria-labelledby="v-pills-relato-tab" tabindex="6">
                  {/*Historia de vida*/}
                    <label htmlFor="mem_relato_vida" className="mt-margem">Breve relato sobre a história de vida do idoso:</label>
                    <textarea rows="12" onChange={(e)=>setMemDadosResguardado(e.target.value)} value={mem_dados_resguardado} name="mem_relato_vida" id="mem_relato_vida"
                              className="form-control">
                    </textarea>  
                  </div>  
                </div>
              </div>
            </div> {/*Fecha Aba - Social*/}
          </div>
        </form>

      {/*Rodape*/}        
        <div>
          {/*Btn Cancelar e Btn Confirmar*/}
            <div className="text-center mt-margem">          
              <button type='button' onClick={Cancelar} className="btn btn-primary btn-acao">Cancelar </button>
              <button type='button' onClick={Editar}   className="btn btn-primary btn-acao">Confirmar</button>            
            </div>
            <small className="d-flex justify-content-center align-items-center text-secondary"> &copy; Desenvolvido por Suíte Sistemas</small>
          </div>
        {
          confirmado ?
            navigate('/pessoa') : null
        }       
        
      </div>
    :null}
    
  </div>
}

export default Pessoa_Edt;