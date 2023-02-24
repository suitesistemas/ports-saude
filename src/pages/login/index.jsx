import React, {useState, useContext} from 'react';
import {useNavigate}                 from 'react-router-dom';
import Logo                          from '../../assets/logo.jpg';
import Fundo                         from '../../assets/fundo-login.jpg';
import {AuthContext}                 from '../../context/auth.jsx';
import Axios                         from "axios";
import './style.css';

//const apiUrl = "http://localhost:5000";
const apiUrl = "https://portsonline.com.br";

function Login(){
  const navigate = useNavigate();

  const [dsc_conta,   setDscConta]   = useState('');
  const [dsc_usuario, setDscUsuario] = useState('');
  const [dsc_senha,   setDscSenha]   = useState('');
  const [mensagem,    setMensagem]   = useState('');
  
  const {setLogado} = useContext(AuthContext);

  async function fun_login_conta(dsc_conta){
    return await Axios.get(apiUrl + "/pessoa/conta/login/" + dsc_conta);
  }

  async function fun_login_usuario(dsc_usuario, dsc_senha){
    return await Axios.get(apiUrl + "/pessoa/usuario/login/" + dsc_usuario + '/' + dsc_senha, {headers: {cod_conta: localStorage.getItem("cod_conta")}});
  }

  function ProcessaLogin(){
    console.log(dsc_conta);    
    fun_login_conta(dsc_conta).then((response) =>{
      if(response.data.length > 0) { //Encontrou conta
        localStorage.setItem("cod_conta", response.data[0].cod_conta);

        fun_login_usuario(dsc_usuario, dsc_senha).then((response) => {  
          if(response.data.length > 0) { //Encontrou usuario
            localStorage.setItem("logado", "S");      
            setLogado(true);
  
          //Preferencias do Usuario  
            if (response.data[0].flg_visualizar_resguardado === "S") {
              localStorage.setItem("user_flg_visualizar_resguardado", "S");
            } else{
              localStorage.setItem("user_flg_visualizar_resguardado", "N");
            }
  
            navigate('/principal')
  
          }else{            
            localStorage.setItem("logado", "N");
            setLogado(false);
            setMensagem('Credenciais de acesso inválidas');
          }
        })

      } else{
        localStorage.setItem("logado", "N");
        setLogado(false);
        setMensagem('Credenciais de acesso inválidas');
      }
    })
  }

  return <div className="row">
    <div className="col-sm-6 d-flex justify-content-center align-items-center text-center">
      <form className="form-login">
        <h3 className="mb-4">Administre o Ports Saúde agora mesmo.</h3>
        <h6 className="mb-3">Acesse sua conta</h6>

      {/*Conta*/}
        <div className="form-floating">
          <input onChange={(e)=>setDscConta(e.target.value)} type="txt" className="form-control" name="flg_dsc_conta" id="flg_dsc_conta" placeholder="Conta" autoFocus/>
          <label htmlFor="floatingInput">Conta</label>
        </div>

      {/*Usuário*/}
        <div className="form-floating">
          <input onChange={(e)=>setDscUsuario(e.target.value)} type="txt" className="form-control" name="dsc_usuario" id="dsc_usuario" placeholder="Usuário" autoFocus/>
          <label htmlFor="floatingInput">Usuário</label>
        </div>

      {/*Senha*/}
        <div className="form-floating">
          <input onChange={(e)=>setDscSenha(e.target.value)} type="password" name="dsc_senha" id="dsc_senha" className="form-control" placeholder="Senha"/>
          <label htmlFor="floatingInput">Senha</label>
        </div>

      {/*Btn Acessar*/}  
        <button onClick={ProcessaLogin} className="w-100 btn btn-lg btn-primary"  type="button">
          <span className="ms-2">Acessar</span>
        </button>

      {/*Mensagem erro*/}
        {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert"> {mensagem} </div>: null}

      {/*Img Logo*/}  
        <img className="mt-5" src={Logo} alt="Ports Saude" />

      {/*Rodape*/}
        <br/ >  <br/ >
        <small className="d-flex justify-content-center align-items-center text-secondary"> &copy; Desenvolvido por Suíte Sistemas</small>
      </form>
    </div>

  {/*Img da Direita*/}  
    <div className="col-sm-6 px-0 d-none d-sm-block">
        <img className="background-login" src={Fundo} alt="Ports Saude" />
    </div>
  </div>
}

export default Login;