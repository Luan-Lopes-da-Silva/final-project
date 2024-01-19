'use client'

import LayoutAdmin from "@/src/components/LayoutAdmin"
import { useEffect, useRef, useState } from "react"
import defaultAvatar from '@/public/account_circle_FILL0_wght400_GRAD0_opsz24.svg'
import Image from "next/image"
import style from '@/src/styles/consultorDetails.module.scss'
import { getConsultantFromId } from "@/src/functions/getConsultanst"
export default function Page({params}:any){
  const refAvatar = useRef<HTMLImageElement>(null)
  const refName = useRef<HTMLHeadingElement>(null)
  const refMemberSince = useRef<HTMLHeadingElement>(null)
  const refPhone = useRef<HTMLHeadingElement>(null)
  const refEmail = useRef<HTMLHeadingElement>(null)
  const refFinishedProcess = useRef<HTMLHeadingElement>(null)
  const refTotalProcess = useRef<HTMLHeadingElement>(null)
  const [src,setSrc] = useState('')


  useEffect(()=>{
    async function getConsultant(){
      const consultantJson: any[] = await getConsultantFromId(params.id)
      

      const processDb = await fetch('https://db-indicacoes.onrender.com/processos')
      const processJson:any[] = await processDb.json()
      const filterTotalProcess = processJson.filter(process=>(process.idconsultor === consultantJson[0].idconsultant))
      const filterFinishedProcess = filterTotalProcess.filter(process=>process.mesfinalizado!= '')
      
      if(refAvatar.current && refName.current && refPhone.current && refEmail.current &&  refTotalProcess.current && refFinishedProcess.current && refMemberSince.current){
        if(consultantJson[0].avatar === ''){
          setSrc(defaultAvatar.src)
        }else{
          setSrc(consultantJson[0].avatar)
        }

        const newDate = new Date(consultantJson[0].membersince)
        
    
        refName.current.innerText = consultantJson[0].name
        refPhone.current.innerText = `Telefone : ${consultantJson[0].phone}`
        refEmail.current.innerText = `Email : ${consultantJson[0].email}`
        refTotalProcess.current.innerText = `Total de processos na plataforma : ${filterTotalProcess.length}`
        refFinishedProcess.current.innerText = `Numero de processos finalizados : ${filterFinishedProcess.length}`
        refMemberSince.current.innerText = `Membro desde : ${newDate.toLocaleString('pt-BR',{timeZone: 'UTC'}).substring(0,10)}`
      }

   
    }
    getConsultant()
  })
return(
  <LayoutAdmin>
    <title>Detalhes do consultor</title>
  <section className={style.container}>
    <div>
      <Image
      width={180}
      height={180}
      alt="avatar"
      src={src}
      ref={refAvatar}
      ></Image>
      <h1 ref={refName}></h1>
    </div>
    <h3 ref={refPhone}></h3>
    <h3 ref={refEmail}></h3>
    <h3 ref={refTotalProcess}></h3>
    <h3 ref={refFinishedProcess}></h3>
    <h3 ref={refMemberSince}></h3>
    
  </section>
  </LayoutAdmin>
  
)
}