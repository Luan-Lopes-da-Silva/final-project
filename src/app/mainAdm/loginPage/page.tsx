"use client"

import LayoutLogin from "@/src/components/LayoutLogin"
import style from "@/src/styles/loginConsultor.module.scss"
import loginSvg from "@/public/loginSvg.svg"
import Image from "next/image"
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef } from "react"

export default function LoginPage(){
  const refBtn = useRef<HTMLButtonElement>(null)
  const refLoading = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    localStorage.setItem('email','')
  })

  const checkEmail = async (email: string): Promise<boolean> =>{
    const dbAdms = await fetch(`https://db-adm.onrender.com/adms`)
    const dbAdmsConversed: User[] = await dbAdms.json()
    const emailFind = dbAdmsConversed.filter((adm)=> adm.email === email)
    if(emailFind.length<1){
      localStorage.setItem('email','')
      return false
    }else{
      localStorage.setItem('email',emailFind[0].email)
      return true 
    }
  }

  const checkPassword = async (password:string): Promise<boolean> =>{
      const dbAdms = await fetch(`https://db-adm.onrender.com/adms`);
      const dbAdmsConversed: User[] = await dbAdms.json();
      const userLocal = localStorage.getItem('email')
      const user = dbAdmsConversed.filter((adm) => adm.email === userLocal);
      const passwordFind = user.filter((adm)=>adm.password === password)

     if(passwordFind.length<1){
        return false
      }else {
        return true
      }  
  }

  type UserAdm = {
    email: string
    password: string
  }

  type User = {
  name: string
  email: string
  password: string
  phone: string
  idAdm: string
  id: number
  position: string
  }
  
  const createLoginAdmSchema = z.object({
    email: z.string()
    .min(1,"O email é obrigatorio")
    .email("O formato do email é invalido")
    .refine(async(email)=>{
      const emailExists = await checkEmail(email)
      return emailExists
    },"Este e-mail não foi encontrado"),
    password:z.string()
    .min(1,"Senha é obrigatoria")
    .refine(async(password)=>{
      const passwordExist = await checkPassword(password)
      return passwordExist
    },"Senha incorreta")
  })

  const loginUser = async(data:UserAdm) => {
    const response = await fetch(`https://db-adm.onrender.com/adms`)
    const jsonResponse: User[] = await response.json()
    const findInDb = jsonResponse.filter((adm)=>adm.email === data.email)
      localStorage.setItem('Usuario Logado',JSON.stringify(findInDb))
      if(refBtn.current && refLoading.current){
        refBtn.current.style.display = 'none'
        refLoading.current.style.display = 'block'
      }
    setTimeout(()=>{
    window.location.href = '/mainAdm'
    },2000)
  }

  type createLoginData = z.infer<typeof createLoginAdmSchema>
  const {register,handleSubmit, formState: {errors}}= useForm<createLoginData>({resolver:zodResolver(createLoginAdmSchema)})
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
      <form onSubmit={handleSubmit(loginUser)}>
        <label htmlFor="email">Email</label>
        {errors.email && <p className={style.errorSpan}>{errors.email.message}</p> }
        <input 
        type="text" 
        id="email"
        {...register('email')}
        />
        <label htmlFor="password">Senha</label>
        {errors.password && <p className={style.errorSpan}>{errors.password.message}</p>}
        <input 
        type="password"
        id="password"
        {...register('password')} 
        />
        <button ref={refBtn}>Login</button>
        <div className={style.ldsRing} ref={refLoading}><div></div><div></div><div></div><div></div></div>
      </form>
    </div>
    </div>
    </LayoutLogin>
  )
}