'use client'

import LayoutAdmin from "@/src/components/LayoutAdmin";
import style from '@/src/styles/processoConsultor.module.scss'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

export default function ProcessAdm({params}:any){
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
  
  

  type UserAdm = {
    name: string
    email: string
    phone: string
  }


  const getLocalStorage = ()=>{
    const user = localStorage.getItem('Usuario Logado')
    if(user){
    const userParse = JSON.parse(user)
    return userParse
    }
  }


  useEffect(()=>{
  const getProcess = async () =>{
    const operation = await fetch(`http://localhost:3000/organicos/${params.id}`)
    const conversedOperation = await operation.json()

    
    if(refBanco.current && refValor.current && refParcelas.current && refNome.current && refEmail.current && clienteEmail.current && clienteNome.current && clienteTelefone.current && firstCircle.current && secondCircle.current && thirdCircle.current && fourthCircle.current && refTelefone.current && messageRef.current){
      refBanco.current.innerText = `Banco: ${conversedOperation.banco}`
      refValor.current.innerText = `Valor: ${conversedOperation.valorImovel}`
      refParcelas.current.innerText = `Parcelas: ${conversedOperation.numeroParcelas}`
    
      refNome.current.innerText = `Nome : ${conversedOperation.nomeConsultor}`
      refEmail.current.innerText = `Email : ${conversedOperation.emailConsultor}`
      refTelefone.current.innerText = `Telefone : ${conversedOperation.telefoneConsultor}`
    
      clienteNome.current.innerText = `Nome : ${conversedOperation.nomeCliente}`
      clienteEmail.current.innerText = `Email : ${conversedOperation.emailCliente}`
      clienteTelefone.current.innerText = `Telefone : ${conversedOperation.telefoneCliente}`
    
      
    
       if(conversedOperation.etapa === 'Recolhimento de Documentos' && conversedOperation.status === 'Em Andamento' || conversedOperation.status === 'Em andamento'){
        firstCircle.current.style.backgroundColor = 'Yellow'
        messageRef.current.innerText = 'Os interessados no financiamento imobiliário devem fornecer documentação pessoal, comprovantes de renda, e outros documentos necessários para a análise do banco.'
       }else if(conversedOperation.etapa === 'Recolhimento de Documentos' && conversedOperation.status === 'Recusada'){
        firstCircle.current.style.backgroundColor = 'Red'
        messageRef.current.innerText = conversedOperation.message
       }else if(conversedOperation.etapa === 'Recolhimento de Documentos' && conversedOperation.status === 'Aceita'){
        firstCircle.current.style.backgroundColor = 'Green'
        secondCircle.current.style.backgroundColor = 'Yellow'
        const dbChanges = await fetch(`http://localhost:3000/organicos/${params.id}`,{
          method: "PATCH",
          body: JSON.stringify(
          {
            status: 'Em Andamento',
            etapa: 'Analise Bancaria',
            message: 'Parabéns! Recebemos seus documentos. Estamos iniciando a análise para o financiamento do seu imóvel. Em breve, entraremos em contato'
          }
        ),
        headers: {
          "Content-Type": "application/json"
        }
        })
        messageRef.current.innerText = 'Parabéns! Recebemos seus documentos. Estamos iniciando a análise para o financiamento do seu imóvel. Em breve, entraremos em contato.'
       }else if(conversedOperation.etapa === 'Analise Bancaria' && conversedOperation.status === 'Em Andamento'){
        firstCircle.current.style.backgroundColor = 'Green'
        secondCircle.current.style.backgroundColor = 'Yellow'
        messageRef.current.innerText = 'O banco revisa os documentos fornecidos, avalia a capacidade financeira do solicitante e verifica a viabilidade do financiamento. Essa etapa inclui a verificação de histórico de crédito e outros critérios de elegibilidade.'
       }else if(conversedOperation.etapa === 'Analise Bancaria' && conversedOperation.status === 'Recusada'){
        firstCircle.current.style.backgroundColor = 'Green'
        secondCircle.current.style.backgroundColor = 'Red'
        messageRef.current.innerText = conversedOperation.message
       }else if(conversedOperation.etapa === 'Analise Bancaria' && conversedOperation.status === 'Aceita'){
        firstCircle.current.style.backgroundColor = 'Green'
        secondCircle.current.style.backgroundColor = 'Green'
        const dbChanges = await fetch(`http://localhost:3000/organicos/${params.id}`,{
          method: "PATCH",
          body: JSON.stringify(
          {
            status: 'Em Andamento',
            etapa: 'Vistoria de Imovel',
            message: 'Ótima notícia! Sua análise bancária foi aprovada. Agora, avançaremos para a próxima etapa do financiamento imobiliário.'
          }
        ),
        headers: {
          "Content-Type": "application/json"
        }
        })
        messageRef.current.innerText = 'Ótima notícia! Sua análise bancária foi aprovada. Agora, avançaremos para a próxima etapa do financiamento imobiliário.'
       }else if(conversedOperation.etapa === 'Vistoria de Imovel' && conversedOperation.status === 'Em Andamento'){
        firstCircle.current.style.backgroundColor = 'Green'
        secondCircle.current.style.backgroundColor = 'Green'
        thirdCircle.current.style.backgroundColor = 'Yellow'
        messageRef.current.innerText = 'Uma vistoria é realizada no imóvel para avaliar suas condições físicas e determinar seu valor de mercado. Isso é crucial para o banco garantir que o imóvel ofereça a segurança necessária para o financiamento.'
       }else if(conversedOperation.etapa === 'Vistoria de Imovel' && conversedOperation.status === 'Recusada'){
        firstCircle.current.style.backgroundColor = 'Green'
        secondCircle.current.style.backgroundColor = 'Green'
        thirdCircle.current.style.backgroundColor = 'Red'
        messageRef.current.innerText = conversedOperation.message
       }else if(conversedOperation.etapa === 'Vistoria de Imovel' && conversedOperation.status === 'Aceita'){
        firstCircle.current.style.backgroundColor = 'Green'
        secondCircle.current.style.backgroundColor = 'Green'
        thirdCircle.current.style.backgroundColor = 'Green'
        const dbChanges = await fetch(`http://localhost:3000/organicos/${params.id}`,{
          method: "PATCH",
          body: JSON.stringify(
          {
            status: 'Em Andamento',
            etapa: 'Emissao do Contrato',
            message: 'A vistoria do seu imóvel foi concluída com sucesso! Estamos prosseguindo para as etapas finais do financiamento. Logo teremos novidades.'
          }
        ),
        headers: {
          "Content-Type": "application/json"
        }
        })
        messageRef.current.innerText = 'A vistoria do seu imóvel foi concluída com sucesso! Estamos prosseguindo para as etapas finais do financiamento. Logo teremos novidades.'
       }else if(conversedOperation.etapa === 'Emissao do Contrato' && conversedOperation.status === 'Em Andamento'){
       fourthCircle.current.style.backgroundColor = 'Yellow'
       }else if(conversedOperation.etapa === 'Emissao do Contrato' && conversedOperation.status === 'Recusada'){
        firstCircle.current.style.backgroundColor = 'Green'
        secondCircle.current.style.backgroundColor = 'Green'
        thirdCircle.current.style.backgroundColor = 'Green'
        fourthCircle.current.style.backgroundColor = 'Red'
        messageRef.current.innerText = conversedOperation.message
       }else if(conversedOperation.etapa === 'Emissao do Contrato' && conversedOperation.status === 'Aceita'){
        firstCircle.current.style.backgroundColor = 'Green'
        secondCircle.current.style.backgroundColor = 'Green'
        thirdCircle.current.style.backgroundColor = 'Green'
        fourthCircle.current.style.backgroundColor = 'Green'
        const dbChanges = await fetch(`http://localhost:3000/organicos/${params.id}`,{
          method: "PATCH",
          body: JSON.stringify(
          {
            status: 'Aceita',
            etapa: 'Emissao do Contrato',
            message: 'Parabéns! Seu financiamento foi aprovado, e o contrato está pronto para assinatura. Em breve, você será o(a) proprietário(a) do seu novo lar.'
          }
        ),
        headers: {
          "Content-Type": "application/json"
        }
        })
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
      const operation = await fetch(`http://localhost:3000/organicos/${params.id}`)
      const conversedOperation = await operation.json()
      const userDb = await fetch(`http://localhost:3000/organicos/${params.id}`,{
        method: "PATCH",
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
    
    const data = new Date()
    const numeroMes = data.getMonth()
    var nomesDosMeses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    var nomeDoMes = nomesDosMeses[numeroMes];
    if(etapa === 'Emissao do Contrato' && status === 'Aceita'){
      const userDb = await fetch(`http://localhost:3000/organicos/${params.id}`,{
        method: "PATCH",
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
        location.reload()
    }else{
      const userDb = await fetch(`http://localhost:3000/organicos/${params.id}`,{
        method: "PATCH",
        body: JSON.stringify(
          {
            status,
            etapa,
            message:message
          }
        ),
        headers: {
          "Content-Type": "application/json"
        }
        })
        location.reload()
    }
    }
  return(
    <LayoutAdmin>
    <title>Detalhes do processo</title>
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
    <label htmlFor="">Alterar Etapa</label>
    <select
    value={etapa}
    onChange={(ev)=>setEtapa(ev.currentTarget.value)}
    >
      <option value="Escolha uma opção">Escolha uma opção</option>
      <option value="Recolhimento de Documentos">Recolhimento de Documentos</option>
      <option value="Analise Bancaria">Analise Bancaria</option>
      <option value="Vistoria de Imovel">Vistoria de Imovel</option>
      <option value="Emissao do Contrato">Emissão do Contrato</option>
    </select>

    <label htmlFor="">Alterar Status</label>
    <select
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
    </LayoutAdmin>
  )
}