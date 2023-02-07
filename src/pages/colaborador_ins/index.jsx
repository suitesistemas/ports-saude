import Menu              from '../../components/menu/index.jsx';
import React, {useState} from 'react';
import {useNavigate}     from 'react-router-dom';
import Axios             from "axios";
import './style.css';
import api  from '../../config/configApi';

//const apiUrl = process.env.REACT_APP_API_URL; /*variavel de ambiente, tem que iniciar com REAC_APP_ e restante eh de livre digitacao*/
const apiUrl = "http://15.229.119.177:3001";
//const apiUrl = "http://localhost:3001";

function Colaborador_Ins(){
  const [referencia,    setReferencia]     = useState('');
  const [nomepessoa,    setNomePessoa]     = useState('');
  const [nomefantasia,  setNomeFantasia]   = useState('');
  const [cpfcnpj,       setCpfCnpj]        = useState('');
  const [ddd01,         setDdd01]          = useState('37');
  const [fone01,        setFone01]         = useState('');
  const [dddcelular01,  setDddCelular01]   = useState('37');
  const [celular01,     setCelular01]      = useState('');  
  const [cep,           setCep]            = useState('');
  const [bairro,        setBairro]         = useState('');
  const [cidade,        setCidade]         = useState('');
  const [logradouro,    setLogradouro]     = useState('');
  const [numlogradouro, setNumLogradouro]  = useState('');
  const [datcadastro,   setDatCadastro]    = useState('');
  const [datnascimento, setDatNascimento]  = useState('');
  const [flgsexo,       setFlgSexo]        = useState('');
  const [flguf,         setFlgUf]          = useState(''); 
  const[dscimagem,      setDscImagem]      = useState('logo.jpg');
  
  const navigate = useNavigate();

/*Salvando a Imagem  (foto) */
  const [image,  setImage]  = useState('');
  const [status, setStatus] = useState({
    type:     '',
    mensagem: ''
  });

  const uploadimage = async e => {
    e.preventDefault();    

    const formData = new FormData();
          formData.append('image', image);

    const headers = {
      'headers':{
        'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
      }
    }
    
    await api.post(apiUrl + "/upload-image", formData, headers)
    .then((response) => {      
      setStatus({
        type: 'sucess',
        mensagem: response.data.mensagem
      })

    }).catch((err) =>{
      if (err.response) {        
        setStatus({
          type: 'error',
          mensagem: err.response.data.mensagem
        })
      } else {
        setStatus({
          type: 'error',
          mensagem: "Erro: Servidor fora do ar!"
        })
      }
    });
  }

//Inserindo registo no BD
  const Cadastrar = async e =>{
    Axios.post(apiUrl + "/colaborador/inserir",
    {
      dsc_referencia:     referencia,
      dsc_nome_pessoa:    nomepessoa,
      dsc_nome_fantasia:  nomefantasia,
      dsc_cpf_cnpj:       cpfcnpj,
      dsc_ddd_01:         ddd01,
      dsc_fone_01:        fone01,
      dsc_ddd_celular_01: dddcelular01,
      dsc_celular_01:     celular01,
      dsc_cep:            cep,
      dsc_bairro:         bairro,
      dsc_cidade:         cidade,
      dsc_logradouro:     logradouro,
      dat_cadastro:       datcadastro,
      dat_nascimento:     datnascimento,
      flg_usuario:        'N',
      flg_paciente:       'N',
      flg_colaborador:    'S',
      flg_fornecedor:     'N',
      flg_sexo:           flgsexo,
      flg_uf:             flguf,
      num_logradouro:     numlogradouro,
      dsc_imagem:         image.name
    })
    
    .then((response)=>{
      setDscImagem(image.name);
      console.log(response);
    });

    navigate('/colaborador');
  }

  return <div>
    <Menu/>

    <div className="mt-page">
      <div>
        <form onSubmit={uploadimage}>          
          <div className="container-fluid titulo justify-content-between text-center">
            <h3 className="">Cadastro de Colaborador - Inserindo...</h3>
          </div>
          <div>
            <img className="mt-margem-foto" src={apiUrl + "/users/" + dscimagem} alt="Ports Saude" />
            <input  type="file" name="image" onChange={e => setImage(e.target.files[0])}/>
            <button type="submit" className="btn btn-primary btn-acao">Salvar</button>
            {status.type === 'sucess'? <p style={{color: "green"}}>{status.mensagem}</p> : ''}
            {status.type === 'error'?  <p style={{color: "red"}}  >{status.mensagem}</p> : ''}
          </div>
        </form>
          <div className="container-fluid titulo justify-content-between text-center">
            <h3 className="">Cadastro de Colaborador - Inserindo...</h3>
          </div>
      </div>
    
      <div>
        <form>
          <div className="input-group mt-margem">
          {/*Edit Referencia*/}  
            <label htmlFor="dsc_referencia" className="mt-margem">Referência :</label>
            <input onChange={(e)=>setReferencia(e.target.value)} type="text" name="dsc_referencia" id="dsc_referencia" className="form-control mt-margem-input-ref"/>
          {/*Edit Data Cadastro*/}  
          <label htmlFor="dat_cadasro" className="mt-margem">Cadastro</label>
            <input onChange={(e)=>setDatCadastro(e.target.value)} type="date" name="dat_cadastro" id="dat_cadastro" className="form-control"/>
          {/*Edit Data Nascimento*/}
            <label htmlFor="dat_nascimento" className="mt-margem">Nascimento</label>
            <input onChange={(e)=>setDatNascimento(e.target.value)} type="date" name="dat_nascimento" id="dat_nascimento" className="form-control"/>
          {/*Edit Cpf Cnpj */}          
            <label htmlFor="dsc_cpf_cnpj"  className="mt-margem">Cnpj Cpf:</label>
            <input onChange={(e)=>setCpfCnpj(e.target.value)} type="text" name="dsc_cpf_cnpj" id="dsc_cpf_cnpj" className="form-control"/>          
          </div>
        
          <div className="input-group mt-margem">
          {/*Edit Nome Pessoa*/}
            <label htmlFor="dsc_nome_pessoa" className="mt-margem">Nome Pessoa:</label>
            <input onChange={(e)=>setNomePessoa(e.target.value)} type="text" name="dsc_nome_pessoa" id="dsc_nome_pessoa" className='form-control'/> 
          {/*Edit Nome Fangasia*/}  
            <label htmlFor="dsc_nome_fantasia" className="mt-margem">Nome Fantasia:</label>
            <input onChange={(e)=>setNomeFantasia(e.target.value)} type="text" name="dsc_nome_fantasia" id="dsc_nome_fantasia" className="form-control"/>
          {/*Edit Sexo*/}
            <label htmlFor="flg_sexo" className="mt-margem">Sexo:</label>
            <select className="form-control mt-margem-input-ref" onChange={(e)=>setFlgSexo(e.target.value)} value={flgsexo} name="flg_sexo" id="flg_sexo">
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>
       
          <div className="input-group mt-margem">
           {/*Edit DDD 01*/}  
            <label htmlFor="dsc_ddd_01" className="mt-margem">DDD:</label>            
            <input onChange={(e)=>setDdd01(e.target.value)} type="text" name='dsc_ddd_01' id='dsc_ddd_01' className="form-control mt-margem-input-seq" value="37"/>
           {/*Edit FONE 01*/}
            <label htmlFor="dsc_fone_01" className="mt-margem">Fone:</label>
            <input onChange={(e)=>setFone01(e.target.value)} type="tel" name="dsc_fone_01" id="dsc_fone_01" className="form-control"/>
          {/*Edit DDD Celular 01*/}          
            <label htmlFor="dsc_ddd_celular_01" className="mt-margem">DDD:</label>
            <input onChange={(e)=>setDddCelular01(e.target.value)} type="text" name="dsc_ddd_celular_01" id="dsc_ddd_celular_01" className="form-control mt-margem-input-seq" value="37"/> 
          {/*Edit Celular 01*/}
            <label htmlFor="dsc_celular_01" className="mt-margem">Celular:</label>
            <input onChange={(e)=>setCelular01(e.target.value)} type="tel" name="dsc_celular_01" id="dsc_celular_01" className="form-control"/>
          {/*Edit Cep*/}
            <label htmlFor="dsc_cep" className="mt-margem">Cep:</label>
            <input onChange={(e)=>setCep(e.target.value)} type="text" name="dsc_cep" id="dsc_cep" className="form-control"/>
          </div>

          <div className="input-group mt-margem">
          {/*Edit UF*/}
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
          {/*Edit Cidade*/}
            <label htmlFor="dsc_cidade" className="mt-margem">Cidade:</label>
            <input onChange={(e)=>setCidade(e.target.value)} type="text" name="dsc_cidade" id="dsc_cidade" className="form-control"/>
          {/*Edit Bairro*/}         
            <label htmlFor="dsc_bairro" className="mt-margem">Bairro:</label>
            <input onChange={(e)=>setBairro(e.target.value)} type="text" name="dsc_bairro" id="dsc_bairro" className="form-control"/>
          </div>

          <div className="input-group mt-margem">
           {/*Edit Logradouro*/}           
            <label htmlFor="dsc_logradouro" className="mt-margem">Lodradouro:</label>
            <input onChange={(e)=>setLogradouro(e.target.value)} type="text" name="dsc_logradouro" id="dsc_logradouro" className="form-control"/> 
            <label htmlFor="num_logradouro" className="mt-margem">nº:</label>
            <input onChange={(e)=>setNumLogradouro(e.target.value)} type="text" name="num_logradouro" id="num_logradouro" className="form-control mt-margem-input-seq"/> 
          </div>

        {/*Btn Cancelar e Btn Confirmar*/}
          <div className="text-center">          
            <button type='button' className="btn btn-primary btn-acao">Cancelar</button>
            <button type='button' onClick={Cadastrar} className="btn btn-primary btn-acao">Confirmar</button>            
          </div>  

      {/*Rodape*/}
        <div>
          <br/ >
          <small className="d-flex justify-content-center align-items-center text-secondary"> &copy; Desenvolvido por Suíte Sistemas</small>
        </div>
       
        </form>
      </div>
    </div>
  </div>
}

export default Colaborador_Ins;