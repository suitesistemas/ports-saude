import Menu                                       from '../../components/menu/index.jsx';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams }                 from 'react-router-dom';
import Axios                                      from "axios";
import ListaContato                               from '../../components/lista_contato/index.jsx';
import ListaRegistro                              from '../../components/lista_registro/index.jsx';
import ListaAnamnese                              from '../../components/lista_anamnese/index.jsx';
import { AuthContext }                            from "../../context/auth.jsx";
import dns_api                                    from '../../config/constante';
import anamnesePDF                                from '../../relatorios/paciente/anamnese.jsx';

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

//Paciente - Aba Social
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
  //SubAba - Tratamento 
  const[tratamento,               setTratamento]             = useState();
  const[fky_especialidade_medico, setFkyEspecialidadeMedico] = useState();
  //SubAba - Doenca 
  const[doenca,     setDoenca]    = useState();
  const[fky_doenca, setFkyDoenca] = useState();
  //SubAba - Vacina
  const[vacina,     setVacina]    = useState();
  const[fky_vacina, setFkyVacina] = useState();  
  const[num_dose,   setNumDose]   = useState();
  const[dat_dose,   setDatDose]   = useState();
  //SubAba - Servicos
  const[servico_saude,     setServicoSaude]    = useState();
  const[fky_servico_saude, setFkyServicoSaude] = useState();
  //SubAba Programas
  const[programa_social,     setProgramaSocial]    = useState();
  const[fky_programa_social, setFkyProgramaSocial] = useState();
  //SubAba Anamnese
  const[anamnese, setAnamnese] = useState();

  const[excluido_tratamento,      setExcluidoTratamento]     = useState();
  const[excluido_doenca,          setExcluidoDoenca]         = useState();
  const[excluido_vacina,          setExcluidoVacina]         = useState();
  const[excluido_servico_saude,   setExcluidoServicoSaude]   = useState();
  const[excluido_programa_social, setExcluidoProgramaSocial] = useState();
  const[excluido_anamnese,        setExcluidoAnamnese]       = useState();

  const[listar_tratamento,      setListarTratamento]     = useState();
  const[listar_doenca,          setListarDoenca]         = useState();
  const[listar_vacina,          setListarVacina]         = useState();
  const[listar_servico_saude,   setListarServicoSaude]   = useState();
  const[listar_programa_social, setListarProgramaSocial] = useState();
  const[listar_anamnese,        setListarAnamnese]       = useState();

  const[listar_especialidade_medico_combo, setListarEspecialidadeMedicoCombo] = useState();
  const[listar_doenca_combo,               setListarDoencaCombo]              = useState();
  const[listar_vacina_combo,               setListarVacinaCombo]              = useState();
  const[listar_servico_saude_combo,        setListarServicoSaudeCombo]        = useState();
  const[listar_programa_social_combo,      setListarProgramaSocialCombo]      = useState();

//Paciente - Aba Social - Saude 
  const[saude,     setSaude]    = useState();
  const[fky_saude, setFkySaude] = useState();
  
//Paciente - Aba Saude
  const[mem_diagnostico_medico,            setMemDiagnosticoMedico]           = useState('');
  const[mem_diagnostico_fisioterapico,     setMemDiagnosticoFisioterapico]    = useState('');
  const[mem_anamnese,                      setMemAnamnese]                    = useState('');   
  const[dsc_diagnostico_fisioterapico_qp,  setDscDiagnosticoFisioterapicoQp]  = useState('');
  const[dsc_diagnostico_fisioterapico_hma, setDscDiagnosticoFisioterapicoHma] = useState('');
  const[dsc_diagnostico_fisioterapico_hp,  setDscDiagnosticoFisioterapicoHp]  = useState('');
  const[dsc_diagnostico_fisioterapico_hf,  setDscDiagnosticoFisioterapicoHf]  = useState('');

