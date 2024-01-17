'use client'
import { useEffect,useRef } from "react";
import LayoutAdmin from "../../../components/LayoutAdmin";
import style from '../../../styles/removeConsultant.module.scss'
import { ConsultantDB } from "../../types/types";
import { getAdmLocalStorage } from "../../functions/getLocalStorage";
import { createCardConsultant } from "@/src/utils/createCards";
import { getConsultants } from "@/src/functions/getConsultanst";


export default function RemoverConsultores(){
  const containerRef = useRef<HTMLDivElement>(null)
  const warning = useRef<HTMLHeadingElement>(null)
  useEffect(()=>{
  const admLocal = getAdmLocalStorage()
  const filterAndRemove = async () =>{
    const conversedDb:ConsultantDB[] = await getConsultants()
    
    const processDb = await fetch('https://db-indicacoes.onrender.com/processos')
    const processConversed:any[] = await processDb.json()
    if(admLocal){
      const filterConsultant = conversedDb.filter(consultant=>(consultant.idresponsibleadm === admLocal[0].idadm ))
      if(filterConsultant.length>0){
        for(let i = 0; i<filterConsultant.length;i++){
          const totalProcess = processConversed.filter(process=>(process.idconsultor === filterConsultant[i].idconsultant))
          const finishedProcess = totalProcess.filter(process=>(process.mesfinalizado != ''))
          const createCard = await createCardConsultant(`${filterConsultant[i].name}`,filterConsultant[i].avatar,`${totalProcess.length}`,`${finishedProcess.length}`,'http://localhost:3001/mainAdm/remover','','',filterConsultant[i].id)
          if(containerRef.current){
            containerRef.current.append(createCard)
          }
        }
      }else{
        if(warning.current){
          warning.current.innerText = 'Você ainda não é responsavel por nenhum consultor'
        }
      }
    }
  }
  filterAndRemove()
  },[])

  return(
    <LayoutAdmin>
    <title>Remover Consultores</title>
    <main className={style.main}>
    <h1>Consultores</h1>
    <div ref={containerRef} className={style.container}>
      <h2 ref={warning}></h2>
    </div>
    </main>
    </LayoutAdmin>
  )
}