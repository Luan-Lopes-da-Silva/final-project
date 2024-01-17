'use client'

import ConsultorLayout from "@/src/components/ConsultorLayout"
import { useEffect, useRef, useState } from "react"
import defaultPhoto from '@/public/account_circle_FILL0_wght400_GRAD0_opsz24.svg'
import style from '@/src/styles/myProfile.module.scss'
import { getConsultantFromId } from "@/src/functions/getConsultanst"


export default function Page({params}:any){
  const refContainer = useRef<HTMLBodyElement>(null)
  const refForm = useRef<HTMLFormElement>(null)
  const divAvatar = useRef<HTMLDivElement>(null)
  const [avatar,setAvatar] = useState('')
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  useEffect(()=>{
    async function getDatas(){
    const dbFromIdConversed = await getConsultantFromId(params.id)
    
    if( divAvatar.current){
    if(dbFromIdConversed[0].avatar === ''){
    divAvatar.current.style.backgroundImage = `url(${defaultPhoto.src})`
    divAvatar.current.style.backgroundSize = 'cover'
    }else{
      divAvatar.current.style.backgroundImage = `url(${dbFromIdConversed[0].avatar})`
      divAvatar.current.style.backgroundSize = 'cover'
    }
    }
    }

    getDatas()
  })
return(
  <>
  <title>Meu Perfil</title>
  <ConsultorLayout>
  <section ref={refContainer} className={style.container}>
  <h1>Meu Perfil</h1>
  <form  ref={refForm}>
  <div ref={divAvatar}>
  <label htmlFor="avatar">SELECIONAR UMA FOTO</label>
  <input 
  type="file" 
  id="avatar" 
  name="avatar"
  value={avatar}
  onChange={(ev)=>setAvatar(ev.currentTarget.value)}
  />
  </div>
  <label htmlFor="name">Nome de usuario</label>
  <input 
  type="text" 
  name="name" 
  id="name"
  value={name}
  onChange={(ev)=>setName(ev.currentTarget.value)}
  />
  <label htmlFor="email">Email ultilizado</label>
  <input 
  type="text" 
  name="email" 
  id="email"
  value={email}
  onChange={(ev)=>setEmail(ev.currentTarget.value)}
  />
  <label htmlFor="password">Nova senha</label>
  <input 
  type="text" 
  name="password" 
  id="password"
  value={password}
  onChange={(ev)=>setPassword(ev.currentTarget.value)}
  />
  <label htmlFor="confirmPassword">Confirmação senha</label>
  <input 
  type="text" 
  name="confirmPassword" 
  id="confirmPassword"
  value={confirmPassword}
  onChange={(ev)=>setConfirmPassword(ev.currentTarget.value)}
  />
  <button>FAZER ALTERAÇÕES</button>
  </form>
  </section>
  </ConsultorLayout>
  </>
)
}