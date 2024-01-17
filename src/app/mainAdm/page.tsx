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
import { createCardConsultant } from "@/src/utils/createCards";


export default function Home(){

  



  const refSection = useRef<HTMLBodyElement>(null)
  const lastFiveProcessRef = useRef<HTMLBodyElement>(null)
  useEffect(()=>{
  const url = process.env.NEXT_PUBLIC_APIURL
  async function topThree(){
  const consultants = await fetch ('https://consultant-db.onrender.com/consultants')
  const consultantArray:any[] = await consultants.json()
  const adms = await fetch("https://db-adm.onrender.com/adms")
  const admsArray:any[] = await adms.json()
  const getProcess = await fetch(`${url}/processos`)
  const processArray:any[] = await getProcess.json()
  const filterTotal = processArray.filter(process=>(process.mesinicio != ''))
  const filterFinisheds = processArray.filter(process=>(process.mesfinalizado != ''))
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
      const filterFinisheds = consultoresClassificados[i].filter(process=>(process.mesfinalizado!=''))
      const filterNotFinished = consultoresClassificados2[i].filter(process=>(process.emailconsultor === consultoresClassificados[i][0].emailconsultor))
      const searchConsultant = consultantArray.filter(consultant=>(consultant.name === consultoresClassificados[i][0].nomeconsultor))

      
      const createCard = await createCardConsultant(consultoresClassificados[i][0].nomeconsultor,searchConsultant[0].avatar,`${filterNotFinished.length}`,`${filterFinisheds.length}`,'http://localhost:3001/mainAdm',consultoresClassificados[i][0].idconsultor,consultoresClassificados[i][0].emailconsultor,'')

     let element = consultoresClassificados[i]

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
      if(refSection.current){
      refSection.current.append(createCard)
      }
      }
  }else if(consultoresClassificados2.length>0){
    for (let i = 0; i<consultoresClassificados.length; i++){    
     const filterNotFinished = consultoresClassificados[i].filter(process=>(process.mesinicio!=''))

     const searchConsultant = consultantArray.filter(consultant=>(consultant.nome === consultoresClassificados[i][0].nomeconsultor))
      
      const createCard = await createCardConsultant(consultoresClassificados2[i][0].nomeconsultor,searchConsultant[0].avatar,`${filterNotFinished.length}`,`0`,'http://localhost:3001/mainAdm',consultoresClassificados2[i][0].idconsultor,consultoresClassificados2[i][0].emailconsultor,'')
    
      if(refSection.current){
      refSection.current.append(createCard)
      }
      }
  }else if(consultoresClassificados.length<1 && consultoresClassificados2.length<1){
    for(let i = 0; i<4; i++){
      const totalProcessForConsultant = processArray.filter(process=>(process.nomeconsultor === processArray[i].nomeconsultor))
  
      const searchConsultant = consultantArray.filter(consultant=>(consultant.nome === consultoresClassificados[i][0].nomeconsultor))
    
      const createCard = await createCardConsultant(consultoresClassificados[i][0].nomeconsultor,searchConsultant[0].avatar,`${totalProcessForConsultant.length}`,`${consultoresClassificados[i].length}`,'http://localhost:3001/mainAdm',consultoresClassificados2[i][0].idconsultor,consultoresClassificados2[i][0].emailconsultor,'')
      if(refSection.current){
      refSection.current.append(createCard)
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

  async function lastFiveProcess(){
  const processDb = await fetch(`${url}/processos`)
  const conversedProcess:any[] = await processDb.json()
  
  for(let i = conversedProcess.length -5; i<conversedProcess.length;i++){
    const article = document.createElement('article')
    article.id = conversedProcess[i].id
    
    const bankImg = document.createElement('img')
    bankImg.width = 90
    bankImg.height = 90
    bankImg.alt = 'Bank Svg'

    if(conversedProcess[i].banco === 'bradesco' || conversedProcess[i].banco === 'Bradesco'){
      bankImg.src = itauSvg.src
    }

    const divTaxs = document.createElement('div')
    const imgTaxs = document.createElement('img')
    imgTaxs.width = 26
    imgTaxs.height = 26
    imgTaxs.alt = 'taxs svg'
    imgTaxs.src = taxSvg.src
    const taxsP = document.createElement('p')
    taxsP.innerText = `${conversedProcess[i].juros} JUROS/A`
    
    const divImmobile = document.createElement('div')
    const imgImmobile = document.createElement('img')
    imgImmobile.width = 26
    imgImmobile.height = 26
    imgImmobile.alt = 'immobile svg'
    imgImmobile.src = houseSvg.src
    const immobileP = document.createElement('p')
    immobileP.innerText = `R$ ${conversedProcess[i].valorimovel}`

    const divTerms = document.createElement('div')
    const imgTerms = document.createElement('img')
    imgTerms.width = 26
    imgTerms.height = 26
    imgTerms.alt = 'terms svg'
    imgTerms.src = billsSvg.src
    const termsP = document.createElement('p')
    termsP.innerText = `${conversedProcess[i].numeroparcelas} PARCELAS`
    

    divTerms.append(imgTerms,termsP)
    divTaxs.append(imgTaxs,taxsP)
    divImmobile.append(imgImmobile,immobileP)

    const button = document.createElement('button')
    button.innerHTML = `<a href="/pesquisa/${conversedProcess[i].id}">CHECAR PROCESSO</a>`
    article.append(bankImg,divTaxs,divImmobile,divTerms,button)
    if(lastFiveProcessRef.current){
      lastFiveProcessRef.current.append(article)
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
  lastFiveProcess()
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
          <section className={style.process} ref={lastFiveProcessRef}>
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