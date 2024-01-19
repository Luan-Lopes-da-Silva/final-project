'use client'

import ConsultorLayout from "@/src/components/ConsultorLayout"
import { useEffect, useRef, useState } from "react"
import defaultPhoto from '@/public/account_circle_FILL0_wght400_GRAD0_opsz24.svg'
import style from '@/src/styles/myProfile.module.scss'
import { getConsultantFromId } from "@/src/functions/getConsultanst"
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

export default function Page({params}:any){
  const refContainer = useRef<HTMLBodyElement>(null)
  const refForm = useRef<HTMLFormElement>(null)
  const divAvatar = useRef<HTMLDivElement>(null)
  const [avatar,setAvatar] = useState('')

  function changeInfosProfile(){

  }

  const changeInfosSchema = z.object({
  name:z.string()
  .min(1,"O nome é obrigatorio."),
  email: z.string()
  .min(1,"O email é obrigatorio.")
  .email("O formato do email é invalido."),
  password:z.string()
  .min(1,"Senha é obrigatoria."),
  confirmPassword:z.string()
  .min(1,"A confirmação é obrigatoria.")
  })

  type createChangeInfoData = z.infer<typeof changeInfosSchema>
  const {register, handleSubmit, formState: {errors}} = useForm<createChangeInfoData>({resolver:zodResolver(changeInfosSchema)})


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
  <form  ref={refForm} onSubmit={handleSubmit(changeInfosProfile)}>
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
  {...register('name')}
  />
  <label htmlFor="email">Email ultilizado</label>
  <input 
  type="text" 
  {...register('email')}
  />
  <label htmlFor="password">Nova senha</label>
  <input 
  type="text" 
  {...register('password')}

  />
  <label htmlFor="confirmPassword">Confirmação senha</label>
  <input 
  type="text" 
  {...register('confirmPassword')}
  />
  <button>FAZER ALTERAÇÕES</button>
  </form>
  </section>
  </ConsultorLayout>
  </>
)
}