//Paciente - Aba Fisico
  const[dsc_pressao_arterial,        setDscPressaoArterial]        = useState('');
  const[dsc_frequencia_cardiaca,     setDscFrequenciaCardiaca]     = useState('');
  const[dsc_frequencia_pulso,        setDscFrequenciaPulso]        = useState('');
  const[dsc_frequencia_respiratoria, setDscFrequenciaRespiratoria] = useState('');
  const[dsc_temperatura_corporal,    setDscTemperaturaCorporal]    = useState('');
  //SubAba - Postura
  const[flg_postura_cabeca,          setFlgPosturaCabeca]         = useState('');
  const[flg_postura_ombro,           setFlgPosturaOmbro]          = useState('');
  const[flg_postura_clavicula,       setFlgPosturaClavicula]      = useState('');
  const[flg_postura_cotovelo,        setFlgPosturaCotovelo]       = useState('');
  const[flg_postura_antebraco,       setFlgPosturaAntebraco]      = useState('');
  const[flg_postura_eias,            setFlgPosturaEias]           = useState('');
  const[flg_postura_joelho,          setFlgPosturaJoelho]         = useState('');
  const[flg_postura_patela,          setFlgPosturaPatela]         = useState('');
  const[flg_postura_pe,              setFlgPosturaPe]             = useState('');
  const[flg_postura_tornozelo,       setFlgPosturaTornozelo]      = useState('');
  const[flg_postura_coluna_cervical, setFlgPosturaColunaCervical] = useState('');
  const[flg_postura_coluna_toracica, setFlgPosturaColunaToracica] = useState('');
  const[flg_postura_coluna_lombar,   setFlgPosturaColunaLombar]   = useState('');
  //SubAba - Sistema Osteomioarticular
  const[flg_sistema_osteomioarticular, setFlgSistemaOsteomioarticular] = useState('');
  //SubAba - Tonus Muscular
  const[flg_tonus_muscular, setFlgTonusMuscular] = useState('');
  //subAba - Forca Muscular
  const[flg_forca_muscular_mmss, setFlgForcaMuscularMmss] = useState('');
  const[flg_forca_muscular_mmii, setFlgForcaMuscularMmii] = useState('');
  const[flg_amplitude_muscular,  setFlgAmplitudeMuscular] = useState('');
  const[dsc_adm_passiva_mmss,    setDscAdmPassivaMmss]    = useState('');
  const[dsc_adm_passiva_mmii,    setDscAdmPassivaMmii]    = useState('');
  const[dsc_adm_ativa_mmss,      setDscAdmAtivaMmss]      = useState('');
  const[dsc_adm_ativa_mmii,      setDscAdmAtivaMmii]      = useState('');
  //subAba - Sistema Tegumentar
  const[dsc_tegumentar_pele,          setDscTegumentarPele]          = useState('');
  const[flg_tegumentar_elasticidade,  setFlgTegumentarElasticidade]  = useState('');
  const[flg_tegumentar_desidratacao,  setFlgTegumentarDesidratacao]  = useState('');
  const[flg_tegumentar_mancha,        setFlgTegumentarMancha]        = useState('');
  const[dsc_local_mancha,             setDscLocalMancha]             = useState('');
  const[flg_tegumentar_coloracao,     setFlgTegumentarColoracao]     = useState('');
  const[dsc_local_coloracao,          setDscLocalColoracao]          = useState('');
  const[flg_tegumentar_temperatura,   setFlgTegumentarTemperatura]   = useState('');
  const[dsc_local_temperatura,        setDscLocalTemperatura]        = useState('');
  const[flg_tegumentar_sensibilidade, setFlgTegumentarSensibilidade] = useState('');
  const[dsc_local_sensibilidade,      setDscLocalSensibilidade]      = useState('');
  //subAba - Equilibrio Funcional
  const[dsc_equilibrio_mao_cabeca,    setDscEquilibrioMaoCabeca]   = useState('');
  const[dsc_equilibrio_mao_ombro,     setDscEquilibrioMaoOmbro]    = useState('');
  const[dsc_equilibrio_cruzar_perna,  setDscEquilibrioCruzarPerna] = useState('');
  //subAba - Coordenação
  const[dsc_coordenacao_msd,              setDscCoordenacaoMsd]             = useState('');
  const[dsc_coordenacao_mse,              setDscCoordenacaoMse]             = useState('');
  const[dsc_coordenacao_nariz_msd,        setDscCoordenacaoNarizMsd]        = useState('');
  const[dsc_coordenacao_nariz_mse,        setDscCoordenacaoNarizMse]        = useState('');
  const[dsc_coordenacao_motricidade_fina, setDscCoordenacaoMotricidadeFina] = useState('');
  const[dsc_coordenacao_alcance,          setDscCoordenacaoAlcance]         = useState('');
  const[dsc_coordenacao_preensao,         setDscCoordenacaoPreensao]        = useState('');
  const[dsc_coordenacao_manipulacao,      setDscCoordenacaoManipulacao]     = useState('');
  const[dsc_coordenacao_cognitivo,        setDscCoordenacaoCognitivo]       = useState('');
  const[dsc_coordenacao_psiquiatrico,     setDscCoordenacaoPsiquiatrico]    = useState('');
  const[dsc_coordenacao_psicologico,      setDscCoordenacaoPsicologico]     = useState('');

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

      {/*Aba Social*/}
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

      {/*Aba Saúde*/}
        setMemDiagnosticoMedico(          response.data[0].mem_diagnostico_medico);
        setMemDiagnosticoFisioterapico(   response.data[0].mem_diagnostico_fisioterapico);
        setMemAnamnese(                   response.data[0].mem_anamnese);
        setDscDiagnosticoFisioterapicoQp( response.data[0].dsc_diagnostico_fisioterapico_qp);
        setDscDiagnosticoFisioterapicoHma(response.data[0].dsc_diagnostico_fisioterapico_hma);
        setDscDiagnosticoFisioterapicoHp( response.data[0].dsc_diagnostico_fisioterapico_hp);
        setDscDiagnosticoFisioterapicoHf( response.data[0].dsc_diagnostico_fisioterapico_hf);

      {/*Aba Físico*/}
        setDscPressaoArterial(       response.data[0].dsc_pressao_arterial);
        setDscFrequenciaCardiaca(    response.data[0].dsc_frequencia_cardiaca);
        setDscFrequenciaPulso(       response.data[0].dsc_frequencia_pulso);
        setDscFrequenciaRespiratoria(response.data[0].dsc_frequencia_respiratoria);
        setDscTemperaturaCorporal(   response.data[0].dsc_temperatura_corporal);
        
        setFlgPosturaCabeca(        response.data[0].flg_postura_cabeca);
        setFlgPosturaOmbro(         response.data[0].flg_postura_ombro);
        setFlgPosturaClavicula(     response.data[0].flg_postura_clavicula);
        setFlgPosturaCotovelo(      response.data[0].flg_postura_cotovelo);
        setFlgPosturaAntebraco(     response.data[0].flg_postura_antebraco);
        setFlgPosturaEias(          response.data[0].flg_postura_eias);
        setFlgPosturaJoelho(        response.data[0].flg_postura_joelho);
        setFlgPosturaPatela(        response.data[0].flg_postura_patela);
        setFlgPosturaPe(            response.data[0].flg_postura_pe);
        setFlgPosturaTornozelo(     response.data[0].flg_postura_tornozelo);
        setFlgPosturaColunaCervical(response.data[0].flg_postura_coluna_cervical);
        setFlgPosturaColunaToracica(response.data[0].flg_postura_coluna_toracica);
        setFlgPosturaColunaLombar(  response.data[0].flg_postura_coluna_lombar);

        setFlgSistemaOsteomioarticular(response.data[0].flg_sistema_osteomioarticular);
        
        setFlgTonusMuscular(response.data[0].flg_tonus_muscular);

        setFlgForcaMuscularMmss(response.data[0].flg_forca_muscular_mmss);
        setFlgForcaMuscularMmii(response.data[0].flg_forca_muscular_mmii);
        setFlgAmplitudeMuscular(response.data[0].flg_amplitude_muscular);
        setDscAdmPassivaMmss(   response.data[0].dsc_adm_passiva_mmss);
        setDscAdmPassivaMmii(   response.data[0].dsc_adm_passiva_mmii);
        setDscAdmAtivaMmss(     response.data[0].dsc_adm_ativa_mmss);
        setDscAdmAtivaMmii(     response.data[0].dsc_adm_ativa_mmii);

        setDscTegumentarPele(         response.data[0].dsc_tegumentar_pele);
        setFlgTegumentarElasticidade( response.data[0].flg_tegumentar_elasticidade);
        setFlgTegumentarDesidratacao( response.data[0].flg_tegumentar_desidratacao);
        setFlgTegumentarMancha(       response.data[0].flg_tegumentar_mancha);
        setDscLocalMancha(            response.data[0].dsc_local_mancha);
        setFlgTegumentarColoracao(    response.data[0].flg_tegumentar_coloracao);
        setDscLocalColoracao(         response.data[0].dsc_local_coloracao);
        setFlgTegumentarTemperatura(  response.data[0].flg_tegumentar_temperatura);
        setDscLocalTemperatura(       response.data[0].dsc_local_temperatura);
        setFlgTegumentarSensibilidade(response.data[0].flg_tegumentar_sensibilidade);
        setDscLocalSensibilidade(     response.data[0].dsc_local_sensibilidade);

        setDscEquilibrioMaoCabeca(   response.data[0].dsc_equilibrio_mao_cabeca);
        setDscEquilibrioMaoOmbro(    response.data[0].dsc_equilibrio_mao_ombro);
        setDscEquilibrioCruzarPerna( response.data[0].dsc_equilibrio_cruzar_perna);

        setDscCoordenacaoMsd(            response.data[0].dsc_coordenacao_msd);
        setDscCoordenacaoMse(            response.data[0].dsc_coordenacao_mse);
        setDscCoordenacaoNarizMsd(       response.data[0].dsc_coordenacao_nariz_msd);
        setDscCoordenacaoNarizMse(       response.data[0].dsc_coordenacao_nariz_mse);
        setDscCoordenacaoMotricidadeFina(response.data[0].dsc_coordenacao_motricidade_fina);
        setDscCoordenacaoAlcance(        response.data[0].dsc_coordenacao_alcance);
        setDscCoordenacaoPreensao(       response.data[0].dsc_coordenacao_preensao);
        setDscCoordenacaoManipulacao(    response.data[0].dsc_coordenacao_manipulacao);
        setDscCoordenacaoCognitivo(      response.data[0].dsc_coordenacao_cognitivo);
        setDscCoordenacaoPsiquiatrico(   response.data[0].dsc_coordenacao_psiquiatrico);
        setDscCoordenacaoPsicologico(    response.data[0].dsc_coordenacao_psicologico);
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

