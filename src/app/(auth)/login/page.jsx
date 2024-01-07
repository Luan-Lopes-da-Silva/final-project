'use client'

import LayoutAuth from '../../../components/LayoutLogin'
import style from '../../../styles/signup.module.scss'
import{useState} from 'react'

export default function Login(){
  const test = JSON.parse(localStorage.getItem('Usuario'))
  const [email,setEmail] = useState()
  const [senha,setSenha] = useState()


function checkUser(ev){
ev.preventDefault()
if(email === test.emailAdress && senha === test.password){
setTimeout(() => {
    window.location.href = 'http://localhost:3001/dashboard'
    const logado = {
      email: email,
      nome:test.userName
    }
    localStorage.setItem('Usuario Logado',JSON.stringify(logado))
}, 2000);
}else{
  alert('Usuario não cadastrado')
}
}

  return(
   <LayoutAuth>
    <title>Login</title>
    <div className= {style.form}>
    <div className= {style.firstColumn}>
      <h1>Login</h1>
    </div>
    <form className={style.secondColumn} onSubmit={(ev)=>checkUser(ev)}>
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
      <button>Login</button>
    </form>
   
    </div>
   </LayoutAuth>
  )
}