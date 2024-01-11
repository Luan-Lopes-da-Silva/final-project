'use client'
import { FormEvent, useRef, useState } from "react"
import style from '@/src/styles/cadastrarProcesso.module.scss'
import ConsultorLayout from "@/src/components/ConsultorLayout"
import getLocalStorage from "../../functions/getLocalStorage"
import useProcess from "@/src/hooks/useProcess"
export default function Cadastrar(){
  const {client,setClient,emailClient,setEmailClient,phoneClient,setPhoneClient,bank,setBank,modality,setModality,immobile,setImmobile,installments,setInstallments,idConsultant,setIdConsultant,firstInstallment,setFirstInstallment,taxs,setTaxs,lastInstallment,setLastInstallment} = useProcess()
  const spanNomeRef = useRef<HTMLParagraphElement>(null)
  const spanTelefoneRef = useRef<HTMLParagraphElement>(null)
  const spanEmailRef = useRef<HTMLParagraphElement>(null)
  const spanBancoRef = useRef<HTMLParagraphElement>(null)
  const spanParcelaRef = useRef<HTMLParagraphElement>(null)
  const spanImovelRef = useRef<HTMLParagraphElement>(null)
  const spanConsultorRef = useRef<HTMLParagraphElement>(null)
  const spanModalidadeRef = useRef<HTMLParagraphElement>(null)
  const installmentsArray: any[] = []
  
  
  
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
     if(spanParcelaRef.current && spanBancoRef.current){
      spanParcelaRef.current.innerText = ''
      spanBancoRef.current.innerText = ''
     }
    }else{
      if(spanBancoRef.current){
      spanBancoRef.current.innerText = 'Selecione um banco valido para dar continuidade'
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
  const numeroMes = data.getMonth()
  const conversedTax = taxs.replace(/%/g,'')
  const taxAcount = 1/12
  const acountTax = Number(((Number(conversedTax)/100)+1)**taxAcount)-1
  const amort = Number(immobile) / Number(installments)
  const financement = (Number(immobile)*80)/100

  var nomesDosMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  var nomeDoMes = nomesDosMeses[numeroMes];
  if(spanNomeRef.current && spanEmailRef.current && spanBancoRef.current && spanModalidadeRef.current && spanImovelRef.current && spanParcelaRef.current && spanConsultorRef.current && spanTelefoneRef.current && user){
  if(client=== '' && emailClient === '' && phoneClient === '' && bank === '' && modality === '' && immobile === '' && installments === '' && idConsultant === ''){
  spanNomeRef.current.innerText = 'Preencha o campo corretamente'
  spanEmailRef.current.innerText = 'Preencha o campo corretamente'
  spanBancoRef.current.innerText = 'Preencha o campo corretamente'
  spanImovelRef.current.innerText = 'Preencha o campo corretamente'
  spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
  spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
  spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
  spanConsultorRef.current.innerText = 'Preencha o campo corretamente'
  }else if(client=== '' && emailClient === '' && phoneClient === '' && bank === '' && modality === '' && immobile === '' && idConsultant!= user.idconsultant){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = 'Proibido adicionar processos a outras contas'
  }else if(client=== '' && emailClient === '' && phoneClient === '' && bank === '' && modality === '' && immobile === '' && installments === ''){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(client=== '' && emailClient === '' && phoneClient === '' && bank === '' && modality === '' && immobile === ''){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(client=== '' && emailClient === '' && phoneClient === '' && bank === '' && modality === '' ){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(client=== '' && emailClient === '' && phoneClient === '' && bank === '' ){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(client=== '' && emailClient === '' && phoneClient === ''){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(client=== '' && emailClient === ''){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(client=== ''){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(emailClient === '' && phoneClient === '' && bank === '' && modality === '' && immobile === '' && installments === '' && idConsultant === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = 'Preencha o campo corretamente'

  }else if(emailClient === '' && phoneClient === '' && bank === '' && modality === '' && immobile === '' && installments === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(emailClient === '' && phoneClient === '' && bank === '' && modality === '' && immobile === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(emailClient === '' && phoneClient === '' && bank === '' && modality === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(emailClient === '' && phoneClient === '' && bank === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(emailClient === '' && phoneClient === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }
  else if(emailClient === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(phoneClient === '' && bank === '' && modality === '' && immobile === '' && installments === '' && idConsultant === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = 'Preencha o campo corretamente'
  }else if(phoneClient === '' && bank === '' && modality === '' && immobile === '' && installments === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(phoneClient === '' && bank === '' && modality === '' && immobile === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(phoneClient === '' && bank === '' && modality === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(phoneClient === '' && bank === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(phoneClient === '' && bank === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(bank === '' && modality === '' && immobile === '' && installments === '' && idConsultant === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = 'Preencha o campo corretamente'
  }else if(bank === '' && modality === '' && immobile === '' && installments === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(bank === '' && modality === '' && immobile === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(bank === '' && modality === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(bank === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(modality === '' && immobile === '' && installments === '' && idConsultant === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = 'Preencha o campo corretamente'
  }else if(modality === '' && immobile === '' && installments === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(modality === '' && immobile === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(modality === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(immobile === '' && installments === '' && idConsultant === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = 'Preencha o campo corretamente'
  }else if(immobile === '' && installments === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(immobile === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(installments === '' && idConsultant === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = 'Preencha o campo corretamente'
  }else if(installments === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(idConsultant===''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = 'Preencha o campo corretamente'
  }else if(idConsultant != user.idconsultant){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = 'Proibido cadastrar processo no ID de outro usuario'
  }else if(modality === 'PRICE'){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
    
    for(let i = 1; i<=Number(installments); i++){
      const installment = Number(financement)*(((1+acountTax)**Number(installments))*acountTax)/((((1+acountTax)**Number(installments))-1))
      installmentsArray.push(installment)
    }

    const userDb = await fetch(`${url}/processos`,{
      method: 'POST',
      body: JSON.stringify(
        {nomeCliente:client,emailCliente:emailClient,telefoneCliente:phoneClient,banco:bank,amortizacao:modality,valorImovel:immobile,numeroParcelas:installments,primeiraParcela: Number(installmentsArray[0]).toFixed(2),ultimaParcela:Number(installmentsArray[installmentsArray.length-1]).toFixed(2),etapa:'Recolhimento de Documentos',status:'Em Andamento',nomeConsultor:user.name,emailConsultor:user.email,telefoneConsultor:user.phone,idConsultor:idConsultant,mesInicio:nomeDoMes,
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
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
   
    for(let i = 1; i<=Number(installments); i++){
      const installment = (((5-Number([i])+1)*acountTax)+1)*amort
      installmentsArray.push(installment)
  }

    const userDb = await fetch(`${url}/processos`,{
      method: 'POST',
      body: JSON.stringify(
        {nomeCliente:client,emailCliente:emailClient,telefoneCliente:phoneClient,banco:bank,amortizacao:modality,valorImovel:immobile,numeroParcelas:installments,primeiraParcela: Number(installmentsArray[0]).toFixed(2),ultimaParcela:Number(installmentsArray[installmentsArray.length-1]).toFixed(2),etapa:'Recolhimento de Documentos',status:'Em Andamento',nomeConsultor:user.name,emailConsultor:user.email,telefoneConsultor:user.phone,idConsultor:idConsultant,mesInicio:nomeDoMes,
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
        <p ref={spanNomeRef} className={style.errorSpan}></p>
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
        <p ref={spanTelefoneRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={phoneClient}
        onChange={(ev)=>setPhoneClient(ev.currentTarget.value)}
        />

        <label htmlFor="banco">Banco</label>
        <p ref={spanBancoRef} className={style.errorSpan}></p>
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
        <p ref={spanModalidadeRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={modality}
        onChange={(ev)=>setModality(ev.currentTarget.value)}
        />
       
        <label htmlFor="">Valor Imovel</label>
        <p ref={spanImovelRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={immobile}
        onChange={(ev)=>setImmobile(ev.currentTarget.value)}
        />
        <label htmlFor="">Numero de parcelas</label>
        <p ref={spanParcelaRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={installments}
        onChange={(ev)=>setInstallments(ev.currentTarget.value)}
        />
        <label htmlFor="">ID do Consultor</label>
        <p ref={spanConsultorRef} className={style.errorSpan}></p>
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