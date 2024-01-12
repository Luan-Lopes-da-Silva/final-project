"use client"
import Image from "next/image";
import style from '@/src/styles/homeAdm.module.scss'
import avatarSvg from '@/public/avatarPhoto.svg'
import totalProcess from '@/public/totalProcess.svg'
import finishProcess from '@/public/finishProcess.svg'
import taxSvg from '@/public/taxSvg.svg'
import houseSvg from '@/public/houseSvg.svg'
import billsSvg from '@/public/billsSvg.svg'
import itauSvg from '@/public/itauSvg.svg'
import LayoutAdminDashboard from "@/src/components/LayoutAdmDashboard";
import { useEffect, useRef } from "react";

export default function Home(){
  const refSection = useRef<HTMLBodyElement>(null)
  useEffect(()=>{
  const url = process.env.NEXT_PUBLIC_APIURL
  async function topThree(){
  const consultants = await fetch ('http://localhost:3000/consultores')
  const consultantArray:any[] = await consultants.json()
  const getProcess = await fetch(`${url}/processos`)
  const processArray:any[] = await getProcess.json()
  const filterFinisheds = processArray.filter(process=>(process.mesfinalizado !== ''))
  const consultantsGroup = filterFinisheds.reduce((acc,con)=>{
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
 

  for (let i = 0; i<consultoresClassificados.length; i++){
  const article = document.createElement('article')
  const p = document.createElement('p')
  p.innerText = consultoresClassificados[i][0].nomeconsultor

 const searchConsultant = consultantArray.filter(consultant=>(consultant.nome === p.innerText))

 const totalProcessForConsultant = processArray.filter(process=>(process.nomeconsultor === p.innerText))

    console.log(searchConsultant[0].avatar)

  const imgAvatar = document.createElement('img')
  imgAvatar.width = 90
  imgAvatar.height = 90
  imgAvatar.src = searchConsultant[0].avatar
 
 
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
  }

  function calculateTotalProcessFinished(consultant:any){
    return consultant.reduce((total:any,c:any)=>total+c.mesfinalizado,0)
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