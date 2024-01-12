'use client'


import { useState } from "react";
import LayoutAuth from "../../../components/LayoutLogin";
import style from '../../../styles/signup.module.scss'

export default function Signup(){
  const [nome,setNome] = useState()
  const [email,setEmail] = useState()
  const [senha,setSenha] = useState()
  const [confirmSenha,setConfirmSenha] = useState()


  function createUser(ev){
    ev.preventDefault()
    const user = {
      userName: nome,
      emailAdress:email,
      password: senha 
    }

    localStorage.setItem('Usuario',JSON.stringify(user))
  }

  return(
    <LayoutAuth>
    <title>Signup</title>
    <div className={style.form}>
    <div className={style.firstColumn}>
    <h1>Signup</h1>
    </div>
    <form 
    className={style.secondColumn}
    onSubmit={(ev)=>createUser(ev)}
    >
      <label htmlFor="">Nome</label>
      <input 
      type="text" 
      value={nome}
      onChange={(ev)=>setNome(ev.currentTarget.value)}
      />
      <label htmlFor="">Email</label>
      <input 
      type="text" 
      value={email}
      onChange={(ev)=>setEmail(ev.currentTarget.value)}
      />
      <label htmlFor="">Senha</label>
      <input 
      type="password"
      value={senha}
      onChange={(ev)=>setSenha(ev.currentTarget.value)}
      />
      <label htmlFor="">Confirmação senha</label>
      <input 
      type="password"
      value={confirmSenha}
      onChange={(ev)=>setConfirmSenha(ev.currentTarget.value)}
      />
      <button>Cadastrar-se</button>
    </form>
    </div>
    </LayoutAuth>
  )
}