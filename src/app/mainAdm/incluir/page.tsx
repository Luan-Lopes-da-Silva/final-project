'use client'

import { FormEvent, useRef, useState } from "react";
import LayoutRegister from "@/src/components/LayoutRegister";
import style from '../../../styles/incluirAdm.module.scss'
import registerSvg from '@/public/registerSvg.svg'
import Image from "next/image";
import { Consultor } from "../../types/types";

import getLocalStorage, { getAdmLocalStorage } from "../../functions/getLocalStorage";
import emailJs from '@emailjs/browser'


export default function IncluirConsultores(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const refName = useRef<HTMLParagraphElement>(null)
  const refEmail = useRef<HTMLParagraphElement>(null)
  const refPhone = useRef<HTMLParagraphElement>(null)

  function generateAleatoryHex(){
    const hexCharacter = '0123456789ABCDEFGHIJKLMNOPRSTUVWXYZ'
    let aleatoryHex = '#'
  
    for (let i = 0; i<8; i++){
      const aleatoryIndex = Math.floor(Math.random()* hexCharacter.length)
      aleatoryHex += hexCharacter.charAt(aleatoryIndex)
    }
    return aleatoryHex
    }

    function randomPassword(){
      const hexCharacter = '0123456789ABCDEFGHIJKLMNOPRSTUVWXYZ'
      let aleatoryHex = ''
    
      for (let i = 0; i<8; i++){
        const aleatoryIndex = Math.floor(Math.random()* hexCharacter.length)
        aleatoryHex += hexCharacter.charAt(aleatoryIndex)
      }
      return aleatoryHex
      }

      
  async function createConsultor(ev:FormEvent){
    ev.preventDefault()
    const users = await fetch('https://consultant-db.onrender.com/consultants')
    const usersJson:Consultor[] = await users.json()
    const filter = usersJson.filter(user=>(user.email === email))
    const aleatoryHex = generateAleatoryHex()
    const passwordAleatory = randomPassword()
    const date = new Date()
    if(refName.current && refEmail.current && refPhone.current){
      if(name=== '' && email === ''  && phone === '' ){
        refName.current.innerText= 'Preencha o campo'
        refEmail.current.innerText= 'Preencha o campo'
        refPhone.current.innerText= 'Preencha o campo'
        }else if(name=== '' && email === '' ){
        refName.current.innerText= 'Preencha o campo'
        refEmail.current.innerText= 'Preencha o campo'
        refPhone.current.innerText= ''
        }else if(name=== ''){
        refName.current.innerText= 'Preencha o campo'
        refEmail.current.innerText= ''
        refPhone.current.innerText= ''
       }else if(email === ''  && phone === ''){
        refName.current.innerText= ''
        refEmail.current.innerText= 'Preencha o campo'
        refPhone.current.innerText= 'Preencha o campo'
       }else if(email === '' ){
        refName.current.innerText= ''
        refEmail.current.innerText= 'Preencha o campo'
        refPhone.current.innerText= ''
       }else if(name != '' && filter.length>0 && phone != ''){
        refName.current.innerText= ''
        refEmail.current.innerText = 'Email ja utilizado'
        refPhone.current.innerText= ''
       }else{
        const admLocal = getAdmLocalStorage()
        if(admLocal){
        refName.current.innerText= ''
        refEmail.current.innerText= ''
        refPhone.current.innerText= ''
    
        const criarUser = await fetch(`https://consultant-db.onrender.com/consultants`,{
          method: "POST",
          body: JSON.stringify(
            {idConsultant :aleatoryHex, name:name,email,password:passwordAleatory,phone: phone, role:'Consultor',
            memberSince:date,avatar:'',idResponsibleAdm: admLocal.idadm,position : ''
          }
          ),
          headers:{
            "Content-Type": "application/json"
          }
        })
        
        const templateParams = {
          to_name : name,
          admResponsavell : admLocal.name,
          senha : passwordAleatory,
          email : email
        }
        emailJs.send("service_7mjjz9h","template_mmz9uak",templateParams,"EwswvU46-v2AATS3K").then((res)=>{
          console.log('Email Enviado', res.status, res.text)
        })
        alert('Usuario criado com sucesso')
       }
      }
    }
    
  }


  return(
    <LayoutRegister>
      <title>Incluir Consultor</title>
      <div className={style.main}>
      <div className={style.firstColumn}>
      <Image
      alt="Register svg"
      width={600}
      height={600}
      src={registerSvg}
      ></Image>
      </div>
      <form onSubmit={(ev)=>createConsultor(ev)} className={style.form}>
      <label htmlFor="">Nome</label>
      <p ref={refName} className={style.errorSpan}></p>
      <input 
      type="text" 
      value={name}
      onChange={(ev)=>setName(ev.currentTarget.value)}
      />
      <label htmlFor="">Email</label>
      <p ref={refEmail} className={style.errorSpan}></p>
      <input 
      type="text" 
      value={email}
      onChange={(ev)=>setEmail(ev.currentTarget.value)}
      />
      <label htmlFor="">Telefone</label>
      <p ref={refPhone} className={style.errorSpan}></p>
      <input 
      type="text" 
      value={phone}
      onChange={(ev)=>setPhone(ev.currentTarget.value)}
      />
      <button>Cadastrar-se</button>
      </form>
  
    </div>
    </LayoutRegister>
  )
}