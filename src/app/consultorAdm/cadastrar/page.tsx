'use client'
import { FormEvent, useRef, useState } from "react"
import style from '@/src/styles/cadastrarProcesso.module.scss'
import ConsultorLayout from "@/src/components/ConsultorLayout"
import getLocalStorage from "../../functions/getLocalStorage"

export default function Cadastrar(){
  const [nome,setNome] = useState('')
  const [email,setEmail] = useState('')
  const [telefone,setTelefone] = useState('')
  const [modalidade,setModalidade] = useState('')
  const [banco,setBanco] = useState('')
  const [parcelas,setParcelas] = useState('')
  const [imovel,setImovel] = useState('')
  const [idConsultor,setIdConsultor] = useState('')
  const spanNomeRef = useRef<HTMLParagraphElement>(null)
  const spanTelefoneRef = useRef<HTMLParagraphElement>(null)
  const spanEmailRef = useRef<HTMLParagraphElement>(null)
  const spanBancoRef = useRef<HTMLParagraphElement>(null)
  const spanParcelaRef = useRef<HTMLParagraphElement>(null)
  const spanImovelRef = useRef<HTMLParagraphElement>(null)
  const spanConsultorRef = useRef<HTMLParagraphElement>(null)
  const spanModalidadeRef = useRef<HTMLParagraphElement>(null)
  const [protocoloAleatorio,setProtocoloAleatorio] = useState('')
  
  
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

  

  async function createProcess(ev:FormEvent){
  ev.preventDefault() 
  const url = process.env.NEXT_PUBLIC_APIURL
  const user = getLocalStorage()
  const protocoloAleatorio = gerarHexAleatorio()
  const data = new Date()
  const numeroMes = data.getMonth()
  var nomesDosMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  var nomeDoMes = nomesDosMeses[numeroMes];
  const primeiraParcela = Number(imovel) / Number(parcelas)
  const ultimaParcela = Number(imovel) / Number(parcelas)
  setProtocoloAleatorio(protocoloAleatorio)
  if(spanNomeRef.current && spanEmailRef.current && spanBancoRef.current && spanModalidadeRef.current && spanImovelRef.current && spanParcelaRef.current && spanConsultorRef.current && spanTelefoneRef.current && user){
  if(nome=== '' && email === '' && telefone === '' && banco === '' && modalidade === '' && imovel === '' && parcelas === '' && idConsultor === ''){
  spanNomeRef.current.innerText = 'Preencha o campo corretamente'
  spanEmailRef.current.innerText = 'Preencha o campo corretamente'
  spanBancoRef.current.innerText = 'Preencha o campo corretamente'
  spanImovelRef.current.innerText = 'Preencha o campo corretamente'
  spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
  spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
  spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
  spanConsultorRef.current.innerText = 'Preencha o campo corretamente'
  }else if(nome=== '' && email === '' && telefone === '' && banco === '' && modalidade === '' && imovel === '' && idConsultor!= user.idConsultor){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = 'Proibido adicionar processos a outras contas'
  }else if(nome=== '' && email === '' && telefone === '' && banco === '' && modalidade === '' && imovel === '' && parcelas === ''){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(nome=== '' && email === '' && telefone === '' && banco === '' && modalidade === '' && imovel === ''){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(nome=== '' && email === '' && telefone === '' && banco === '' && modalidade === '' ){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(nome=== '' && email === '' && telefone === '' && banco === '' ){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(nome=== '' && email === '' && telefone === ''){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(nome=== '' && email === ''){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(nome=== ''){
    spanNomeRef.current.innerText = 'Preencha o campo corretamente'
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(email === '' && telefone === '' && banco === '' && modalidade === '' && imovel === '' && parcelas === '' && idConsultor === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = 'Preencha o campo corretamente'

  }else if(email === '' && telefone === '' && banco === '' && modalidade === '' && imovel === '' && parcelas === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(email === '' && telefone === '' && banco === '' && modalidade === '' && imovel === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(email === '' && telefone === '' && banco === '' && modalidade === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(email === '' && telefone === '' && banco === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(email === '' && telefone === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }
  else if(email === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = 'Preencha o campo corretamente'
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(telefone === '' && banco === '' && modalidade === '' && imovel === '' && parcelas === '' && idConsultor === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = 'Preencha o campo corretamente'
  }else if(telefone === '' && banco === '' && modalidade === '' && imovel === '' && parcelas === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(telefone === '' && banco === '' && modalidade === '' && imovel === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(telefone === '' && banco === '' && modalidade === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(telefone === '' && banco === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(telefone === '' && banco === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = 'Preencha o campo corretamente'
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if( banco === '' && modalidade === '' && imovel === '' && parcelas === '' && idConsultor === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = 'Preencha o campo corretamente'
  }else if( banco === '' && modalidade === '' && imovel === '' && parcelas === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if( banco === '' && modalidade === '' && imovel === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if( banco === '' && modalidade === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if( banco === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = 'Preencha o campo corretamente'
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(modalidade === '' && imovel === '' && parcelas === '' && idConsultor === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = 'Preencha o campo corretamente'
  }else if(modalidade === '' && imovel === '' && parcelas === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(modalidade === '' && imovel === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(modalidade === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = 'Preencha o campo corretamente'
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(imovel === '' && parcelas === '' && idConsultor === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = 'Preencha o campo corretamente'
  }else if(imovel === '' && parcelas === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(imovel === '' ){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = 'Preencha o campo corretamente'
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
  }else if(parcelas === '' && idConsultor === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = 'Preencha o campo corretamente'
  }else if(parcelas === ''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = 'Preencha o campo corretamente'
    spanConsultorRef.current.innerText = ''
  }else if(idConsultor===''){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = 'Preencha o campo corretamente'
  }else if(idConsultor != user.idConsultor){
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = 'Proibido cadastrar processo no ID de outro usuario'
  }else{
    spanNomeRef.current.innerText = ''
    spanEmailRef.current.innerText = ''
    spanBancoRef.current.innerText = ''
    spanTelefoneRef.current.innerText = ''
    spanImovelRef.current.innerText = ''
    spanModalidadeRef.current.innerText = ''
    spanParcelaRef.current.innerText = ''
    spanConsultorRef.current.innerText = ''
    const userDb = await fetch(`${url}/processos`,{
      method: 'POST',
      body: JSON.stringify(
        {nomeCliente:nome,emailCliente:email,telefoneCliente:telefone,banco,amortizacao:modalidade,valorImovel:imovel,numeroParcelas:parcelas,primeiraParcela,ultimaParcela,etapa:'Recolhimento de Documentos',status:'Em Andamento',nomeConsultor:user.nome,emailConsultor:user.email,telefoneConsultor:user.telefone,idConsultor,mesInicio:nomeDoMes,
        mesFinalizado:'',protocoloAleatorio,message:'',juros:'6%'}
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
        value={nome}
        onChange={(ev)=>setNome(ev.currentTarget.value)}
        />
        <label htmlFor="">Email</label>
        <p ref={spanEmailRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={email}
        onChange={(ev)=>setEmail(ev.currentTarget.value)}
        />

        <label htmlFor="">Telefone</label>
        <p ref={spanTelefoneRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={telefone}
        onChange={(ev)=>setTelefone(ev.currentTarget.value)}
        />

        <label htmlFor="banco">Banco</label>
        <p ref={spanBancoRef} className={style.errorSpan}></p>
        <select 
        name="banco" 
        id="banco"
        value={banco}
        onChange={(ev)=>setBanco(ev.currentTarget.value)}
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
        value={modalidade}
        onChange={(ev)=>setModalidade(ev.currentTarget.value)}
        />
       
        <label htmlFor="">Valor Imovel</label>
        <p ref={spanImovelRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={imovel}
        onChange={(ev)=>setImovel(ev.currentTarget.value)}
        />
        <label htmlFor="">Numero de parcelas</label>
        <p ref={spanParcelaRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={parcelas}
        onChange={(ev)=>setParcelas(ev.currentTarget.value)}
        />
        <label htmlFor="">ID do Consultor</label>
        <p ref={spanConsultorRef} className={style.errorSpan}></p>
        <input 
        type="text" 
        value={idConsultor}
        onChange={(ev)=>setIdConsultor(ev.currentTarget.value)}
        />
        <button>Cadastrar</button>
      </form>
    </div>
    </ConsultorLayout>
  )
}