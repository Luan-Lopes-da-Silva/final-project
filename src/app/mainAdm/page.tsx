"use client"
import Image from "next/image";
import style from '@/src/styles/homeAdm.module.scss'
import totalProcess from '@/public/totalProcess.svg'
import defaultAvatar from '@/public/account_circle_FILL0_wght400_GRAD0_opsz24.svg'
import finishProcess from '@/public/finishProcess.svg'
import taxSvg from '@/public/taxSvg.svg'
import houseSvg from '@/public/houseSvg.svg'
import billsSvg from '@/public/billsSvg.svg'
import itauSvg from '@/public/itauSvg.svg'
import LayoutAdminDashboard from "@/src/components/LayoutAdmDashboard";
import { useEffect, useRef } from "react";
import getLocalStorage from "../functions/getLocalStorage";

export default function Home(){

  
  type User = {
    name: string
    email: string
    phone: string
    idadm: string
    id: number
    membersince: string
    role: string
    avatar: string
    position: number
  }


  const refSection = useRef<HTMLBodyElement>(null)
  useEffect(()=>{
  const userLocal = getLocalStorage()
  const url = process.env.NEXT_PUBLIC_APIURL
  async function topThree(){
  const consultants = await fetch ('https://consultant-db.onrender.com/consultants')
  const consultantArray:any[] = await consultants.json()
  const getProcess = await fetch(`${url}/processos`)
  const processArray:any[] = await getProcess.json()
  const filterTotal = processArray.filter(process=>(process.mesinicio !== ''))
  const filterFinisheds = processArray.filter(process=>(process.mesfinalizado !== ''))
  const consultantsGroup = filterFinisheds.reduce((acc,con)=>{
    const id = con.idconsultor

    if(!acc[id]){
      acc[id] = []
    }

    acc[id].push(con)

    return acc
  },{})

  const consultantsGroup2 = filterTotal.reduce((acc,con)=>{
    const id = con.idconsultor

    if(!acc[id]){
      acc[id] = []
    }

    acc[id].push(con)

    return acc
  },{})
  
  
  let consultoresClassificados:any[] = Object.values(consultantsGroup).sort((a, b) => {
    return calculateTotalProcessFinished(b) - calculateTotalProcessFinished(a);
  });

  let consultoresClassificados2:any[] = Object.values(consultantsGroup2).sort((a, b) => {
    return calculateTotalProcess(b) - calculateTotalProcess(a);
  });

  let index = -1
  if(consultoresClassificados.length>0){
    for (let i = 0; i<consultoresClassificados.length; i++){
      const article = document.createElement('article')
      const p = document.createElement('p')
      p.innerText = consultoresClassificados[i][0].nomeconsultor

      const filterFinisheds = consultoresClassificados[i].filter(process=>(process.mesfinalizado!=''))
      const filterNotFinished = consultoresClassificados[i].filter(process=>(process.mesinicio!=''))
     

      
      const searchConsultant = consultantArray.filter(consultant=>(consultant.name === p.innerText))
  
    
    
      const imgAvatar = document.createElement('img')
      imgAvatar.width = 90
      imgAvatar.height = 90

  
     let element = consultoresClassificados[i]
      console.log()
     if(consultoresClassificados[i] === element){
     index = i
      if(element[0].role === 'Adm'){
        console.log('É adm')
      }else{
        const consultantPosition = await fetch(`https://consultant-db.onrender.com/consultants/${element[0].id}`,{
        method: 'PATCH',
        body:JSON.stringify(
          {position: index+1}
        ),
        headers:{
          "Content-Type" : "application/json"
        }
      }) 
      }
     }
      if(searchConsultant[0].avatar === ''){
      imgAvatar.src = defaultAvatar.src
      }else{
      imgAvatar.src = searchConsultant[0].avatar
      }
     
     
      const divTotalProcess = document.createElement('div')
      const imgTotalProcess = document.createElement('img')
      const pTotalProcess = document.createElement('p')
      pTotalProcess.innerText =`+ ${filterNotFinished.length} processos totais`
      imgTotalProcess.width = 16
      imgTotalProcess.height = 16
      imgTotalProcess.src = totalProcess.src
      divTotalProcess.append(imgTotalProcess,pTotalProcess)
      
      const divFinishedProcess = document.createElement('div')
      const imgFinishProcess = document.createElement('img')
      const pFinishedProcess = document.createElement('p')
      pFinishedProcess.innerText =`+ ${filterFinisheds.length} processos finalizados`
    
      imgFinishProcess.width = 16
      imgFinishProcess.height = 16
      imgFinishProcess.src = finishProcess.src
      divFinishedProcess.append(imgFinishProcess,pFinishedProcess)
    
      const btn = document.createElement('button')
      btn.innerHTML = '<a href="">VER PERFIL</a>'
    
      article.append(p,imgAvatar,divTotalProcess,divFinishedProcess,btn)
    
      if(refSection.current){
      refSection.current.append(article)
      }
      }
  }else if(consultoresClassificados2.length>0){
    for (let i = 0; i<consultoresClassificados.length; i++){
      const article = document.createElement('article')
      const p = document.createElement('p')
      p.innerText = consultoresClassificados[i][0].nomeconsultor
    
     const filterNotFinished = consultoresClassificados[i].filter(process=>(process.mesinicio!=''))
     
     const searchConsultant = consultantArray.filter(consultant=>(consultant.nome === p.innerText))
    
     
    
      const imgAvatar = document.createElement('img')
      imgAvatar.width = 90
      imgAvatar.height = 90

      
      
      if(searchConsultant[0].avatar === ''){
      imgAvatar.src = defaultAvatar.src
      }else{
      imgAvatar.src = searchConsultant[0].avatar
      }
     
     
      const divTotalProcess = document.createElement('div')
      const imgTotalProcess = document.createElement('img')
      const pTotalProcess = document.createElement('p')
      pTotalProcess.innerText =`+ ${filterNotFinished.length} processos totais`
      imgTotalProcess.width = 16
      imgTotalProcess.height = 16
      imgTotalProcess.src = totalProcess.src
      divTotalProcess.append(imgTotalProcess,pTotalProcess)
      
      const divFinishedProcess = document.createElement('div')
      const imgFinishProcess = document.createElement('img')
      const pFinishedProcess = document.createElement('p')
      pFinishedProcess.innerText =`+ 0 processos finalizados`
    
      imgFinishProcess.width = 16
      imgFinishProcess.height = 16
      imgFinishProcess.src = finishProcess.src
      divFinishedProcess.append(imgFinishProcess,pFinishedProcess)
    
      const btn = document.createElement('button')
      btn.innerHTML = '<a href="">VER PERFIL</a>'
    
      article.append(p,imgAvatar,divTotalProcess,divFinishedProcess,btn)
    
      if(refSection.current){
      refSection.current.append(article)
      }
      }
  }else if(consultoresClassificados.length<1 && consultoresClassificados2.length<1){
    for(let i = 0; i<4; i++){
      const article = document.createElement('article')
      const p = document.createElement('p')
      p.innerText = processArray[i].nomeconsultor
    
     const totalProcessForConsultant = processArray.filter(process=>(process.nomeconsultor === p.innerText))
    
      const imgAvatar = document.createElement('img')
      imgAvatar.width = 90
      imgAvatar.height = 90
    
     
     
      const divTotalProcess = document.createElement('div')
      const imgTotalProcess = document.createElement('img')
      const pTotalProcess = document.createElement('p')
      pTotalProcess.innerText =`+ ${totalProcessForConsultant.length} processos totais`
      imgTotalProcess.width = 16
      imgTotalProcess.height = 16
      imgTotalProcess.src = totalProcess.src
      divTotalProcess.append(imgTotalProcess,pTotalProcess)
      
      const divFinishedProcess = document.createElement('div')
      const imgFinishProcess = document.createElement('img')
      const pFinishedProcess = document.createElement('p')
      pFinishedProcess.innerText =`+ ${consultoresClassificados[i].length} processos finalizados`
    
      imgFinishProcess.width = 16
      imgFinishProcess.height = 16
      imgFinishProcess.src = finishProcess.src
      divFinishedProcess.append(imgFinishProcess,pFinishedProcess)
    
      const btn = document.createElement('button')
      btn.innerHTML = '<a href="">VER PERFIL</a>'
    
      article.append(p,imgAvatar,divTotalProcess,divFinishedProcess,btn)
    
      if(refSection.current){
      refSection.current.append(article)
      }
    }
  }else{
    const p = document.createElement('p')
    p.innerText = 'Ainda não temos nenhum consultor cadastrado em nosso banco de dados'

    if(refSection.current){
      refSection.current.append(p)
    }
  }

  
  }

  function calculateTotalProcessFinished(consultant:any){
    return consultant.reduce((total:any,c:any)=>total+c.mesfinalizado,0)
  }

  function calculateTotalProcess(consultant:any){
    return consultant.reduce((total:any,c:any)=>total+c.mesinicio,0)
  }
  topThree()
  })
  return(
    <LayoutAdminDashboard>
      <title>ADM - Home</title>
    <div className={style.container}>
    <h1>Consultores</h1>
    <div className={style.cards}>
        <div className={style.sections}>
          <section className={style.section}>
            <h2>Mensais</h2>
            <div className={style.card}>
              <p>CONSULTORES</p>
              <span>+500</span>
              <p>NO ULTIMO MES</p>
            </div>
          </section>
          <section className={style.section}>
            <h2>Totais</h2>
            <div className={style.card}>
              <p>CONSULTORES</p>
              <span>+1500</span>
              <p>DESDE <br></br>O<br></br> LANÇAMENTO</p>
            </div>
          </section>

          <section className={style.section}>
            <h2>Semanais</h2>
            <div className={style.card}>
              <p>CONSULTORES</p>
              <span>+80</span>
              <p>NA ULTIMA SEMANA</p>
            </div>
          </section>
        </div>
        </div>

        <h1>Processos</h1>

        <div className={style.cards}>
        <div className={style.sections}>
          <section className={style.section}>
            <h2>Mensais</h2>
            <div className={style.card}>
              <p>PROCESSOS</p>
              <span>+600</span>
              <p>NO ULTIMO MES</p>
            </div>
            
          
          </section>
          <section className={style.section}>
            <h2>Totais</h2>
            <div className={style.card}>
              <p>PROCESSOS</p>
              <span>+6500</span>
              <p>DESDE <br></br>O<br></br> LANÇAMENTO</p>
            </div>
          </section>

          <section className={style.section}>
            <h2>Mensais</h2>
            <div className={style.card}>
              <p>PROCESSOS</p>
              <span>+560</span>
              <p>FINALIZADOS <br></br>NO ULTIMO MÊS</p>
            </div>
          </section>

          <section className={style.section}>
            <h2>Totais</h2>
            <div className={style.card}>
              <p>PROCESSOS</p>
              <span>+6460</span>
              <p>FINALIZADOS <br></br>DESDE O <br></br>LANÇAMENTO</p>
            </div>
          </section>
        </div>
        </div>
        
        <h1>Rankings</h1>
        <div className={style.cards}>
        <div className={style.sections}>
        <h3>TOP 3 CONSULTORES MENSAIS</h3>
          <section className={style.profiles} ref={refSection}>
          </section>
          <h3>ULTIMOS 5 PROCESSOS CADASTRADOS</h3>
          <section className={style.process}>
            <article>
              <Image
              width={90}
              height={90}
              alt="bank svg"
              src={itauSvg}
              ></Image>
              <div>
                <Image
                width={26}
                height={26}
                alt="taxs svg"
                src={taxSvg}
                ></Image>
                <p>6% JUROS/A</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="house svg"
                src={houseSvg}
                ></Image>
                <p>R$ 150,000.00</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="bills svg"
                src={billsSvg}
                ></Image>
                <p>240 parcelas</p>
              </div>
              <button>CHECAR PROCESSO</button>
            </article>
            <article>
              <Image
              width={90}
              height={90}
              alt="bank svg"
              src={itauSvg}
              ></Image>
              <div>
                <Image
                width={26}
                height={26}
                alt="taxs svg"
                src={taxSvg}
                ></Image>
                <p>6% JUROS/A</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="house svg"
                src={houseSvg}
                ></Image>
                <p>R$ 150,000.00</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="bills svg"
                src={billsSvg}
                ></Image>
                <p>240 parcelas</p>
              </div>
              <button>CHECAR PROCESSO</button>
            </article>

            <article>
              <Image
              width={90}
              height={90}
              alt="bank svg"
              src={itauSvg}
              ></Image>
              <div>
                <Image
                width={26}
                height={26}
                alt="taxs svg"
                src={taxSvg}
                ></Image>
                <p>6% JUROS/A</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="house svg"
                src={houseSvg}
                ></Image>
                <p>R$ 150,000.00</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="bills svg"
                src={billsSvg}
                ></Image>
                <p>240 parcelas</p>
              </div>
              <button>CHECAR PROCESSO</button>
            </article>
            <article>
              <Image
              width={90}
              height={90}
              alt="bank svg"
              src={itauSvg}
              ></Image>
              <div>
                <Image
                width={26}
                height={26}
                alt="taxs svg"
                src={taxSvg}
                ></Image>
                <p>6% JUROS/A</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="house svg"
                src={houseSvg}
                ></Image>
                <p>R$ 150,000.00</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="bills svg"
                src={billsSvg}
                ></Image>
                <p>240 parcelas</p>
              </div>
              <button>CHECAR PROCESSO</button>
            </article>
            <article>
              <Image
              width={90}
              height={90}
              alt="bank svg"
              src={itauSvg}
              ></Image>
              <div>
                <Image
                width={26}
                height={26}
                alt="taxs svg"
                src={taxSvg}
                ></Image>
                <p>6% JUROS/A</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="house svg"
                src={houseSvg}
                ></Image>
                <p>R$ 150,000.00</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="bills svg"
                src={billsSvg}
                ></Image>
                <p>240 parcelas</p>
              </div>
              <button>CHECAR PROCESSO</button>
            </article>
          </section>
        </div>
        </div>
        
      </div>
  
    </LayoutAdminDashboard>
  )
}