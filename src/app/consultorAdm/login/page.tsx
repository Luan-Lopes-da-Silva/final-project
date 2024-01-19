'use client'

import { FormEvent, useRef, useState } from "react"
import LayoutLogin from "@/src/components/LayoutLogin"
import style from "@/src/styles/loginConsultor.module.scss"
import loginSvg from "@/public/loginSvg.svg"
import Image from "next/image"


type User = {
  name:string
  id:string
  phone:string
  password?: string
  email:string
  idconsultant: string
  avatar: string,
  role: string,
  membersince: string,
  position: string
}

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const refLoading = useRef<HTMLDivElement>(null)
  const refButton = useRef<HTMLButtonElement>(null)
  const errorEmailRef = useRef<HTMLParagraphElement>(null)
  const errorPasswordRef = useRef<HTMLParagraphElement>(null)

  async function checkUser(ev:FormEvent){
    ev.preventDefault()
    const response = await fetch('https://consultant-db.onrender.com/consultants')
    const responseJson:User[] = await response.json()
    const filter:User[] = responseJson.filter(usuario=>(usuario.email === email)) 
    const filter1 = filter.filter(usuario=>(usuario.password === password))
   if(errorEmailRef.current && errorPasswordRef.current && refButton.current && refLoading.current){
    if(filter.length<1 && filter1.length<1){
      errorEmailRef.current.innerText = 'Email incorreto'
      errorPasswordRef.current.innerText = 'Senha incorreto'
      console.log('Email e senha errados')
      }else if(filter.length<1 && filter1.length>0){
      console.log('Email errado e senha certo')
      errorEmailRef.current.innerText = 'Email incorreto'
      errorPasswordRef.current.innerText = ''
      }else if(filter.length>0 && filter1.length<1){
      errorEmailRef.current.innerText = ''
      errorPasswordRef.current.innerText = 'Senha incorreto'
      }else{
       const user:User = {
         name: filter[0].name,
         id: filter[0].id,
         email:filter[0].email   ,
         idconsultant: filter[0].idconsultant,
         avatar: filter[0].avatar,
         phone: filter[0].phone,
         membersince: filter[0].membersince,
         role: filter[0].role,
         position: filter[0].position
         }
         
         refButton.current.style.display = 'none'
         refLoading.current.style.display = 'inline-block'
         errorEmailRef.current.innerText = ''
         errorPasswordRef.current.innerText = ''
         setTimeout(()=>{
           window.location.href = '/consultorAdm'
         },1000)
         localStorage.setItem('Usuario Logado' ,JSON.stringify(user))
      }
   }
   
  }

  return(
    <LayoutLogin>  
      <title>Login Page</title>
    <div className={style.container}>
    <div className={style.firstColumn}>
      <Image
      alt="Login svg"
      src={loginSvg}
      width={700}
      height={600}
      />
    </div>
    <div className={style.secondColumn}>
      <form onSubmit={(ev)=>checkUser(ev)}>
        <label htmlFor="">Email</label>
        <p className={style.errorSpan} ref={errorEmailRef}></p>
        <input 
        type="text" 
        value={email}
        onChange={(ev)=>setEmail(ev.currentTarget.value)}
        />
        <label htmlFor="">Senha</label>
        <p className={style.errorSpan} ref={errorPasswordRef}></p>
        <input 
        type="password" 
        value={password}
        onChange={(ev)=>setPassword(ev.currentTarget.value)}
        />
        <button ref={refButton}>Login</button>
        <div className={style.ldsRing} ref={refLoading}><div></div><div></div><div></div><div></div></div>
      </form>
    </div>
    </div>
    </LayoutLogin>
  )
}