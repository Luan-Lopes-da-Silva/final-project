'use client'
import { FormEvent, useRef, useState } from "react"
import style from '@/src/styles/cadastrarProcesso.module.scss'
import ConsultorLayout from "@/src/components/ConsultorLayout"
import getLocalStorage from "../../functions/getLocalStorage"
import useProcess from "@/src/hooks/useProcess"
export default function Cadastrar(){
  const {client,setClient,emailClient,setEmailClient,phoneClient,setPhoneClient,bank,setBank,modality,setModality,immobile,setImmobile,installments,setInstallments,idConsultant,setIdConsultant,firstInstallment,setFirstInstallment,taxs,setTaxs,lastInstallment,setLastInstallment} = useProcess()
  const spanNameRef = useRef<HTMLParagraphElement>(null)
  const spanPhoneRef = useRef<HTMLParagraphElement>(null)
  const spanEmailRef = useRef<HTMLParagraphElement>(null)
  const spanBankRef = useRef<HTMLParagraphElement>(null)
  const spanTermRef = useRef<HTMLParagraphElement>(null)
  const spanImmobileRef = useRef<HTMLParagraphElement>(null)
  const spanConsultantRef = useRef<HTMLParagraphElement>(null)
  const spanModalityRef = useRef<HTMLParagraphElement>(null)
  const installmentsArray: any[] = []
  
  
  


  function gerarHexAleatorio(){
    const caracteresHex = '0123456789ABCDEFGHIJKLMNOPRSTUVWXYZ'
    let hexAleatorio = '#'
  
    for (let i = 0; i<72; i++){
      const indiceAleatorio = Math.floor(Math.random()* caracteresHex.length)
      hexAleatorio += caracteresHex.charAt(indiceAleatorio)
    }
    return hexAleatorio
  }

  function bankTerms(){
    if(bank === 'Bradesco'){
     setTaxs('6%')
     if(spanTermRef.current && spanBankRef.current){
      spanTermRef.current.innerText = ''
      spanBankRef.current.innerText = ''
     }
    }else{
      if(spanBankRef.current){
      spanBankRef.current.innerText = 'Selecione um banco valido para dar continuidade'
      console.log('Outro banco')
      }
    }
    }


  async function createProcess(ev:FormEvent){
  ev.preventDefault() 
  const url = process.env.NEXT_PUBLIC_APIURL
  const user = getLocalStorage()
  const protocoloAleatorio = gerarHexAleatorio()
  const data = new Date()
  const numberMonth = data.getMonth()
  const conversedTax = taxs.replace(/%/g,'')
  const taxAcount = 1/12
  const acountTax = Number(((Number(conversedTax)/100)+1)**taxAcount)-1
  const amort = Number(immobile) / Number(installments)
  const financement = (Number(immobile)*80)/100

  var nameOfMonths = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  var nameOfMonth = nameOfMonths[numberMonth];
  if(spanNameRef.current && spanEmailRef.current && spanBankRef.current && spanModalityRef.current && spanImmobileRef.current && spanTermRef.current && spanConsultantRef.current && spanPhoneRef.current && user){
  if(client=== '' && emailClient === '' && phoneClient === '' && bank === '' && modality === '' && immobile === '' && installments === '' && idConsultant === ''){
  spanNameRef.current.innerText = 'Preencha o campo corretamente'
  spanEmailRef.current.innerText = 'Preencha o campo corretamente'
  spanBankRef.current.innerText = 'Preencha o campo corretamente'
  spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
  spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
  spanModalityRef.current.innerText = 'Preencha o campo corretamente'
  spanTermRef.current.innerText = 'Preencha o campo corretamente'
  spanConsultantRef.current.innerText = 'Preencha o campo corretamente'
  }else if(client=== '' && emailClient === '' && phoneClient === '' && bank === '' && modality === '' && immobile === '' && idConsultant!= user.idconsultant){
    spanNameRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = 'Proibido adicionar processos a outras contas'
  }else if(client=== '' && emailClient === '' && phoneClient === '' && bank === '' && modality === '' && immobile === '' && installments === ''){
    spanNameRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = 'Preencha o campo corretamente'
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = ''
  }else if(client=== '' && emailClient === '' && phoneClient === '' && bank === '' && modality === '' && immobile === ''){
    spanNameRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = ''
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = ''
  }else if(client=== '' && emailClient === '' && phoneClient === '' && bank === '' && modality === '' ){
    spanNameRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(client=== '' && emailClient === '' && phoneClient === '' && bank === '' ){
    spanNameRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(client=== '' && emailClient === '' && phoneClient === ''){
    spanNameRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(client=== '' && emailClient === ''){
    spanNameRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(client=== ''){
    spanNameRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(emailClient === '' && phoneClient === '' && bank === '' && modality === '' && immobile === '' && installments === '' && idConsultant === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = 'Preencha o campo corretamente'

  }else if(emailClient === '' && phoneClient === '' && bank === '' && modality === '' && immobile === '' && installments === '' ){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = ''
  }else if(emailClient === '' && phoneClient === '' && bank === '' && modality === '' && immobile === '' ){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(emailClient === '' && phoneClient === '' && bank === '' && modality === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(emailClient === '' && phoneClient === '' && bank === '' ){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(emailClient === '' && phoneClient === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }
  else if(emailClient === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(phoneClient === '' && bank === '' && modality === '' && immobile === '' && installments === '' && idConsultant === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = 'Preencha o campo corretamente'
  }else if(phoneClient === '' && bank === '' && modality === '' && immobile === '' && installments === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = ''
  }else if(phoneClient === '' && bank === '' && modality === '' && immobile === '' ){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(phoneClient === '' && bank === '' && modality === '' ){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(phoneClient === '' && bank === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(phoneClient === '' && bank === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(bank === '' && modality === '' && immobile === '' && installments === '' && idConsultant === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = 'Preencha o campo corretamente'
  }else if(bank === '' && modality === '' && immobile === '' && installments === '' ){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = ''
  }else if(bank === '' && modality === '' && immobile === '' ){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(bank === '' && modality === '' ){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(bank === '' ){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = 'Preencha o campo corretamente'
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(modality === '' && immobile === '' && installments === '' && idConsultant === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = 'Preencha o campo corretamente'
  }else if(modality === '' && immobile === '' && installments === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = ''
  }else if(modality === '' && immobile === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(modality === '' ){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = 'Preencha o campo corretamente'
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(immobile === '' && installments === '' && idConsultant === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = 'Preencha o campo corretamente'
  }else if(immobile === '' && installments === '' ){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = ''
  }else if(immobile === '' ){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = 'Preencha o campo corretamente'
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
  }else if(installments === '' && idConsultant === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = 'Preencha o campo corretamente'
  }else if(installments === ''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultantRef.current.innerText = ''
  }else if(idConsultant===''){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = 'Preencha o campo corretamente'
  }else if(idConsultant != user.idconsultant){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = 'Proibido cadastrar processo no ID de outro usuario'
  }else if(modality === 'PRICE'){
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
    
    for(let i = 1; i<=Number(installments); i++){
      const installment = Number(financement)*(((1+acountTax)**Number(installments))*acountTax)/((((1+acountTax)**Number(installments))-1))
      installmentsArray.push(installment)
    }

    const userDb = await fetch(`${url}/processos`,{
      method: 'POST',
      body: JSON.stringify(
        {nomeCliente:client,emailCliente:emailClient,telefoneCliente:phoneClient,banco:bank,amortizacao:modality,valorImovel:immobile,numeroParcelas:installments,primeiraParcela: Number(installmentsArray[0]).toFixed(2),ultimaParcela:Number(installmentsArray[installmentsArray.length-1]).toFixed(2),etapa:'Recolhimento de Documentos',status:'Em Andamento',nomeConsultor:user.name,emailConsultor:user.email,telefoneConsultor:user.phone,idConsultor:idConsultant,mesInicio:nameOfMonth,
        mesFinalizado:'',protocoloAleatorio,message:'',juros:taxs}
      ),
      headers:{
        'Content-Type': "application/json"
      }
    })
    setTimeout(() => {
      alert('Processo cadastrado com sucesso!')
    }, 2000);
  }else{
    spanNameRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBankRef.current.innerText = ''
    spanPhoneRef.current.innerText = ''
    spanImmobileRef.current.innerText = ''
    spanModalityRef.current.innerText = ''
    spanTermRef.current.innerText = ''
    spanConsultantRef.current.innerText = ''
   
    for(let i = 1; i<=Number(installments); i++){
      const installment = (((5-Number([i])+1)*acountTax)+1)*amort
      installmentsArray.push(installment)
  }

    const userDb = await fetch(`${url}/processos`,{
      method: 'POST',
      body: JSON.stringify(
        {nomeCliente:client,emailCliente:emailClient,telefoneCliente:phoneClient,banco:bank,amortizacao:modality,valorImovel:immobile,numeroParcelas:installments,primeiraParcela: Number(installmentsArray[0]).toFixed(2),ultimaParcela:Number(installmentsArray[installmentsArray.length-1]).toFixed(2),etapa:'Recolhimento de Documentos',status:'Em Andamento',nomeConsultor:user.name,emailConsultor:user.email,telefoneConsultor:user.phone,idConsultor:idConsultant,mesInicio:nameOfMonth,
        mesFinalizado:'',protocoloAleatorio,message:'',juros:taxs}
      ),
      headers:{
        'Content-Type': "application/json"
      }
    })
    setTimeout(() => {
      alert('Processo cadastrado com sucesso!')
    }, 2000);
    
  }
  }

  }
  return(
    <ConsultorLayout>
    <title>Cadastrar Processo</title>
    <div className={style.container}>
      <h1>Cadastro de processo</h1>
      <form onSubmit={(ev)=>createProcess(ev)} className={style.form}>
      <label htmlFor="">Nome Cliente</label>
        <p ref={spanNameRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={client}
        onChange={(ev)=>setClient(ev.currentTarget.value)}
        />
        <label htmlFor="">Email</label>
        <p ref={spanEmailRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={emailClient}
        onChange={(ev)=>setEmailClient(ev.currentTarget.value)}
        />

        <label htmlFor="">Telefone</label>
        <p ref={spanPhoneRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={phoneClient}
        onChange={(ev)=>setPhoneClient(ev.currentTarget.value)}
        />

        <label htmlFor="banco">Banco</label>
        <p ref={spanBankRef} className={style.errorSpan}></p>
        <select 
        name="banco" 
        id="banco"
        value={bank}
        onChange={(ev)=>setBank(ev.currentTarget.value)}
        onClick={bankTerms}
        >
          <option value="Selecione um banco">Selecione um banco</option>
          <option value="Bradesco">Bradesco</option>
          <option value="Santander">Santander</option>
          <option value="Itau">Itau</option>
          <option value="Caixa">Caixa</option>
          <option value="Banco do Brasil">Banco do Brasil</option>
        </select>
   
       

        <label htmlFor="">Modalidade</label>
        <p ref={spanModalityRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={modality}
        onChange={(ev)=>setModality(ev.currentTarget.value)}
        />
       
        <label htmlFor="">Valor Imovel</label>
        <p ref={spanImmobileRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={immobile}
        onChange={(ev)=>setImmobile(ev.currentTarget.value)}
        />
        <label htmlFor="">Numero de parcelas</label>
        <p ref={spanTermRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={installments}
        onChange={(ev)=>setInstallments(ev.currentTarget.value)}
        />
        <label htmlFor="">ID do Consultor</label>
        <p ref={spanConsultantRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={idConsultant}
        onChange={(ev)=>setIdConsultant(ev.currentTarget.value)}
        />
        <button>Cadastrar</button>
      </form>
    </div>
    </ConsultorLayout>
  )
}