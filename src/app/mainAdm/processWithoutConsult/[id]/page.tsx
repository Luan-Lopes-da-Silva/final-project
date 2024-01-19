'use client'
import LayoutAdmin from "@/src/components/LayoutAdmin";
import { FormEvent, useEffect, useRef, useState } from "react";
import style from '@/src/styles/processWithoutConsult.module.scss'
import emailJs from '@emailjs/browser'


export default function ProcessPage({params}:any){
  const clientNameRef = useRef<HTMLSpanElement>(null)
  const clientEmailRef = useRef<HTMLSpanElement>(null)
  const clientPhoneRef = useRef<HTMLSpanElement>(null)
  const immobileValueRef = useRef<HTMLSpanElement>(null)
  const installmentsRef = useRef<HTMLSpanElement>(null)
  const firstInstallmentRef = useRef<HTMLSpanElement>(null)
  const lastInstallmentRef = useRef<HTMLSpanElement>(null)
  const modalityRef = useRef<HTMLSpanElement>(null)
  const errorSpanRef = useRef<HTMLSpanElement>(null)
  const [search,setSearch] = useState('')

  type Process ={
    nomecliente: string
    emailcliente: string
    telefonecliente:string
    valorimovel: string
    numeroparcelas : number
    primeiraparcela : string
    ultimaparcela : string
    banco: string
    amortizacao: string
    juros: string
    etapa: string
    status: string
    nomeConsultor: string
    telefoneConsultor : string
    idConsultor: string
    protocoloAleatorio: string
    id: number
  }

  async function getProcess(){
   try {
    const dbResponse = await fetch(`https://db-indicacoes.onrender.com/processos/${params.id}`)
    const responseJson:Process[] = await dbResponse.json()
    if(clientNameRef.current && clientEmailRef.current && clientPhoneRef.current && immobileValueRef.current && installmentsRef.current && firstInstallmentRef.current && lastInstallmentRef.current && modalityRef.current){
    clientNameRef.current.innerText = `Nome do cliente: ${responseJson[0].nomecliente}`  
    clientEmailRef.current.innerText = `Email do cliente: ${responseJson[0].emailcliente}`
    clientPhoneRef.current.innerText = `Telefone do cliente: ${responseJson[0].telefonecliente}`
    immobileValueRef.current.innerText = `Valor do imovel: ${responseJson[0].valorimovel}`
    installmentsRef.current.innerText = `Numero de parcelas: ${responseJson[0].numeroparcelas}`
    firstInstallmentRef.current.innerText = `Valor da primeira parcela: ${responseJson[0].primeiraparcela}`
    lastInstallmentRef.current.innerText = `Valor da ultima parcela: ${responseJson[0].ultimaparcela}`
    modalityRef.current.innerText = `Sistema de amortização: ${responseJson[0].amortizacao}`
    }
   } catch (error) {
   console.log(error)
   }
  }

  async function designateProcess(ev:FormEvent){
  ev.preventDefault()
  const dbConsults = await fetch('https://consultant-db.onrender.com/consultants')
  const conversedDb:any[] = await dbConsults.json() 
  const filterConsult = conversedDb.filter((consult)=>consult.idconsultant === search)
  const dbAdms = await fetch('https://db-adm.onrender.com/adms')
  const conversedAdms:any[] = await dbAdms.json()
  const filterAdm = conversedAdms.filter((adm)=>adm.idadm === search)
  const fetchApi = await fetch(`https://db-indicacoes.onrender.com/processos/${params.id}`)
  const fetchConverse = await fetchApi.json()
  
  if(filterAdm.length>0){
    if(errorSpanRef.current){
      errorSpanRef.current.innerText = ''  
      const inputProcess = await fetch(`https://db-indicacoes.onrender.com/processos/${params.id}`,{
        method: "PATCH",
        body:JSON.stringify(
          {nomeConsultor:filterAdm[0].name, 
            telefoneConsultor:filterAdm[0].phone,
            emailConsultor:filterAdm[0].email,
          idConsultor:filterAdm[0].idadm,
          etapa: 'Recolhimento de Documentos',
          status: 'Em andamento'
          }
        ),
        headers:{
          "Content-Type": "application/json"
        }
      })

      const templateParams = {
        from_name : 'Pedido aceito',
        to_name : fetchConverse[0].nomecliente,
        cliente : fetchConverse[0].emailcliente,
        email: filterAdm[0].email
      }
      emailJs.send("service_9borhco","template_7knjm3o",templateParams,"cdlEsrcoJqfdlXB6x").then((res)=>{
        alert(`O processo foi designado ao consultor ${filterAdm[0].name} com sucesso`)
        if(res.status === 200){
          setTimeout(() => {    
            window.location.href = '/mainAdm/processos'
            }, 1000);
        }
      })   
    }
  }else if(filterConsult.length>0){
    if(errorSpanRef.current){
      errorSpanRef.current.innerText = ''  
      const inputProcess = await fetch(`https://db-indicacoes.onrender.com/processos/${params.id}`,{
        method: "PATCH",
        body:JSON.stringify(
          {nomeConsultor:filterConsult[0].name, telefoneConsultor:filterConsult[0].phone,emailConsultor:filterConsult[0].email,
          idConsultor:filterConsult[0].idconsultant,
          etapa: 'Recolhimento de Documentos',
          status: 'Em andamento'
          }
        ),
        headers:{
          "Content-Type": "application/json"
        }
      })
      
      console.log(fetchConverse)
      const templateParams = {
        from_name : 'Pedido aceito',
        to_name : fetchConverse[0].nomecliente,
        cliente : fetchConverse[0].emailcliente,
        email: filterConsult[0].email
      }
      emailJs.send("service_9borhco","template_7knjm3o",templateParams,"cdlEsrcoJqfdlXB6x").then((res)=>{
        alert(`O processo foi designado ao consultor ${filterConsult[0].name} com sucesso`)
        if(res.status === 200){
          setTimeout(() => {    
            window.location.href = '/mainAdm/processos'
            }, 1000);
        }
      })   
      
      
   
    } 
  }
  else if(filterConsult.length<1){
  if(errorSpanRef.current){
    errorSpanRef.current.innerText = 'Consultor não encontrado em nosso banco de dados'  
  }
  }else if(filterAdm.length<1){
    if(errorSpanRef.current){
      errorSpanRef.current.innerText = 'Consultor não encontrado em nosso banco de dados'  
    }
  } 
  }

  useEffect(()=>{
  getProcess()  
  })
  return(
    <LayoutAdmin>
      <title>Detalhes do processo</title>
      <div className={style.container}>
        <section>
          <h1>Dados do proponente</h1>
          <span ref={clientNameRef}></span>
          <span ref={clientEmailRef}></span>
          <span ref={clientPhoneRef}></span>
        </section>
        <section>
          <h1>Dados do imóvel</h1>
          <span ref={immobileValueRef}></span>
          <span ref={installmentsRef}></span>
          <span ref={firstInstallmentRef}></span>
          <span ref={lastInstallmentRef}></span>
          <span ref={modalityRef}></span>
        </section>
        <section>
          <h1>Dados do consultor</h1>
          <p>Ainda não a definido</p>
        </section>
        <section>
          <h1>Status do processo</h1>
          <p>Aguardando algum de nossos consultores aceitarem o processo</p>
        </section>
        <form onSubmit={(ev)=>designateProcess(ev)}>
          <label htmlFor="idConsultor">ID Consultor</label>
          <span ref={errorSpanRef} className={style.errorSpan}></span>
          <input
          type="text"
          id="idConsultor"
          name="idConsultor"
          value={search}
          onChange={(ev)=>setSearch(ev.currentTarget.value)}
          />
          <button>DESIGNAR PROCESSO</button>
        </form>
      </div>
    </LayoutAdmin>
  )
}