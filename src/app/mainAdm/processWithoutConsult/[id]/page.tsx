'use client'
import LayoutAdmin from "@/src/components/LayoutAdmin";
import { FormEvent, useEffect, useRef, useState } from "react";
import style from '@/src/styles/processWithoutConsult.module.scss'

export default function ProcessPage({params}:any){
  const nomeClienteRef = useRef<HTMLSpanElement>(null)
  const emailClienteRef = useRef<HTMLSpanElement>(null)
  const telefoneClienteRef = useRef<HTMLSpanElement>(null)
  const valorImovelRef = useRef<HTMLSpanElement>(null)
  const parcelasRef = useRef<HTMLSpanElement>(null)
  const primeiraParcelaRef = useRef<HTMLSpanElement>(null)
  const ultimaParcelaRef = useRef<HTMLSpanElement>(null)
  const modalidadeRef = useRef<HTMLSpanElement>(null)
  const errorSpanRef = useRef<HTMLSpanElement>(null)
  const [search,setSearch] = useState('')

  type Consult = {
    nome: string
    telefone: string
    email: string
    idConsultor: string
  }

  type Adm = {
    name: string
    phone: string
    email: string
    idAdm: string
  }


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
    if(nomeClienteRef.current && emailClienteRef.current && telefoneClienteRef.current && valorImovelRef.current && parcelasRef.current && primeiraParcelaRef.current && ultimaParcelaRef.current && modalidadeRef.current){
    nomeClienteRef.current.innerText = `Nome do cliente: ${responseJson[0].nomecliente}`  
    emailClienteRef.current.innerText = `Email do cliente: ${responseJson[0].emailcliente}`
    telefoneClienteRef.current.innerText = `Telefone do cliente: ${responseJson[0].telefonecliente}`
    valorImovelRef.current.innerText = `Valor do imovel: ${responseJson[0].valorimovel}`
    parcelasRef.current.innerText = `Numero de parcelas: ${responseJson[0].numeroparcelas}`
    primeiraParcelaRef.current.innerText = `Valor da primeira parcela: ${responseJson[0].primeiraparcela}`
    ultimaParcelaRef.current.innerText = `Valor da ultima parcela: ${responseJson[0].ultimaparcela}`
    modalidadeRef.current.innerText = `Sistema de amortização: ${responseJson[0].amortizacao}`
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
      alert(`O processo foi designado ao consultor ${filterAdm[0].name} com sucesso`)
      setTimeout(() => {    
      window.location.href = '/mainAdm/processos'
      }, 1000);
    }
  }else if(filterConsult.length>0){
    console.log(filterConsult)
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
      alert(`O processo foi designado ao consultor ${filterConsult[0].name} com sucesso`)
      setTimeout(() => {    
      window.location.href = '/mainAdm/processos'
      }, 1000);
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
          <span ref={nomeClienteRef}></span>
          <span ref={emailClienteRef}></span>
          <span ref={telefoneClienteRef}></span>
        </section>
        <section>
          <h1>Dados do imóvel</h1>
          <span ref={valorImovelRef}></span>
          <span ref={parcelasRef}></span>
          <span ref={primeiraParcelaRef}></span>
          <span ref={ultimaParcelaRef}></span>
          <span ref={modalidadeRef}></span>
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