//Listar as Anamneses da Pessoa
  useEffect(() => {    
    fun_listar_anamnese().then((response) =>{
      setAnamnese(response.data);
    })      
  }, [listar_anamnese, excluido_anamnese]);

  async function fun_listar_anamnese(){
    return await Axios.get(apiUrl + "/pessoa/anamnese/listar/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa);
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

  //Imprimir Anamnese  
  function fun_imprimiranamnese(mem_anamnese){
    anamnesePDF(mem_anamnese, nomepessoa);    
  };

  //Excluir Anamnese - Nao sendo usando por enquanto  
  function fun_excluiranamnese(cod_seq_anamnese){
    let codigo = cod_seq_anamnese;
        
    fun_excluindoanamnese(cod_seq_anamnese).then((response) =>{
      setExcluidoAnamnese(codigo);
    });    
  };

  async function fun_excluindoanamnese(cod_seq_anamnese){
    return await Axios.delete(apiUrl + "/pessoa/anamnese/excluir/" + localStorage.getItem("cod_conta") + '/' + cod_pessoa + '/' + cod_seq_anamnese);
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

//Inserir Anamnese
  function AdicionarAnamnese(){
    AdicionandoAnamnese().then((response)=>{
      console.log(response);      
      setListarAnamnese(response); //Retornando o insertid    
    });

    return;
  }

  async function AdicionandoAnamnese(){    
    let response = await Axios.post(apiUrl + "/pessoa/anamnese/inserir/" + localStorage.getItem("cod_conta"),
    {
      fky_paciente: cod_pessoa,
      mem_anamnese: mem_anamnese
    });

    return response;
  }

  async function AdicionandoProgramaSocial(){
    let response = await Axios.post(apiUrl + "/pessoa/programa_social/inserir/" + localStorage.getItem("cod_conta"),
    {
      fky_paciente:        cod_pessoa,
      fky_programa_social: fky_programa_social
    });
    
    return response;
  }

//Dados Pessoa
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

    //Aba Social
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
      num_cartao_sus:            num_cartao_sus,

    //Aba Saude
      mem_diagnostico_medico:            mem_diagnostico_medico,
      mem_diagnostico_fisioterapico:     mem_diagnostico_fisioterapico,
      mem_anamnese:                      mem_anamnese,
      dsc_diagnostico_fisioterapico_qp:  dsc_diagnostico_fisioterapico_qp,
      dsc_diagnostico_fisioterapico_hma: dsc_diagnostico_fisioterapico_hma,
      dsc_diagnostico_fisioterapico_hp:  dsc_diagnostico_fisioterapico_hp,
      dsc_diagnostico_fisioterapico_hf:  dsc_diagnostico_fisioterapico_hf,

    //Aba Fisico
      dsc_pressao_arterial:        dsc_pressao_arterial,
      dsc_frequencia_cardiaca:     dsc_frequencia_cardiaca,
      dsc_frequencia_pulso:        dsc_frequencia_pulso,
      dsc_frequencia_respiratoria: dsc_frequencia_respiratoria,
      dsc_temperatura_corporal:    dsc_temperatura_corporal,
      
      flg_postura_cabeca:          flg_postura_cabeca,
      flg_postura_ombro:           flg_postura_ombro,
      flg_postura_clavicula:       flg_postura_clavicula,
      flg_postura_cotovelo:        flg_postura_cotovelo,
      flg_postura_antebraco:       flg_postura_antebraco,
      flg_postura_eias:            flg_postura_eias,
      flg_postura_joelho:          flg_postura_joelho,
      flg_postura_patela:          flg_postura_patela,
      flg_postura_pe:              flg_postura_pe,
      flg_postura_tornozelo:       flg_postura_tornozelo,
      flg_postura_coluna_cervical: flg_postura_coluna_cervical,
      flg_postura_coluna_toracica: flg_postura_coluna_toracica,
      flg_postura_coluna_lombar:   flg_postura_coluna_lombar,

      flg_sistema_osteomioarticular: flg_sistema_osteomioarticular,

      flg_tonus_muscular: flg_tonus_muscular,

      flg_forca_muscular_mmss: flg_forca_muscular_mmss,
      flg_forca_muscular_mmii: flg_forca_muscular_mmii,
      flg_amplitude_muscular:  flg_amplitude_muscular,
      dsc_adm_passiva_mmss:    dsc_adm_passiva_mmss,
      dsc_adm_passiva_mmii:    dsc_adm_passiva_mmii,
      dsc_adm_ativa_mmss:      dsc_adm_ativa_mmss,
      dsc_adm_ativa_mmii:      dsc_adm_ativa_mmii,
      
      dsc_tegumentar_pele:          dsc_tegumentar_pele,
      flg_tegumentar_elasticidade:  flg_tegumentar_elasticidade,
      flg_tegumentar_desidratacao:  flg_tegumentar_desidratacao,
      flg_tegumentar_mancha:        flg_tegumentar_mancha,
      dsc_local_mancha:             dsc_local_mancha,
      flg_tegumentar_coloracao:     flg_tegumentar_coloracao,
      dsc_local_coloracao:          dsc_local_coloracao,
      flg_tegumentar_temperatura:   flg_tegumentar_temperatura,
      dsc_local_temperatura:        dsc_local_temperatura,
      flg_tegumentar_sensibilidade: flg_tegumentar_sensibilidade,
      dsc_local_sensibilidade:      dsc_local_sensibilidade,

      dsc_equilibrio_mao_cabeca:   dsc_equilibrio_mao_cabeca,
      dsc_equilibrio_mao_ombro:    dsc_equilibrio_mao_ombro,
      dsc_equilibrio_cruzar_perna: dsc_equilibrio_cruzar_perna,

      dsc_coordenacao_msd:              dsc_coordenacao_msd,
      dsc_coordenacao_mse:              dsc_coordenacao_mse,
      dsc_coordenacao_nariz_msd:        dsc_coordenacao_nariz_msd,
      dsc_coordenacao_nariz_mse:        dsc_coordenacao_nariz_mse,
      dsc_coordenacao_motricidade_fina: dsc_coordenacao_motricidade_fina,
      dsc_coordenacao_alcance:          dsc_coordenacao_alcance,
      dsc_coordenacao_preensao:         dsc_coordenacao_preensao,
      dsc_coordenacao_manipulacao:      dsc_coordenacao_manipulacao,
      dsc_coordenacao_cognitivo:        dsc_coordenacao_cognitivo,
      dsc_coordenacao_psiquiatrico:     dsc_coordenacao_psiquiatrico,
      dsc_coordenacao_psicologico:      dsc_coordenacao_psicologico
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
              <button className="nav-link" id="contato-tab" data-bs-toggle="tab" data-bs-target="#contato-tab-pane" type="button" role="tab" aria-controls="contato-tab-pane" aria-selected="false">Familiar</button>
              </li>
              : null
            }

          {/*Aba Específicos*/} 
            {
              flg_tipo_cadastro === "P" ? //Paciente 
              <li className="nav-item" role="presentation">
              <button className="nav-link" id="especifico-tab" data-bs-toggle="tab" data-bs-target="#especifico-tab-pane" type="button" role="tab" aria-controls="especifico-tab-pane" aria-selected="false">Específicos</button>
              </li>
              : null
            }

          {/*Aba Resguardados*/} 
            {
              flg_tipo_cadastro === "P" && localStorage.getItem("user_flg_visualizar_resguardado") === "S" ? //Paciente 
              <li className="nav-item" role="presentation">
              <button className="nav-link" id="resguardado-tab" data-bs-toggle="tab" data-bs-target="#resguardado-tab-pane" type="button" role="tab" aria-controls="resguardado-tab-pane" aria-selected="false">Resguardados</button>
              </li>
              : null
            } 

          {/*Aba Social*/} 
            {
              flg_tipo_cadastro === "P" ? //Paciente 
              <li className="nav-item" role="presentation">
              <button className="nav-link" id="social-tab" data-bs-toggle="tab" data-bs-target="#social-tab-pane" type="button" role="tab" aria-controls="social-tab-pane" aria-selected="false">Social</button>
              </li>
              :null
            }

          {/*Aba Saúde*/} 
            {
              flg_tipo_cadastro === "P" ? //Paciente 
              <li className="nav-item" role="presentation">
              <button className="nav-link" id="saude-tab" data-bs-toggle="tab" data-bs-target="#saude-tab-pane" type="button" role="tab" aria-controls="saude-tab-pane" aria-selected="false">Saúde</button>
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
                  <option value="P">Residente  </option>
                  <option value="C">Colaborador</option>
                  <option value="F">Fornecedor </option>
                  <option value="N">Familiar   </option>
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
            <div className="tab-pane fade" id="contato-tab-pane" role="tabpanel" aria-labelledby="contato-tab" tabIndex="2">
            
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
                <label  htmlFor="fky_contato" className="mt-margem">Familiar:</label>
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
            <div className="tab-pane fade" id="especifico-tab-pane" role="tabpanel" aria-labelledby="especifico-tab" tabIndex="3">

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
                     <label htmlFor="dsc_condicao_habitual" className="mt-margem">Quais são as condições de habitualidade/socialização do residente: higiene, organização, convívio social, relacionamento familiar, com vizinhos, etc..</label>
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
                      <label htmlFor='fky_doenca' className='mt-margem'>Relatar as doenças que acometem o residente:</label>
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
                      <label htmlFor='fky_vacina' className='mt-margem'>Informe as vacinas que o residente já tomou:</label>
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

          {/*Aba - Saude*/}    
            <div className="tab-pane fade" id="saude-tab-pane" role="tabpanel" aria-labelledby="saude-tab" tabIndex="6">
            {/*Page Vertical*/}
              <div className="d-flex align-items-start">

              {/*Page Titulos*/}
                <div className="nav flex-column nav-pills me-3 mt-page" id="v-pills-saude-tab" role="tablist" aria-orientation="vertical">
                  <button className="nav-link active" id="v-pills-saude-medico-tab"        data-bs-toggle="pill" data-bs-target="#v-pills-saude-medico"        type="button" role="tab" aria-controls="v-pills-saude-medico"        aria-selected="true">Médico</button>
                  <button className="nav-link"        id="v-pills-saude-fisioterapico-tab" data-bs-toggle="pill" data-bs-target="#v-pills-saude-fisioterapico" type="button" role="tab" aria-controls="v-pills-saude-fisioterapico" aria-selected="false">Fisioterápico</button>                  
                  <button className="nav-link"        id="v-pills-saude-fisico-tab"        data-bs-toggle="pill" data-bs-target="#v-pills-saude-fisico"        type="button" role="tab" aria-controls="v-pills-saude-fisico"        aria-selected="false">Fisico</button>
                  <button className="nav-link"        id="v-pills-saude-anamnese-tab"      data-bs-toggle="pill" data-bs-target="#v-pills-saude-anamnese"      type="button" role="tab" aria-controls="v-pills-saude-fisioterapico" aria-selected="false">Anamnese</button>                  
                </div>

              {/*Page Dados*/}  
                <div className="tab-content container-fluid" id="v-pills-saude-tabContent">

                {/*Aba - Medico*/}
                  <div className="tab-pane fade show active" id="v-pills-saude-medico" role="tabpanel" aria-labelledby="v-pills-saude-medico-tab" tabindex="0">                    
                  {/*Diagnóstico Médico*/}  
                    <label htmlFor="mem_diagnostico_medico" className="mt-margem">Diagnóstico Médico:</label>
                    <textarea rows="13" onChange={(e)=>setMemDiagnosticoMedico(e.target.value)} value={mem_diagnostico_medico} name="mem_diagnostico_medico" id="mem_diagnostico_medico" className="form-control"></textarea>
                  </div> {/*Fecha Aba - Médico*/}

                {/*Aba - Fisioterapico*/}
                  <div className="tab-pane fade" id="v-pills-saude-fisioterapico" role="tabpanel" aria-labelledby="v-pills-saude-fisioterapico-tab" tabindex="1">
                  {/*Diagnóstico Fisioterápico*/}  
                    <label htmlFor="mem_diagnostico_fisioterapico" className="mt-margem">Diagnóstico Fisioterápico:</label>
                    <textarea rows="11" onChange={(e)=>setMemDiagnosticoFisioterapico(e.target.value)} value={mem_diagnostico_fisioterapico} name="mem_diagnostico_fisioterapico" id="mem_diagnostico_fisioterapico" className="form-control"></textarea>

                    <div className="input-group mt-margem">              
                    {/*Cartão SUS*/}  
                      <label htmlFor="dsc_diagnostico_fisioterapico_qp" className="mt-margem">QP:</label>
                      <input onChange={(e)=>setDscDiagnosticoFisioterapicoQp(e.target.value)} value={dsc_diagnostico_fisioterapico_qp} type="text" name="dsc_diagnostico_fisioterapico_qp" id="dsc_diagnostico_fisioterapico_qp" className="form-control mt-margem-input-ref"/>
                    {/*Uso de Medicamento*/}  
                      <label htmlFor="dsc_diagnostico_fisioterapico_hma" className="mt-margem">HMA:</label>
                      <input onChange={(e)=>setDscDiagnosticoFisioterapicoHma(e.target.value)} value={dsc_diagnostico_fisioterapico_hma} type="text" name="dsc_diagnostico_fisioterapico_hma" id="dsc_diagnostico_fisioterapico_hma" className="form-control mt-margem-input-ref"/>
                    {/*Cartão SUS*/}  
                      <label htmlFor="dsc_diagnostico_fisioterapico_hp" className="mt-margem">HP:</label>
                      <input onChange={(e)=>setDscDiagnosticoFisioterapicoHp(e.target.value)} value={dsc_diagnostico_fisioterapico_hp} type="text" name="dsc_diagnostico_fisioterapico_hp" id="dsc_diagnostico_fisioterapico_hp" className="form-control mt-margem-input-ref"/>
                    {/*Cartão SUS*/}  
                      <label htmlFor="dsc_diagnostico_fisioterapico_hf" className="mt-margem">HF:</label>
                      <input onChange={(e)=>setDscDiagnosticoFisioterapicoHf(e.target.value)} value={dsc_diagnostico_fisioterapico_hf} type="text" name="dsc_diagnostico_fisioterapico_hf" id="dsc_diagnostico_fisioterapico_hf" className="form-control mt-margem-input-ref"/>                    
                    </div>
                  </div>

                {/*Aba - Fisico*/}
                  <div className="tab-pane fade" id="v-pills-saude-fisico" role="tabpanel" aria-labelledby="v-pills-saude-fisico-tab" tabindex="2">
                  {/*SubAba - Dados Vitais*/}
                    <br></br>
                    <center><h6 className="mt-margem align_center">Dados Vitais</h6></center>
                  {/*PA (Pressão Arterial)*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_pressao_arterial" className="mt-margem">PA (Pressão Arterial):</label>
                      <input onChange={(e)=>setDscPressaoArterial(e.target.value)} value={dsc_pressao_arterial} type="text" name="dsc_pressao_arterial" id="dsc_pressao_arterial" className="form-control mt-margem-input-ref"/>
                    </div>                  
                  {/*FC (Frequência Cardíaca)*/}  
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_frequencia_cardiaca" className="mt-margem">FC (Frequência Cardíaca):</label>
                      <input onChange={(e)=>setDscFrequenciaCardiaca(e.target.value)} value={dsc_frequencia_cardiaca} type="text" name="dsc_frequencia_cardiaca" id="dsc_frequencia_cardiaca" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*FP (Frequência Pulso)*/}  
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_frequencia_pulso" className="mt-margem">FP (Frequência Pulso):</label>
                      <input onChange={(e)=>setDscFrequenciaPulso(e.target.value)} value={dsc_frequencia_pulso} type="text" name="dsc_frequencia_pulso" id="dsc_frequencia_pulso" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*FR (Frequência Respiratório)*/}  
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_frequencia_respiratoria" className="mt-margem">FR (Frequência Respiratória):</label>
                      <input onChange={(e)=>setDscFrequenciaRespiratoria(e.target.value)} value={dsc_frequencia_respiratoria} type="text" name="dsc_frequencia_respiratoria" id="dsc_frequencia_respiratoria" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*TC (Temperatura Corporal)*/}  
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_temperatura_corporal" className="mt-margem">TC (Temperatura Corporal):</label>
                      <input onChange={(e)=>setDscTemperaturaCorporal(e.target.value)} value={dsc_temperatura_corporal} type="text" name="dsc_temperatura_corporal" id="dsc_temperatura_corporal" className="form-control mt-margem-input-ref"/>
                    </div>

                  {/*SubAba - Postura*/}
                    <br></br>
                    <center><h6 className="mt-margem align_center">Postura</h6></center>
                  {/*Postura da Cabeça*/}
                    <div className="mt-margem">
                      <h6 >Cabeça:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaCabeca('A')} value="" name="flg_postura_cabeca" id="flg_postura_cabeca_a" checked={flg_postura_cabeca=='A'}/>
                        <label className="form-check-label" for="flg_postura_cabeca_a">
                        Alinhada
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaCabeca('R')} value="" name="flg_postura_cabeca" id="flg_postura_cabeca_r" checked={flg_postura_cabeca=='R'}/>
                        <label className="form-check-label" for="flg_postura_cabeca_r">
                        Rodada
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaCabeca('I')} value="" name="flg_postura_cabeca" id="flg_postura_cabeca_i" checked={flg_postura_cabeca=='I'}/>
                        <label className="form-check-label" for="flg_postura_cabeca_i">
                        Inclinada
                        </label>
                      </div>                        
                    </div>
                  {/*Postura da Ombro*/}
                    <div className="mt-margem">
                      <h6 >Ombro:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaOmbro('A')} value="" name="flg_postura_ombro" id="flg_postura_ombro_a" checked={flg_postura_ombro=='A'}/>
                        <label className="form-check-label" for="flg_postura_ombro_a">
                        Alinhado
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaOmbro('E')} value="" name="flg_postura_ombro" id="flg_postura_ombro_e" checked={flg_postura_ombro=='E'}/>
                        <label className="form-check-label" for="flg_postura_ombro_e">
                        Elevado D/E
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaOmbro('D')} value="" name="flg_postura_ombro" id="flg_postura_ombro_d" checked={flg_postura_ombro=='D'}/>
                        <label className="form-check-label" for="flg_postura_ombro_d">
                        Deprimido D/E
                        </label>
                      </div>                        
                    </div>
                  {/*Postura da Clavícula*/}
                    <div className="mt-margem">
                      <h6 >Clavícula:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaClavicula('A')} value="" name="flg_postura_clavicula" id="flg_postura_clavicula_a" checked={flg_postura_clavicula=='A'}/>
                        <label className="form-check-label" for="flg_postura_clavicula_a">
                        Alinhada
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaClavicula('E')} value="" name="flg_postura_clavicula" id="flg_postura_clavicula_e" checked={flg_postura_clavicula=='E'}/>
                        <label className="form-check-label" for="flg_postura_clavicula_e">
                        Elevada D/E
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaClavicula('S')} value="" name="flg_postura_clavicula" id="flg_postura_clavicula_s" checked={flg_postura_clavicula=='S'}/>
                        <label className="form-check-label" for="flg_postura_clavicula_s">
                        Saliente D/E
                        </label>
                      </div>                        
                    </div>
                  {/*Postura do Cotovelo*/}
                    <div className="mt-margem">
                      <h6 >Cotovelo:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaCotovelo('A')} value="" name="flg_postura_cotovelo" id="flg_postura_cotovelo_a" checked={flg_postura_cotovelo=='A'}/>
                        <label className="form-check-label" for="flg_postura_cotovelo_a">
                        Alinhado
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaCotovelo('V')} value="" name="flg_postura_cotovelo" id="flg_postura_cotovelo_v" checked={flg_postura_cotovelo=='V'}/>
                        <label className="form-check-label" for="flg_postura_cotovelo_v">
                        Valgo D/E
                        </label>
                      </div>                                                
                    </div> 
                  {/*Postura do Antebraço*/}
                    <div className="mt-margem">
                      <h6 >Antebraço:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaAntebraco('N')} value="" name="flg_postura_antebraco" id="flg_postura_antebraco_n" checked={flg_postura_antebraco=='N'}/>
                        <label className="form-check-label" for="flg_postura_antebraco_n">
                        Neutros
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaAntebraco('P')} value="" name="flg_postura_antebraco" id="flg_postura_antebraco_p" checked={flg_postura_antebraco=='P'}/>
                        <label className="form-check-label" for="flg_postura_antebraco_p">
                        Pronados D/E
                        </label>
                      </div>                                                
                    </div>
                  {/*Postura EIAS*/}
                    <div className="mt-margem">
                      <h6 >EIAS:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaEias('A')} value="" name="flg_postura_eias" id="flg_postura_eias_a" checked={flg_postura_eias=='A'}/>
                        <label className="form-check-label" for="flg_postura_eias_a">
                        Alinhada
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaEias('M')} value="" name="flg_postura_eias" id="flg_postura_eias_m" checked={flg_postura_eias=='M'}/>
                        <label className="form-check-label" for="flg_postura_eias_m">
                        Mais baixa D/E
                        </label>
                      </div>                                                
                    </div>
                  {/*Postura Joelhos*/}
                    <div className="mt-margem">
                      <h6 >Joelhos:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaJoelho('A')} value="" name="flg_postura_joelho" id="flg_postura_joelho_a" checked={flg_postura_joelho=='A'}/>
                        <label className="form-check-label" for="flg_postura_joelho_a">
                        Alinhados
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaJoelho('V')} value="" name="flg_postura_joelho" id="flg_postura_joelho_v" checked={flg_postura_joelho=='V'}/>
                        <label className="form-check-label" for="flg_postura_joelho_v">
                        Valgos
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaJoelho('R')} value="" name="flg_postura_joelho" id="flg_postura_joelho_r" checked={flg_postura_joelho=='R'}/>
                        <label className="form-check-label" for="flg_postura_joelho_r">
                        Varo
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaJoelho('M')} value="" name="flg_postura_joelho" id="flg_postura_joelho_m" checked={flg_postura_joelho=='M'}/>
                        <label className="form-check-label" for="flg_postura_joelho_m">
                        R. Medial
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaJoelho('L')} value="" name="flg_postura_joelho" id="flg_postura_joelho_l" checked={flg_postura_joelho=='L'}/>
                        <label className="form-check-label" for="flg_postura_joelho_l">
                        R. Lateral
                        </label>
                      </div>
                    </div>
                  {/*Postura Patela*/}
                    <div className="mt-margem">
                      <h6 >Patela:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaPatela('A')} value="" name="flg_postura_patela" id="flg_postura_patela_a" checked={flg_postura_patela=='A'}/>
                        <label className="form-check-label" for="flg_postura_patela_a">
                        Alinhadas
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaPatela('L')} value="" name="flg_postura_patela" id="flg_postura_patela_l" checked={flg_postura_patela=='L'}/>
                        <label className="form-check-label" for="flg_postura_patela_l">
                        Lateralizadas D/E
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaPatela('M')} value="" name="flg_postura_patela" id="flg_postura_patela_m" checked={flg_postura_patela=='M'}/>
                        <label className="form-check-label" for="flg_postura_patela_m">
                        Medializadas D/E
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaPatela('E')} value="" name="flg_postura_patela" id="flg_postura_patela_e" checked={flg_postura_patela=='E'}/>
                        <label className="form-check-label" for="flg_postura_patela_e">
                        Elevada D/E
                        </label>
                      </div>
                    </div>
                  {/*Postura Pé*/}
                    <div className="mt-margem">
                      <h6 >Pé:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaPe('A')} value="" name="flg_postura_pe" id="flg_postura_pe_a" checked={flg_postura_pe=='A'}/>
                        <label className="form-check-label" for="flg_postura_pe_a">
                        Alinhados
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaPe('V')} value="" name="flg_postura_pe" id="flg_postura_pe_v" checked={flg_postura_pe=='V'}/>
                        <label className="form-check-label" for="flg_postura_pe_v">
                        Valgo D/E
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaPe('R')} value="" name="flg_postura_pe" id="flg_postura_pe_r" checked={flg_postura_pe=='R'}/>
                        <label className="form-check-label" for="flg_postura_pe_r">
                        Varo D/E
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaPe('P')} value="" name="flg_postura_pe" id="flg_postura_pe_p" checked={flg_postura_pe=='P'}/>
                        <label className="form-check-label" for="flg_postura_pe_p">
                        Plano
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaPe('C')} value="" name="flg_postura_pe" id="flg_postura_pe_c" checked={flg_postura_pe=='C'}/>
                        <label className="form-check-label" for="flg_postura_pe_c">
                        Cavo
                        </label>
                      </div>
                    </div>
                  {/*Postura da Tornozelo*/}
                    <div className="mt-margem">
                      <h6 >Tornozelo:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaTornozelo('A')} value="" name="flg_postura_tornozelo" id="flg_postura_tornozelo_a" checked={flg_postura_tornozelo=='A'}/>
                        <label className="form-check-label" for="flg_postura_tornozelo_a">
                        Alinhado
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaTornozelo('V')} value="" name="flg_postura_tornozelo" id="flg_postura_tornozelo_v" checked={flg_postura_tornozelo=='V'}/>
                        <label className="form-check-label" for="flg_postura_tornozelo_v">
                        Valgo D/E
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaTornozelo('R')} value="" name="flg_postura_tornozelo" id="flg_postura_tornozelo_r" checked={flg_postura_tornozelo=='R'}/>
                        <label className="form-check-label" for="flg_postura_tornozelo_r">
                        Varo D/E
                        </label>
                      </div>                        
                    </div>
                  {/*Postura da Coluna Cervical*/}
                    <div className="mt-margem">
                      <h6 >Coluna Cervical:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaColunaCervical('R')} value="" name="flg_postura_coluna_cervical" id="flg_postura_coluna_cervical_r" checked={flg_postura_coluna_cervical=='R'}/>
                        <label className="form-check-label" for="flg_postura_coluna_cervical_r">
                        Retificada
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaColunaCervical('N')} value="" name="flg_postura_coluna_cervical" id="flg_postura_coluna_cervical_n" checked={flg_postura_coluna_cervical=='N'}/>
                        <label className="form-check-label" for="flg_postura_coluna_cervical_n">
                        Normal
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaColunaCervical('H')} value="" name="flg_postura_coluna_cervical" id="flg_postura_coluna_cervical_h" checked={flg_postura_coluna_cervical=='H'}/>
                        <label className="form-check-label" for="flg_postura_coluna_cervical_h">
                        Hiperlordose
                        </label>
                      </div>                        
                    </div>
                  {/*Postura da Coluna Torácica*/}
                    <div className="mt-margem">
                      <h6 >Coluna Torácica:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaColunaToracica('R')} value="" name="flg_postura_coluna_toracica" id="flg_postura_coluna_toracica_r" checked={flg_postura_coluna_toracica=='R'}/>
                        <label className="form-check-label" for="flg_postura_coluna_toracica_r">
                        Retificada
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaColunaToracica('N')} value="" name="flg_postura_coluna_toracica" id="flg_postura_coluna_toracica_n" checked={flg_postura_coluna_toracica=='N'}/>
                        <label className="form-check-label" for="flg_postura_coluna_toracica_n">
                        Normal
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaColunaToracica('H')} value="" name="flg_postura_coluna_toracica" id="flg_postura_coluna_toracica_h" checked={flg_postura_coluna_toracica=='H'}/>
                        <label className="form-check-label" for="flg_postura_coluna_toracica_h">
                        Hipercifose
                        </label>
                      </div>                        
                    </div>
                  {/*Postura da Coluna Lombar*/}
                    <div className="mt-margem">
                      <h6 >Coluna Lombar:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaColunaLombar('R')} value="" name="flg_postura_coluna_lombar" id="flg_postura_coluna_lombar_r" checked={flg_postura_coluna_lombar=='R'}/>
                        <label className="form-check-label" for="flg_postura_coluna_lombar_r">
                        Retificada
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaColunaLombar('N')} value="" name="flg_postura_coluna_lombar" id="flg_postura_coluna_lombar_n" checked={flg_postura_coluna_lombar=='N'}/>
                        <label className="form-check-label" for="flg_postura_coluna_lombar_n">
                        Normal
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgPosturaColunaLombar('H')} value="" name="flg_postura_coluna_lombar" id="flg_postura_coluna_lombar_h" checked={flg_postura_coluna_lombar=='H'}/>
                        <label className="form-check-label" for="flg_postura_coluna_lombar_h">
                        Hiperlordose
                        </label>
                      </div>                        
                    </div>

                  {/*SubAba - Sistema Osteomioarticular*/}
                    <br></br>
                    <center><h6 className="mt-margem align_center">Sistema Osteomioarticular</h6></center>
                  {/*Sistema Osteomioarticular*/}
                    <div className="mt-margem">                      
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgSistemaOsteomioarticular('V')} value="" name="flg_sistema_osteomioarticular" id="flg_sistema_osteomioarticular_v" checked={flg_sistema_osteomioarticular=='V'}/>
                      <label className="form-check-label" for="flg_sistema_osteomioarticular_v">
                        Voluntário
                      </label>
                      </div>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgSistemaOsteomioarticular('I')} value="" name="flg_sistema_osteomioarticular" id="flg_sistema_osteomioarticular_i" checked={flg_sistema_osteomioarticular=='I'}/>
                      <label className="form-check-label" for="flg_sistema_osteomioarticular_i">
                        Involuntário
                      </label>
                      </div>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgSistemaOsteomioarticular('P')} value="" name="flg_sistema_osteomioarticular" id="flg_sistema_osteomioarticular_p" checked={flg_sistema_osteomioarticular=='P'}/>
                      <label className="form-check-label" for="flg_sistema_osteomioarticular_p">
                        Plégia
                      </label>
                      </div>                        
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgSistemaOsteomioarticular('A')} value="" name="flg_sistema_osteomioarticular" id="flg_sistema_osteomioarticular_a" checked={flg_sistema_osteomioarticular=='A'}/>
                      <label className="form-check-label" for="flg_sistema_osteomioarticular_a">
                        Paresia
                      </label>
                      </div>  
                    </div>

                  {/*SubAba - Tônus Muscular*/}
                     <br></br>
                     <center><h6 className="mt-margem align_center">Tônus Muscular</h6></center>  
                  {/*Tônus Muscular*/}                    
                    <div className="mt-margem">                      
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTonusMuscular('H')} value="" name="flg_tonus_muscular" id="flg_tonus_muscular_h" checked={flg_tonus_muscular=='H'}/>
                      <label className="form-check-label" for="flg_tonus_muscular_h">
                        Hipertrofia
                      </label>
                      </div>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTonusMuscular('E')} value="" name="flg_tonus_muscular" id="flg_tonus_muscular_e" checked={flg_tonus_muscular=='E'}/>
                      <label className="form-check-label" for="flg_tonus_muscular_e">
                        Espaticidade
                      </label>
                      </div>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTonusMuscular('R')} value="" name="flg_tonus_muscular" id="flg_tonus_muscular_r" checked={flg_tonus_muscular=='R'}/>
                      <label className="form-check-label" for="flg_tonus_muscular_r">
                        Rigidez
                      </label>
                      </div>                        
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTonusMuscular('I')} value="" name="flg_tonus_muscular" id="flg_tonus_muscular_i" checked={flg_tonus_muscular=='I'}/>
                      <label className="form-check-label" for="flg_tonus_muscular_i">
                        Hipotomia
                      </label>
                      </div>  
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTonusMuscular('A')} value="" name="flg_tonus_muscular" id="flg_tonus_muscular_a" checked={flg_tonus_muscular=='A'}/>
                      <label className="form-check-label" for="flg_tonus_muscular_a">
                        Atrofia
                      </label>
                      </div>
                    </div>

                  {/*SubAba - Força Muscular*/}
                    <br></br>
                    <center><h6 className="mt-margem align_center">Força Muscular</h6></center>
                  {/*MMSS*/}
                    <div className="mt-margem">
                      <h6 >MMSS:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgForcaMuscularMmss('N')} value="" name="flg_forca_muscular_mmss" id="flg_forca_muscular_mmss_n" checked={flg_forca_muscular_mmss=='N'}/>
                        <label className="form-check-label" for="flg_forca_muscular_mmss_n">
                        Normal
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgForcaMuscularMmss('D')} value="" name="flg_forca_muscular_mmss" id="flg_forca_muscular_mmss_d" checked={flg_forca_muscular_mmss=='D'}/>
                        <label className="form-check-label" for="flg_forca_muscular_mmss_d">
                        Diminuída
                        </label>
                      </div>                                                
                    </div>
                  {/*MMII*/}
                    <div className="mt-margem">
                      <h6 >MMII:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgForcaMuscularMmii('N')} value="" name="flg_forca_muscular_mmii" id="flg_forca_muscular_mmii_n" checked={flg_forca_muscular_mmii=='N'}/>
                        <label className="form-check-label" for="flg_forca_muscular_mmii_n">
                        Normal
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgForcaMuscularMmii('D')} value="" name="flg_forca_muscular_mmii" id="flg_forca_muscular_mmii_d" checked={flg_forca_muscular_mmii=='D'}/>
                        <label className="form-check-label" for="flg_forca_muscular_mmii_d">
                        Diminuída
                        </label>
                      </div>                                                
                    </div>
                  {/*Amplitude Muscular*/}
                    <div className="mt-margem">
                      <h6 >Amplitude Muscular:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgAmplitudeMuscular('N')} value="" name="flg_amplitude_muscular" id="flg_amplitude_muscular_n" checked={flg_amplitude_muscular=='N'}/>
                        <label className="form-check-label" for="flg_amplitude_muscular_n">
                        Normal
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgAmplitudeMuscular('D')} value="" name="flg_amplitude_muscular" id="flg_amplitude_muscular_d" checked={flg_amplitude_muscular=='D'}/>
                        <label className="form-check-label" for="flg_amplitude_muscular_d">
                        Diminuída
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgAmplitudeMuscular('R')} value="" name="flg_amplitude_muscular" id="flg_amplitude_muscular_r" checked={flg_amplitude_muscular=='R'}/>
                        <label className="form-check-label" for="flg_amplitude_muscular_r">
                        Rigidez
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgAmplitudeMuscular('F')} value="" name="flg_amplitude_muscular" id="flg_amplitude_muscular_f" checked={flg_amplitude_muscular=='F'}/>
                        <label className="form-check-label" for="flg_amplitude_muscular_f">
                        Fratura
                        </label>
                      </div>
                    </div>
                  {/*ADM Passiva MMSS*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_adm_passiva_mmss" className="mt-margem">ADM Passiva MMSS:</label>
                      <input onChange={(e)=>setDscAdmPassivaMmss(e.target.value)} value={dsc_adm_passiva_mmss} type="text" name="dsc_adm_passiva_mmss" id="dsc_adm_passiva_mmss" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*ADM Passiva MMII*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_adm_passiva_mmii" className="mt-margem">ADM Passiva MMII:</label>
                      <input onChange={(e)=>setDscAdmPassivaMmii(e.target.value)} value={dsc_adm_passiva_mmii} type="text" name="dsc_adm_passiva_mmii" id="dsc_adm_passiva_mmii" className="form-control mt-margem-input-ref"/>
                    </div>                    
                  {/*ADM Ativa MMSS*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_adm_ativa_mmss" className="mt-margem">ADM Ativa MMSS:</label>
                      <input onChange={(e)=>setDscAdmAtivaMmss(e.target.value)} value={dsc_adm_ativa_mmss} type="text" name="dsc_adm_ativa_mmss" id="dsc_adm_ativa_mmss" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*ADM Ativa MMII*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_adm_ativa_mmii" className="mt-margem">ADM Ativa MMII:</label>
                      <input onChange={(e)=>setDscAdmAtivaMmii(e.target.value)} value={dsc_adm_ativa_mmii} type="text" name="dsc_adm_ativa_mmii" id="dsc_adm_ativa_mmii" className="form-control mt-margem-input-ref"/>
                    </div>

                  {/*SubAba - Sistema Tegumentar*/}
                    <br></br>
                    <center><h6 className="mt-margem align_center">Sistema Tegumentar</h6></center>
                  {/*Pele*/}
                    <div className="input-group"> 
                      <label htmlFor="dsc_tegumentar_pele" className="mt-margem">Pele:</label>
                      <input onChange={(e)=>setDscTegumentarPele(e.target.value)} value={dsc_tegumentar_pele} type="text" name="dsc_tegumentar_pele" id="dsc_tegumentar_pele" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Elastidade*/}
                    <div className="mt-margem">
                      <h6 >Elastidade:</h6>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgTegumentarElasticidade('N')} value="" name="flg_tegumentar_elasticidade" id="flg_tegumentar_elasticidade_n" checked={flg_tegumentar_elasticidade=='N'}/>
                        <label className="form-check-label" for="flg_tegumentar_elasticidade_n">
                        Normal
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" onChange={(e)=>setFlgTegumentarElasticidade('D')} value="" name="flg_tegumentar_elasticidade" id="flg_tegumentar_elasticidade_d" checked={flg_tegumentar_elasticidade=='D'}/>
                        <label className="form-check-label" for="flg_tegumentar_elasticidade_d">
                        Diminuída
                        </label>
                      </div>                                                
                    </div>
                  {/*Desidratação*/}
                    <div className="mt-margem">
                      <h6 >Desidratação:</h6>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTegumentarDesidratacao('S')} value="" name="flg_tegumentar_desidratacao" id="flg_tegumentar_desidratacao_s" checked={flg_tegumentar_desidratacao=='S'}/>
                      <label className="form-check-label" for="flg_tegumentar_desidratacao_s">
                        Sim
                      </label>
                      </div>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTegumentarDesidratacao('N')} value="" name="flg_tegumentar_desidratacao" id="flg_tegumentar_desidratacao_n" checked={flg_tegumentar_desidratacao=='N'}/>
                      <label className="form-check-label" for="flg_tegumentar_desidratacao_n">
                        Não
                      </label>
                      </div>                                                
                    </div>
                  {/*Manchas*/}
                    <div className="mt-margem">
                      <h6 >Manchas:</h6>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTegumentarMancha('S')} value="" name="flg_tegumentar_mancha" id="flg_tegumentar_mancha_s" checked={flg_tegumentar_mancha=='S'}/>
                      <label className="form-check-label" for="flg_tegumentar_mancha_s">
                        Sim
                      </label>
                      </div>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTegumentarMancha('N')} value="" name="flg_tegumentar_mancha" id="flg_tegumentar_mancha_n" checked={flg_tegumentar_mancha=='N'}/>
                      <label className="form-check-label" for="flg_tegumentar_mancha_n">
                        Não
                      </label>
                      </div>                                                
                    </div>
                  {/*Local manchas*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_local_mancha" className="mt-margem">Local manchas:</label>
                      <input onChange={(e)=>setDscLocalMancha(e.target.value)} value={dsc_local_mancha} type="text" name="dsc_local_mancha" id="dsc_local_mancha" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Coloração*/}
                    <div className="mt-margem">
                      <h6 >Coloração:</h6>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTegumentarColoracao('H')} value="" name="flg_tegumentar_coloracao" id="flg_tegumentar_coloracao_h" checked={flg_tegumentar_coloracao=='H'}/>
                      <label className="form-check-label" for="flg_tegumentar_coloracao_h">
                        Hiperemia
                      </label>
                      </div>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTegumentarColoracao('P')} value="" name="flg_tegumentar_coloracao" id="flg_tegumentar_coloracao_p" checked={flg_tegumentar_coloracao=='P'}/>
                      <label className="form-check-label" for="flg_tegumentar_coloracao_p">
                        Pálido
                      </label>
                      </div>                                                
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTegumentarColoracao('C')} value="" name="flg_tegumentar_coloracao" id="flg_tegumentar_coloracao_c" checked={flg_tegumentar_coloracao=='C'}/>
                      <label className="form-check-label" for="flg_tegumentar_coloracao_c">
                        Cianótico
                      </label>
                      </div>
                    </div>
                  {/*Local Coloração*/}
                    <div className="input-group mt-margem"> 
                    <label htmlFor="dsc_local_coloracao" className="mt-margem">Local Coloração:</label>
                    <input onChange={(e)=>setDscLocalColoracao(e.target.value)} value={dsc_local_coloracao} type="text" name="dsc_local_coloracao" id="dsc_local_coloracao" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Temperatura*/}
                    <div className="mt-margem">
                      <h6 >Temperatura:</h6>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTegumentarTemperatura('H')} value="" name="flg_tegumentar_temperatura" id="flg_tegumentar_temperatura_h" checked={flg_tegumentar_temperatura=='H'}/>
                      <label className="form-check-label" for="flg_tegumentar_temperatura_h">
                        Hiperemia
                      </label>
                      </div>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTegumentarTemperatura('I')} value="" name="flg_tegumentar_temperatura" id="flg_tegumentar_temperatura_i" checked={flg_tegumentar_temperatura=='I'}/>
                      <label className="form-check-label" for="flg_tegumentar_temperatura_i">
                        Hipotermia
                      </label>
                      </div>                                                
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTegumentarTemperatura('P')} value="" name="flg_tegumentar_temperatura" id="flg_tegumentar_temperatura_p" checked={flg_tegumentar_temperatura=='P'}/>
                      <label className="form-check-label" for="flg_tegumentar_temperatura_p">
                        Hipertemia
                      </label>
                      </div>
                    </div>
                  {/*Local Temperatura*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_local_temperatura" className="mt-margem">Local Temperatura:</label>
                      <input onChange={(e)=>setDscLocalTemperatura(e.target.value)} value={dsc_local_temperatura} type="text" name="dsc_local_temperatura" id="dsc_local_temperatura" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Sensibilidade*/}
                    <div className="mt-margem">
                      <h6 >Sensibilidade:</h6>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTegumentarSensibilidade('N')} value="" name="flg_tegumentar_sensibilidade" id="flg_tegumentar_sensibilidade_n" checked={flg_tegumentar_sensibilidade=='N'}/>
                      <label className="form-check-label" for="flg_tegumentar_sensibilidade_n">
                        Normal
                      </label>
                      </div>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={(e)=>setFlgTegumentarSensibilidade('D')} value="" name="flg_tegumentar_sensibilidade" id="flg_tegumentar_sensibilidade_d" checked={flg_tegumentar_sensibilidade=='D'}/>
                      <label className="form-check-label" for="flg_tegumentar_sensibilidade_d">
                        Diminuida
                      </label>
                      </div>                                                
                    </div>
                  {/*Local Sensibilidade*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_local_sensibilidade" className="mt-margem">Local Sensibilidade:</label>
                      <input onChange={(e)=>setDscLocalSensibilidade(e.target.value)} value={dsc_local_sensibilidade} type="text" name="dsc_local_sensibilidade" id="dsc_local_sensibilidade" className="form-control mt-margem-input-ref"/>
                    </div>

                  {/*SubAba - Equilíbrio Funcional*/}
                    <br></br>
                    <center><h6 className="mt-margem align_center">Equilíbrio Funcional</h6></center>
                  {/*Mão na Cabeça*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_equilibrio_mao_cabeca" className="mt-margem">Mão na cabeça:</label>
                      <input onChange={(e)=>setDscEquilibrioMaoCabeca(e.target.value)} value={dsc_equilibrio_mao_cabeca} type="text" name="dsc_equilibrio_mao_cabeca" id="dsc_equilibrio_mao_cabeca" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Mão no Ombro (Cruzada)*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_equilibrio_mao_ombro" className="mt-margem">Mão no ombro (Cruzada):</label>
                      <input onChange={(e)=>setDscEquilibrioMaoOmbro(e.target.value)} value={dsc_equilibrio_mao_ombro} type="text" name="dsc_equilibrio_mao_ombro" id="dsc_equilibrio_mao_ombro" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Cruzar Pernas*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_equilibrio_cruzar_perna" className="mt-margem">Cruzar pernas:</label>
                      <input onChange={(e)=>setDscEquilibrioCruzarPerna(e.target.value)} value={dsc_equilibrio_cruzar_perna} type="text" name="dsc_equilibrio_cruzar_perna" id="dsc_equilibrio_cruzar_perna" className="form-control mt-margem-input-ref"/>
                    </div>

                  {/*SubAba - Coordenação*/}
                    <br></br>
                    <center><h6 className="mt-margem align_center">Coordenação</h6></center>
                  {/*MSD*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_coordenacao_msd" className="mt-margem">MSD:</label>
                      <input onChange={(e)=>setDscCoordenacaoMsd(e.target.value)} value={dsc_coordenacao_msd} type="text" name="dsc_coordenacao_msd" id="dsc_coordenacao_msd" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*MSE*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_coordenacao_mse" className="mt-margem">MSE:</label>
                      <input onChange={(e)=>setDscCoordenacaoMse(e.target.value)} value={dsc_coordenacao_mse} type="text" name="dsc_coordenacao_mse" id="dsc_coordenacao_mse" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Index Nariz - MSD*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_coordenacao_nariz_msd" className="mt-margem">Index Nariz - MSD:</label>
                      <input onChange={(e)=>setDscCoordenacaoNarizMsd(e.target.value)} value={dsc_coordenacao_nariz_msd} type="text" name="dsc_coordenacao_nariz_msd" id="dsc_coordenacao_nariz_msd" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Index Nariz - MSE*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_coordenacao_nariz_mse" className="mt-margem">Index Nariz - MSE:</label>
                      <input onChange={(e)=>setDscCoordenacaoNarizMse(e.target.value)} value={dsc_coordenacao_nariz_mse} type="text" name="dsc_coordenacao_nariz_mse" id="dsc_coordenacao_nariz_mse" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Motricidade Fina*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_coordenacao_motricidade_fina" className="mt-margem">Motricidade Fina:</label>
                      <input onChange={(e)=>setDscCoordenacaoMotricidadeFina(e.target.value)} value={dsc_coordenacao_motricidade_fina} type="text" name="dsc_coordenacao_motricidade_fina" id="dsc_coordenacao_motricidade_fina" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Alcance*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_coordenacao_alcance" className="mt-margem">Alcance:</label>
                      <input onChange={(e)=>setDscCoordenacaoAlcance(e.target.value)} value={dsc_coordenacao_alcance} type="text" name="dsc_coordenacao_alcance" id="dsc_coordenacao_alcance" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Preensão*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_coordenacao_preensao" className="mt-margem">Preensão:</label>
                      <input onChange={(e)=>setDscCoordenacaoPreensao(e.target.value)} value={dsc_coordenacao_preensao} type="text" name="dsc_coordenacao_preensao" id="dsc_coordenacao_preensao" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Manipulação*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_coordenacao_manipulacao" className="mt-margem">Manipulação:</label>
                      <input onChange={(e)=>setDscCoordenacaoManipulacao(e.target.value)} value={dsc_coordenacao_manipulacao} type="text" name="dsc_coordenacao_manipulacao" id="dsc_coordenacao_manipulacao" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Cognitivo*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_coordenacao_cognitivo" className="mt-margem">Cognitivo:</label>
                      <input onChange={(e)=>setDscCoordenacaoCognitivo(e.target.value)} value={dsc_coordenacao_cognitivo} type="text" name="dsc_coordenacao_cognitivo" id="dsc_coordenacao_cognitivo" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Tratamento psiquiátrico*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_coordenacao_psiquiatrico" className="mt-margem">Tratamento psiquiátrico:</label>
                      <input onChange={(e)=>setDscCoordenacaoPsiquiatrico(e.target.value)} value={dsc_coordenacao_psiquiatrico} type="text" name="dsc_coordenacao_psiquiatrico" id="dsc_coordenacao_psiquiatrico" className="form-control mt-margem-input-ref"/>
                    </div>
                  {/*Tratamento psicológico*/}
                    <div className="input-group mt-margem"> 
                      <label htmlFor="dsc_coordenacao_psicologico" className="mt-margem">Tratamento psicológico:</label>
                      <input onChange={(e)=>setDscCoordenacaoPsicologico(e.target.value)} value={dsc_coordenacao_psicologico} type="text" name="dsc_coordenacao_psicologico" id="dsc_coordenacao_psicologico" className="form-control mt-margem-input-ref"/>
                    </div>
                  </div>

                {/*Aba - Anamnese*/}
                  <div className="tab-pane fade" id="v-pills-saude-anamnese" role="tabpanel" aria-labelledby="v-pills-saude-anamnese-tab" tabindex="3">
                  {/*Anamnese*/}  
                    <label htmlFor="mem_anamnese" className="mt-margem">Anamnese:</label>
                    <textarea rows="10" onChange={(e)=>setMemAnamnese(e.target.value)} value={mem_anamnese} name="mem_anamnese" id="mem_anamnese" className="form-control"></textarea>
                  
                  {/*Botão Adicionar*/}
                    <div className="mt-margem">
                      <button type='button'onClick={AdicionarAnamnese} className="btn btn-light btn-adicionar mt-margem">Adicionar</button>
                    </div>

                  {/*GridAnamnese*/}  
                    <div>                      
                      <ListaAnamnese registro={anamnese} clickImprimirRegistro={fun_imprimiranamnese} clickExcluirRegistro={fun_excluiranamnese}/>              
                    </div>

                  {/*Rodape - Botoes Confirmar e Cancelar*/}        
                    <div>
                      {/*Btn Cancelar e Btn Confirmar*/}
                        <div className="text-center mt-margem">          
                          <button type='button' onClick={Cancelar} className="btn btn-primary btn-acao">Cancelar </button>
                          <button type='button' onClick={Editar}   className="btn btn-primary btn-acao">Confirmar</button>            
                        </div>
                        <small className="d-flex justify-content-center align-items-center text-secondary"> &copy; Desenvolvido por Suíte Sistemas</small>
                    </div>
                  </div>
                </div>
              </div>
            </div> {/*Fecha Aba - Saude*/}
          </div>

         {/*Rodape - Botoes Confirmar e Cancelar*/}        
          {
            flg_tipo_cadastro != "P" ? //Paciente 
              <div className="footer">          
                <div className="text-center mt-margem">          
                  <button type='button' onClick={Cancelar} className="btn btn-primary btn-acao">Cancelar </button>
                  <button type='button' onClick={Editar}   className="btn btn-primary btn-acao">Confirmar</button>            
                </div>
                <small className="d-flex justify-content-center align-items-center text-secondary"> &copy; Desenvolvido por Suíte Sistemas</small>
              </div>
            : null
          }

        </form>

        {
          confirmado ?
            navigate('/pessoa') : null
        }       
        
      </div>
    :null}
    
  </div>
}

export default Pessoa_Edt;