'use client'
import React from "react"
import { ChangeEvent, FormEvent, useEffect ,useRef, useState} from "react"
import style from '../../../../styles/processoConsultor.module.scss'
import emailJs from '@emailjs/browser'

import ConsultorLayout from "@/src/components/ConsultorLayout"
interface ProcessProps{
  params:{
    id: string
  }
}
type Params = {
  id: string
}

const Process:React.FC<ProcessProps> = ({params})=>{
  const refBanco = useRef<HTMLHeadingElement>(null)
  const refParcelas = useRef<HTMLHeadingElement>(null)
  const refValor = useRef<HTMLHeadingElement>(null)
  const refEmail = useRef<HTMLHeadingElement>(null)
  const refNome = useRef<HTMLHeadingElement>(null)
  const refTelefone = useRef<HTMLHeadingElement>(null)
  const firstCircle = useRef<HTMLDivElement>(null)
  const secondCircle = useRef<HTMLDivElement>(null)
  const thirdCircle = useRef<HTMLDivElement>(null)
  const fourthCircle = useRef<HTMLDivElement>(null)
  const clienteNome = useRef<HTMLHeadingElement>(null)
  const clienteTelefone = useRef<HTMLHeadingElement>(null)
  const clienteEmail = useRef<HTMLHeadingElement>(null)
  const messageRef = useRef<HTMLHeadingElement>(null)
  const hideInputsRef = useRef<HTMLDivElement>(null)
  const [status,setStatus] = useState('')
  const [etapa,setEtapa] = useState('')
  const [message,setMessage] = useState('')
  
  type User = {
    avatar: string
    email: string
    id: number
    idConsultor: string
    nome: string
    telefone: string
    role: string
    memberSince: string
  }

  useEffect(()=>{
  const url = process.env.NEXT_PUBLIC_APIURL
  const getProcess = async() =>{
    function getLocalStorage(): User  {
      const dataString = localStorage.getItem('Usuario Logado')
      const defaultUser:User = {
        avatar: 'Undefined',
        email:  'Undefined',
        id: 12,
        idConsultor: 'Undefined',
        nome: 'Undefined',
        telefone: 'Undefined',
        memberSince: 'Undefined',
        role: 'Undefined'
      }
  
      if(dataString){
        return JSON.parse(dataString)
      }else{
        alert('Você não se encontra logado iremos te redirecionar pra página de login.') 
        setTimeout(()=>{
        location.href = 'consultorAdm/login'
        },500)   
        return defaultUser
      }
    }
  const userLocal = getLocalStorage() 
  const operation = await fetch(`${url}/processos/${params.id}`)
  const conversedOperation = await operation.json()
  
 

  if(refBanco.current && refValor.current && refParcelas.current && refNome.current && refEmail.current && clienteEmail.current && clienteNome.current && clienteTelefone.current && firstCircle.current && secondCircle.current && thirdCircle.current && fourthCircle.current && refTelefone.current && messageRef.current){
    refBanco.current.innerText = `Banco: ${conversedOperation[0].banco}`
    refValor.current.innerText = `Valor: ${conversedOperation[0].valorimovel}`
    refParcelas.current.innerText = `Parcelas: ${conversedOperation[0].numeroparcelas}`
  
    refNome.current.innerText = `Nome : ${conversedOperation[0].nomeconsultor}`
    refEmail.current.innerText = `Email : ${conversedOperation[0].emailconsultor}`
    refTelefone.current.innerText = `Telefone : ${conversedOperation[0].telefoneconsultor}`
  
    clienteNome.current.innerText = `Nome : ${conversedOperation[0].nomecliente}`
    clienteEmail.current.innerText = `Email : ${conversedOperation[0].emailcliente}`
    clienteTelefone.current.innerText = `Telefone : ${conversedOperation[0].telefonecliente}`
  
    
  
     if(conversedOperation[0].etapa === 'Recolhimento de Documentos' && conversedOperation[0].status === 'Em Andamento' || conversedOperation[0].status === 'Em andamento'){
      firstCircle.current.style.backgroundColor = 'Yellow'
      messageRef.current.innerText = 'Os interessados no financiamento imobiliário devem fornecer documentação pessoal, comprovantes de renda, e outros documentos necessários para a análise do banco.'
     }else if(conversedOperation[0].etapa === 'Recolhimento de Documentos' && conversedOperation[0].status === 'Recusada'){
      firstCircle.current.style.backgroundColor = 'Red'
      messageRef.current.innerText = conversedOperation[0].message
     }else if(conversedOperation[0].etapa === 'Recolhimento de Documentos' && conversedOperation[0].status === 'Aceita'){
      firstCircle.current.style.backgroundColor = 'Green'
      secondCircle.current.style.backgroundColor = 'Yellow'
      messageRef.current.innerText = 'Parabéns! Recebemos seus documentos. Estamos iniciando a análise para o financiamento do seu imóvel. Em breve, entraremos em contato.'
     }else if(conversedOperation[0].etapa === 'Analise Bancaria' && conversedOperation[0].status === 'Em Andamento'){
      firstCircle.current.style.backgroundColor = 'Green'
      secondCircle.current.style.backgroundColor = 'Yellow'
      messageRef.current.innerText = 'O banco revisa os documentos fornecidos, avalia a capacidade financeira do solicitante e verifica a viabilidade do financiamento. Essa etapa inclui a verificação de histórico de crédito e outros critérios de elegibilidade.'
     }else if(conversedOperation[0].etapa === 'Analise Bancaria' && conversedOperation[0].status === 'Recusada'){
      firstCircle.current.style.backgroundColor = 'Green'
      secondCircle.current.style.backgroundColor = 'Red'
      messageRef.current.innerText = conversedOperation[0].message
     }else if(conversedOperation[0].etapa === 'Analise Bancaria' && conversedOperation[0].status === 'Aceita'){
      firstCircle.current.style.backgroundColor = 'Green'
      secondCircle.current.style.backgroundColor = 'Green'
      messageRef.current.innerText = 'Ótima notícia! Sua análise bancária foi aprovada. Agora, avançaremos para a próxima etapa do financiamento imobiliário.'
     }else if(conversedOperation[0].etapa === 'Vistoria de Imovel' && conversedOperation[0].status === 'Em Andamento'){
      firstCircle.current.style.backgroundColor = 'Green'
      secondCircle.current.style.backgroundColor = 'Green'
      thirdCircle.current.style.backgroundColor = 'Yellow'
      messageRef.current.innerText = 'Uma vistoria é realizada no imóvel para avaliar suas condições físicas e determinar seu valor de mercado. Isso é crucial para o banco garantir que o imóvel ofereça a segurança necessária para o financiamento.'
     }else if(conversedOperation[0].etapa === 'Vistoria de Imovel' && conversedOperation[0].status === 'Recusada'){
      firstCircle.current.style.backgroundColor = 'Green'
      secondCircle.current.style.backgroundColor = 'Green'
      thirdCircle.current.style.backgroundColor = 'Red'
      messageRef.current.innerText = conversedOperation[0].message
     }else if(conversedOperation[0].etapa === 'Vistoria de Imovel' && conversedOperation[0].status === 'Aceita'){
      firstCircle.current.style.backgroundColor = 'Green'
      secondCircle.current.style.backgroundColor = 'Green'
      thirdCircle.current.style.backgroundColor = 'Green'
      messageRef.current.innerText = 'A vistoria do seu imóvel foi concluída com sucesso! Estamos prosseguindo para as etapas finais do financiamento. Logo teremos novidades.'
     }else if(conversedOperation[0].etapa === 'Emissao do Contrato' && conversedOperation[0].status === 'Em Andamento'){
     fourthCircle.current.style.backgroundColor = 'Yellow'
     }else if(conversedOperation[0].etapa === 'Emissao do Contrato' && conversedOperation[0].status === 'Recusada'){
      firstCircle.current.style.backgroundColor = 'Green'
      secondCircle.current.style.backgroundColor = 'Green'
      thirdCircle.current.style.backgroundColor = 'Green'
      fourthCircle.current.style.backgroundColor = 'Red'
      messageRef.current.innerText = conversedOperation[0].message
     }else if(conversedOperation[0].etapa === 'Emissao do Contrato' &&     conversedOperation[0].status === 'Aceita'){
      firstCircle.current.style.backgroundColor = 'Green'
      secondCircle.current.style.backgroundColor = 'Green'
      thirdCircle.current.style.backgroundColor = 'Green'
      fourthCircle.current.style.backgroundColor = 'Green'
      messageRef.current.innerText = 'Parabéns! Seu financiamento foi aprovado, e o contrato está pronto para assinatura. Em breve, você será o(a) proprietário(a) do seu novo lar.'
     }
  }
  }
  getProcess()
  })

  async function refuseProcess(event:ChangeEvent<HTMLSelectElement>){
  if(event.currentTarget && hideInputsRef.current){
    setStatus(event.target.value) 

    if(event.currentTarget.value === 'Recusada'){
    hideInputsRef.current.style.display = 'block'

    const url = process.env.NEXT_PUBLIC_APIURL
    const operation = await fetch(`${url}/indicacoes/${params.id}`)
    const conversedOperation = await operation.json()
    const userDb = await fetch(`${url}/indicacoes/${params.id}`,{
      method: "PUT",
      body: JSON.stringify(
        {
          status: conversedOperation.status,
          etapa:conversedOperation.etapa,
          message: message
        }
      ),
      headers: {
        "Content-Type": "application/json"
      }
      })
      
    }else{
    hideInputsRef.current.style.display = 'none'
    }
  }


  }

  async function alteraStatus(ev:FormEvent){
  ev.preventDefault()
  const url = process.env.NEXT_PUBLIC_APIURL
  const data = new Date()
  const numeroMes = data.getMonth()
  var nomesDosMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  var nomeDoMes = nomesDosMeses[numeroMes];
  if(etapa === 'Emissao do Contrato' && status === 'Aceita'){
    const userDb = await fetch(`${url}/processos/${params.id}`,{
      method: "PUT",
      body: JSON.stringify(
        {
          mesFinalizado: nomeDoMes,
          status,
          etapa,
          message:message
        }
      ),
      headers: {
        "Content-Type": "application/json"
      }
      })
      const operation = await fetch(`${url}/processos/${params.id}`)
      const conversedOperation = await operation.json()
      if(messageRef.current){
        const templateParams = {
          to_name : conversedOperation[0].nomecliente,
          cliente:conversedOperation[0].emailcliente,
          consultor:conversedOperation[0].nomeconsultor,
          etapa : 'Emissão do Contrato',
          status : 'Aceita',
          message : messageRef.current.innerText
        }
        emailJs.send("service_9borhco","template_ije200f",templateParams,"cdlEsrcoJqfdlXB6x").then((res)=>{
          console.log('Email Enviado', res.status, res.text)
        })
      }
  }else{
    const userDb = await fetch(`${url}/processos/${params.id}`,{
      method: "PUT",
      body: JSON.stringify(
        {
          status,
          etapa,
          message:message,
          mesFinalizado: ''
        }
      ),
      headers: {
        "Content-Type": "application/json"
      }
      })

    const operation = await fetch(`${url}/processos/${params.id}`)
    const conversedOperation = await operation.json()
  
      if(messageRef.current){
        const templateParams = {
          to_name : conversedOperation[0].nomecliente,
          cliente:conversedOperation[0].emailcliente,
          consultor:conversedOperation[0].nomeconsultor,
          etapa : etapa,
          status : status,
          message : messageRef.current.innerText
        }
          emailJs.send("service_9borhco","template_ije200f",templateParams,"cdlEsrcoJqfdlXB6x").then((res)=>{
            console.log('Email Enviado', res.status, res.text)
          })

      }
  }
  }

  return(
  <ConsultorLayout>
  <title>Checagem de Processo </title>
  <div className={style.geralContainer}>
  <div className={style.section}>
    <h1>Dados do Imovel</h1>
    <h3 ref={refBanco}></h3>
    <h3 ref={refParcelas}></h3>
    <h3 ref={refValor}></h3>
  </div>
  <div className={style.section}>
    <h1>Dados do Proponente</h1>
    <h3 ref={clienteNome}></h3>
    <h3 ref={clienteEmail}></h3>
    <h3 ref={clienteTelefone}></h3>
  </div>
  <div className={style.section}>
    <h1>Dados do Consultor</h1>
    <h3 ref={refNome}></h3>
    <h3 ref={refEmail}></h3>
    <h3 ref={refTelefone}></h3>
  </div>
  <div className={style.section}>
    <h1>Status do Processo</h1>
    <div className={style.container}>
      <div className={style.circleContainer}>
        <div className={style.circle} ref={firstCircle}>
        </div>
        <p>Recolhimento de Documentos</p>
      </div>
      <div className={style.circleContainer}>
        <div className={style.circle} ref={secondCircle}>
        </div>
        <p>Analise Bancaria</p>
      </div>
      <div className={style.circleContainer}>
        <div className={style.circle} ref={thirdCircle}>
        </div>
        <p>Vistoria de Imovel</p>
      </div>
        <div className={style.circleContainer}>
        <div className={style.circle} ref={fourthCircle}>
        </div>
        <p>Emissão do Contrato</p>
      </div>
    </div>
  </div>
  <form onSubmit={(ev)=>alteraStatus(ev)} className={style.form}>
    <label htmlFor="etapa">Alterar Etapa</label>
    <select
    id="etapa"
    name="etapa"
    value={etapa}
    onChange={(ev)=>setEtapa(ev.currentTarget.value)}
    >
      <option value="Escolha uma opção">Escolha uma opção</option>
      <option value="Recolhimento de Documentos">Recolhimento de Documentos</option>
      <option value="Analise Bancaria">Analise Bancaria</option>
      <option value="Vistoria de Imovel">Vistoria de Imovel</option>
      <option value="Emissao do Contrato">Emissão do Contrato</option>
    </select>

    <label htmlFor="status">Alterar Status</label>
    <select
    name="status"
    id="status"
    value={status}
    onChange={(ev)=> refuseProcess(ev)}
    >
      <option value="Escolha uma opção">Escolha uma opção</option>
      <option value="Em Andamento">Em Andamento</option>
      <option value="Recusada">Recusada</option>
      <option value="Aceita">Aceita</option>
    </select>

    <div className={style.hide} ref={hideInputsRef}>
    <label htmlFor="message">Motivo da recusa</label>
    <textarea 
    name="message" 
    id="message" 
    cols={30} 
    rows={10}
    value={message}
    onChange={(ev)=>setMessage(ev.currentTarget.value)}
    ></textarea>
    </div>
    <button>Mudar Status</button>
  </form>
  <article className={style.step}>
    <h4>O que a etapa do meu processo significa?</h4>
    <p ref={messageRef}></p>
  </article>
  </div>
  </ConsultorLayout>
  )
}

export default Process