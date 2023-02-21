import React, {useState, useContext} from 'react';
import {useNavigate}                 from 'react-router-dom';
import Logo                          from '../../assets/logo.jpg';
import Fundo                         from '../../assets/fundo-login.jpg';
import {AuthContext}                 from '../../context/auth.jsx';
import './style.css';

function Login(){
  const navigate = useNavigate();

  const [email, setEmail]       = useState('');
  const [senha, setSenha]       = useState('');
  const [mensagem, setMensagem] = useState('');
  
  const {setLogado} = useContext(AuthContext); 

  function ProcessaLogin(){
    if((email === 'adm') && (senha === '1')) {
      localStorage.setItem("logado", "S");
      setLogado(true);           
      navigate('/principal')
    }else{            
      localStorage.setItem("logado", "N");
      setLogado(false);
      setMensagem('Email ou senha inválida');
    }
  }

  return <div className="row">
    <div className="col-sm-6 d-flex justify-content-center align-items-center text-center">
      <form className="form-login">
        <h3 className="mb-4">Administre o Ports Saúde agora mesmo.</h3>
        <h6 className="mb-3">Acesse sua conta</h6>

      {/*Edit Email*/}
        <div className="form-floating">
          <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" name="flg_dsc_email" id="flg_dsc_email" placeholder="E-mail" autoFocus/>
          <label htmlFor="floatingInput">E-mail</label>
        </div>

      {/*Edit Senha*/}
        <div className="form-floating">
          <input onChange={(e)=>setSenha(e.target.value)} type="password" name="flg_dsc_senha" id="flg_dsc_senha" className="form-control" placeholder="Senha"/>
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