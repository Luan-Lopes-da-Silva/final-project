'use client'
import { useEffect,useRef } from "react";
import LayoutAdmin from "../../../components/LayoutAdmin";
import style from '../../../styles/removeConsultant.module.scss'
import { ConsultantDB } from "../../types/types";
import { getAdmLocalStorage } from "../../functions/getLocalStorage";
import avatarSvgDefault from '@/public/account_circle_FILL0_wght400_GRAD0_opsz24.svg'
import svgTotalProcess from '@/public/totalProcess.svg'
import svgFinishedProcess from '@/public/finishProcess.svg'


export default function RemoverConsultores(){
  const containerRef = useRef<HTMLDivElement>(null)
  const warning = useRef<HTMLHeadingElement>(null)
  useEffect(()=>{
  const admLocal = getAdmLocalStorage()
  const filterAndRemove = async () =>{
    const consultantsDb = await fetch('https://consultant-db.onrender.com/consultants')  
    const conversedDb:ConsultantDB[] = await consultantsDb.json()

    const processDb = await fetch('https://db-indicacoes.onrender.com/processos')
    const processConversed:any[] = await processDb.json()
    if(admLocal){
      const filterConsultant = conversedDb.filter(consultant=>(consultant.idresponsibleadm === admLocal[0].idadm ))
      if(filterConsultant.length>0){
        for(let i = 0; i<filterConsultant.length;i++){
          const articleContainer = document.createElement('article')
          
          const nameSpan = document.createElement('span')
          nameSpan.innerText = filterConsultant[i].name

          const profileImg = document.createElement('img')
          profileImg.width = 90
          profileImg.height = 90
          profileImg.alt = 'Profile image'
          if(filterConsultant[i].avatar === ''){
          profileImg.src = avatarSvgDefault.src
          }else{
          profileImg.src = filterConsultant[i].avatar
          }

          const totalProcess = processConversed.filter(process=>(process.idconsultor === filterConsultant[i].idconsultant))

          const divTotalProcess = document.createElement('div')
          const spanTotalProcess = document.createElement('span')
          spanTotalProcess.innerText = `+${totalProcess.length} Processos totais`
          const imgTotalProcess = document.createElement('img')
          imgTotalProcess.width = 16
          imgTotalProcess.height = 16
          imgTotalProcess.alt = 'Total process icon'
          imgTotalProcess.src = svgTotalProcess.src
          divTotalProcess.append(imgTotalProcess,spanTotalProcess)


          const finishedProcess = totalProcess.filter(process=>(process.mesfinalizado != ''))
          const divFinishedProcess = document.createElement('div')
          const spanFinishedProcess = document.createElement('span')
          spanFinishedProcess.innerText = `+${finishedProcess.length} Processos finalizados`
          const imgFinishedProcess = document.createElement('img')
          imgFinishedProcess.width = 16
          imgFinishedProcess.height = 16
          imgFinishedProcess.alt = 'Total process icon'
          imgFinishedProcess.src = svgFinishedProcess.src
          divFinishedProcess.append(imgFinishedProcess,spanFinishedProcess)

          const button = document.createElement('button')
          button.innerText = 'DELETAR CONSULTOR'
          button.addEventListener('click', async ()=>{
          try {
            const dbCalled = await fetch(`https://consultant-db.onrender.com/consultants/${filterConsultant[i].id}`,{
            method: "DELETE",
          });
          if(dbCalled.ok){
          location.reload()
          }else{
          alert('Falha ao excluir consultor')
          }
          } catch (error) {
            console.error('Erro ao excluir consultor', error)
          }

          })

          articleContainer.append(nameSpan,profileImg,divTotalProcess,divFinishedProcess,button)
          if(containerRef.current){
            containerRef.current.append(articleContainer)
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