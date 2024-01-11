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
  const [nome,setNome] = useState('')
  const [email,setEmail] = useState('')
  const [telefone,setTelefone] = useState('')
  const refNome = useRef<HTMLParagraphElement>(null)
  const refEmail = useRef<HTMLParagraphElement>(null)
  const refTelefone = useRef<HTMLParagraphElement>(null)

  getLocalStorage
  function gerarHexAleatorio(){
    const caracteresHex = '0123456789ABCDEFGHIJKLMNOPRSTUVWXYZ'
    let hexAleatorio = '#'
  
    for (let i = 0; i<8; i++){
      const indiceAleatorio = Math.floor(Math.random()* caracteresHex.length)
      hexAleatorio += caracteresHex.charAt(indiceAleatorio)
    }
    return hexAleatorio
    }

    function randomPassword(){
      const caracteresHex = '0123456789ABCDEFGHIJKLMNOPRSTUVWXYZ'
      let hexAleatorio = ''
    
      for (let i = 0; i<8; i++){
        const indiceAleatorio = Math.floor(Math.random()* caracteresHex.length)
        hexAleatorio += caracteresHex.charAt(indiceAleatorio)
      }
      return hexAleatorio
      }

      
  async function createConsultor(ev:FormEvent){
    ev.preventDefault()
    const users = await fetch('https://consultant-db.onrender.com/consultants')
    const usersJson:Consultor[] = await users.json()
    const filter = usersJson.filter(user=>(user.email === email))
    const hexAleatorio = gerarHexAleatorio()
    const passwordAleatory = randomPassword()
    const date = new Date()
    if(refNome.current && refEmail.current && refTelefone.current){
      if(nome=== '' && email === ''  && telefone === '' ){
        refNome.current.innerText= 'Preencha o campo'
        refEmail.current.innerText= 'Preencha o campo'
        refTelefone.current.innerText= 'Preencha o campo'
        }else if(nome=== '' && email === '' ){
        refNome.current.innerText= 'Preencha o campo'
        refEmail.current.innerText= 'Preencha o campo'
        refTelefone.current.innerText= ''
        }else if(nome=== ''){
        refNome.current.innerText= 'Preencha o campo'
        refEmail.current.innerText= ''
        refTelefone.current.innerText= ''
       }else if(email === ''  && telefone === ''){
        refNome.current.innerText= ''
        refEmail.current.innerText= 'Preencha o campo'
        refTelefone.current.innerText= 'Preencha o campo'
       }else if(email === '' ){
        refNome.current.innerText= ''
        refEmail.current.innerText= 'Preencha o campo'
        refTelefone.current.innerText= ''
       }else if(nome != '' && filter.length>0 && telefone != ''){
        refNome.current.innerText= ''
        refEmail.current.innerText = 'Email ja utilizado'
        refTelefone.current.innerText= ''
       }else{
        const admLocal = getAdmLocalStorage()
        if(admLocal){
        refNome.current.innerText= ''
        refEmail.current.innerText= ''
        refTelefone.current.innerText= ''
    
        const criarUser = await fetch(`https://consultant-db.onrender.com/consultants`,{
          method: "POST",
          body: JSON.stringify(
            {idConsultant :hexAleatorio, name:nome,email,password:passwordAleatory,phone: telefone, role:'Consultor',
            memberSince:date,avatar:'',idResponsibleAdm: admLocal[0].idadm
          }
          ),
          headers:{
            "Content-Type": "application/json"
          }
        })
        const templateParams = {
          to_name : nome,
          admResponsavell : admLocal[0].name,
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
      <p ref={refNome} className={style.errorSpan}></p>
      <input 
      type="text" 
      value={nome}
      onChange={(ev)=>setNome(ev.currentTarget.value)}
      />
      <label htmlFor="">Email</label>
      <p ref={refEmail} className={style.errorSpan}></p>
      <input 
      type="text" 
      value={email}
      onChange={(ev)=>setEmail(ev.currentTarget.value)}
      />
      <label htmlFor="">Telefone</label>
      <p ref={refTelefone} className={style.errorSpan}></p>
      <input 
      type="text" 
      value={telefone}
      onChange={(ev)=>setTelefone(ev.currentTarget.value)}
      />
      <button>Cadastrar-se</button>
      </form>
  
    </div>
    </LayoutRegister>
  )
}