'use client'
import style from '@/src/styles/simulacao.module.scss'
import pdfSvg from '../../../public/pdf-svgrepo-com.svg'
import Image from 'next/image'
import SimulationsPDF from '../Reports/Simulations/Simulations'
import useForm1 from '../../hooks/useStates'
import useForm2 from '../../hooks/useStates2'
import useRefs from '../../hooks/useRefs'
import { useRef ,useState} from 'react'
import LayoutClient from '@/src/components/LayoutClient'




let simulationsArray = []

export default function SimulacaoPage() {
  
  function phoneMask (value) {
    if(!value){
      return ""
    }
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }

  function handlePhone (ev) {
  let input = ev.target
  input.value = phoneMask(input.value)
  }

  const invisibleInputsRef = useRef()
  const saldoDevedor  = []
  const parcelas = []
  const {imovel,setImovel,despesas,setDespesas,amortizacao,setAmortizacao,aniversario,setAniversario,banco,setBanco,financiamento,setFinanciamento} = useForm1()
  const {entrada,setEntrada,prazo,setPrazo,juros,setJuros,active,setActive,primeiraParcela,setPrimeiraParcela,ultimaParcela,setUltimaParcela,consultor,setConsultor,protocolo,setProtocolo} = useForm2()
  const {btnLimpar,btnRef,formRef,inputRef,mensage,mensageAmortizacao,mensageAniversario,mensageBanco,mensageDespesa,mensageEntrada,mensageJuros,mensageParcela,mensagePorcentagemFinanciamento,outputRef,refResumo} = useRefs()
  const valorDespesa = Number(imovel)*0.05
  const conta = valorDespesa + Number(financiamento)
  const refModal = useRef()
  const refProtocolo = useRef()
  const [status, setStatus] = useState('Em aberto')
  const [nome,setNome] = useState('')
  const [telefone,setTelefone] = useState('')
  const [email,setEmail] = useState('')
  const refChecked = useRef()
  const interrogationContainerRef = useRef()


  function openMoreFields(ev){
  if(ev.checked === true){
    invisibleInputsRef.current.style.display = 'block'
    setConsultor('Sim')
  }else{
    invisibleInputsRef.current.style.display = 'none'
  }
  }
  
  function despesasFunction(ev){
  const maxFinanciamento = imovel*0.080 
  if(ev==='Sim' && conta>maxFinanciamento){
    setDespesas(ev)
    outputRef.current.style.display = 'block'
    mensagePorcentagemFinanciamento.current.innerText = 'Porcentagem máxima de financiamento atingida abaixe o valor'
  }else if(ev==='Sim' && conta<maxFinanciamento){
    setDespesas(ev)
    outputRef.current.style.display = 'block'
    mensagePorcentagemFinanciamento.current.innerText = ''
    inputRef.current.focus()
  }else{
    setDespesas(ev)
    outputRef.current.style.display = 'none'
    mensagePorcentagemFinanciamento.current.innerText = ''
  }
  }
  
  function checkIdade(ev){
    const nascimento = ev.currentTarget.value
    const nascimentoConvertido = new Date(nascimento).getFullYear()
    const anoAtual = new Date().getFullYear()
    console.log(nascimentoConvertido-anoAtual)
    setAniversario(ev.currentTarget.value)
    if(anoAtual-nascimentoConvertido>80){
      mensageAniversario.current.innerText = 'Idade acima do permitido para financiamento.'
    }else if(anoAtual-nascimentoConvertido<18){
      mensageAniversario.current.innerText = 'Idade abaixo do permitido para financiamento.'
    }else{
      mensageAniversario.current.innerText = ''
    }
  }
 
  function checkField(ev){
  const div =  ev.currentTarget.parentElement
  const span = div.querySelector('span')
  const valorEntrada = (imovel*20) /100
  if(ev.currentTarget.value === '' || ev.currentTarget.value === '0'){
    span.innerText = 'Preencha esse campo corretamente'
  }else if(ev.currentTarget.name === 'valorEntrada'  && ev.currentTarget.value<valorEntrada){
    span.innerText = `Valor minimo de entrada R$ ${valorEntrada},00`
  }else{
    span.innerText = ''
  }
 }

 function checkSistema(ev){
  setAmortizacao(ev.currentTarget.value)
  if(ev.currentTarget.value === 'Selecione seu sistema de amortização'){
  mensageAmortizacao.current.innerText = 'Selecione um sistema'
  }else{
  mensageAmortizacao.current.innerText = ''
  }
 }


function maxPrazos(ev){
  const target = ev.currentTarget
  const nascimentoConvertido = new Date(aniversario).getFullYear()
  const anoAtual = new Date().getFullYear()
  const conta = (anoAtual-nascimentoConvertido) + Number(ev.currentTarget.value)/12
  
  setPrazo(target.value)
  if(Number(ev.currentTarget.value)<3){
    mensageParcela.current.innerText = 'Numero minimo de parcelas 12'
  }
  else if(banco === 'bradesco' && ev.currentTarget.value>420){
   mensageParcela.current.innerText = 'Numero maximo de parcelas 420'
  }else if(banco === 'bradesco' && conta>80){
  const sobra = (conta-80)*12 
  mensageParcela.current.innerText = `Devido as politicas do banco seu novo limite de parcelas é ${420-sobra.toFixed(0)}`
  }else{
   mensageParcela.current.innerText = ''
  }
}

  function minValues(ev){
    const valorEntrada = (ev.currentTarget.value*20) /100
    if(ev.currentTarget.value < 50){
      mensage.current.innerText = 'Valor minimo de imovel R$ 40,000'
    }else{
      mensage.current.innerText = ''
      mensagePorcentagemFinanciamento.current.innerText = ''
      mensageEntrada.current.innerText = ''
      mensageParcela.current.innerText = ''
      const financiamento = (ev.currentTarget.value * 80) / 100
      setFinanciamento(financiamento)
      setEntrada(valorEntrada)
    }
  }



  function openModal(){
  refModal.current.style.display = 'block'  
  }
  
  function closeModal(){
  refModal.current.style.display = 'none'  
  }
 
  function closeProtocolModal(){
  refProtocolo.current.style.display = 'none'  
  }

  function maxValue(ev){  
    const porcentagem = (ev.currentTarget.value/imovel) * 100 
    if(porcentagem>80){
    mensagePorcentagemFinanciamento.current.innerText = 'Porcentagem máxima de financiamento atingida abaixe o valor'
    }else{
    mensagePorcentagemFinanciamento.current.innerText = ''
    }
  }

  function openOtherFields(ev){
    if(ev.currentTarget.checked){
      invisibleInputsRef.current.display = 'block'
    }else{
      invisibleInputsRef.current.display = 'none'
    }
  }

  function bancoPrazo(ev){
  const target = ev.currentTarget
  setBanco(target.value)
  if(banco !='Selecione um banco'){
  mensageJuros.current.innerText = ''
  mensageBanco.current.innerText = ''
  }
  else if(target.value === 'bradesco'){
    setJuros('6%')
    mensageParcela.current.innerText = ''
    mensageJuros.current.innerText = ''
    mensageBanco.current.innerText = ''
  }else{
    mensageBanco.current.innerText = 'Selecione um banco valido para dar continuidade'
    console.log('Outro banco')
  }
  }

  function limparCampos(){
    setImovel('')
    setFinanciamento('')
    setEntrada('')
    setPrazo('')
    setBanco('Selecione um banco')
    setJuros('')
    setAniversario('')
    setAmortizacao('Selecione seu sistema de amortização')
    setDespesas('')
    simulationsArray = []
    outputRef.current.style.display = 'none'
    refResumo.current.style.display = 'none'
    refChecked.current.checked = false
    interrogationContainerRef.current.style.display = 'none'
    refProtocolo.current.style.display = 'none'
    invisibleInputsRef.current.style.display = 'none'
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


  

  async function createSimulation(ev){
    ev.preventDefault()
    const jurosConvertido = juros.replace(/%/g,'')
    const taxaConta = 1/12
    const contaTaxa = Number(((jurosConvertido/100)+1)**taxaConta)-1
 
    const nascimento = new Date(aniversario).getFullYear()
    const anoAtual = new Date().getFullYear()
    const conta = (anoAtual-nascimento) + Number(prazo)/12
    const valorEntrada = (imovel*20) /100
    const porcentagem = (financiamento/imovel) * 100
    if(banco === 'Selecione um banco'){
      mensageBanco.current.innerText = 'Selecione um banco valido para dar continuidade'
      mensageJuros.current.innerText = 'Preencha a taxa de juros'
    } 
    else if(aniversario === ''){
      mensageAniversario.current.innerText = 'Preencha com sua data de nascimento para dar continuidade.'
    }else if(anoAtual-nascimento>80){
      mensageAniversario.current.innerText = 'Idade acima do permitido para financiamento.'
    }else if(anoAtual-nascimento<18){
      mensageAniversario.current.innerText = 'Idade abaixo do permitido para financiamento.'
    }
    else if(financiamento === '' && imovel === ''){
      mensage.current.innerText = 'Preencha o valor do imovel'
      mensagePorcentagemFinanciamento.current.innerText = 'Preencha o valor do financiamento'
      mensageEntrada.current.innerText = 'Preencha o valor de entrada'
      mensageBanco.current.innerText = ''
      mensageJuros.current.innerText = ''
      mensageAniversario.current.innerText = ''
    }else if(financiamento === 0 && imovel === 0){
      mensageEntrada.current.innerText = 'Preencha o valor de entrada'
      mensage.current.innerText = 'Preencha o valor do imovel'
      mensagePorcentagemFinanciamento.current.innerText = 'Preencha o valor do financiamento'
      mensageEntrada.current.innerText = 'Preencha o valor de entrada'
      mensageBanco.current.innerText = ''
      mensageJuros.current.innerText = ''
      mensageAniversario.current.innerText = ''
    }else if(imovel === 0){
      mensage.current.innerText = 'Preencha o valor do imovel'
    }else if(financiamento === 0){
      mensagePorcentagemFinanciamento.current.innerText = 'Preencha o valor do financiamento'
    }else if(prazo === ''){
      mensageParcela.current.innerText = 'Preencha o numero de parcelas'
    }else if(entrada === '') {
      mensageEntrada.current.innerText = 'Preencha o valor de entrada'
    }else if(porcentagem>80){
      mensagePorcentagemFinanciamento.current.innerText = 'Porcentagem máxima de financiamento atingida abaixe o valor'
    }else if(banco === 'bradesco' && prazo>420){
      mensageParcela.current.innerText = 'Numero de parcelas acima do limite pra esse banco'
    }else if(entrada<valorEntrada){
      mensageEntrada.current.innerText = `Valor minimo de entrada R$ ${valorEntrada},00`
    }else if(juros === ''){
      mensageJuros.current.innerText = 'Preencha a taxa de juros de acordo com o seu banco.'
    }else if(Number(prazo)<3){
      mensageParcela.current.innerText = 'Numero de parcelas mininimas é 12.'
    }else if(banco === 'bradesco' && conta>80){
      const sobra = (conta-80)*12 
      mensageParcela.current.innerText = `Devido as politicas do banco seu novo limite de parcelas é ${420-sobra.toFixed(0)}`
    }else if(amortizacao === 'Selecione seu sistema de amortização'){
      mensageAmortizacao.current.innerText = 'Selecione um sistema '
    }else if(despesas === ''){
      mensageDespesa.current.innerText = 'Selecione uma alternativa'
    }else if(amortizacao === 'SAC' && banco=== 'bradesco'){
      setActive(false)
      const taxaBradesco = '10.49%'
      btnLimpar.current.style.marginTop = '-56px'
      btnLimpar.current.style.marginLeft = '200px'
      refResumo.current.style.display = 'block'
      interrogationContainerRef.current.style.display = 'flex'
      mensagePorcentagemFinanciamento.current.innerText = ''
      mensageParcela.current.innerText = ''
      mensageEntrada.current.innerText = ''
      mensageBanco.current.innerText = ''
      mensageAniversario.current.innerText = ''
      mensageJuros.current.innerText = ''
      mensageAmortizacao.current.innerText = ''
      mensageDespesa.current.innerText = ''
      const values = []
      values.push(Number(financiamento))
      
      for(let i = 1; i<=Number(prazo); i++){
        values.push(financiamento / prazo)
      }

      const result = values.reduce((acc,cur)=>{
        saldoDevedor.push((acc-cur).toFixed(2))
        return acc-cur
      })

      const amort = Number(financiamento) / Number(prazo)
     
  
      for(let i = 1; i<=Number(prazo); i++){
        const parcela = (((5-[i]+1)*contaTaxa)+1)*amort
        parcelas.push(parcela)
        var simulation = {
        parcelas:`Parcela ${i}`,
        valorParcela: parcela.toFixed(2),
        juros: (parcela-amort).toFixed(2),
        financiado: financiamento,
        amortizacao: amort.toFixed(2),
        saldoDevedor: saldoDevedor[i-1],
        status:status
        }
        simulationsArray.push(simulation)   
    }
    setPrimeiraParcela(Number(parcelas[0]).toFixed(2))
    setUltimaParcela(Number(parcelas[parcelas.length-1]).toFixed(2))
    
    }else if(amortizacao === 'PRICE' && banco=== 'bradesco'){
      setActive(true)
  
      btnLimpar.current.style.marginTop = '-56px'
      btnLimpar.current.style.marginLeft = '200px'
      refResumo.current.style.display = 'block'
      interrogationContainerRef.current.style.display = 'flex'
      mensagePorcentagemFinanciamento.current.innerText = ''
      mensageParcela.current.innerText = ''
      mensageEntrada.current.innerText = ''
      mensageBanco.current.innerText = ''
      mensageAniversario.current.innerText = ''
      mensageJuros.current.innerText = ''
      mensageAmortizacao.current.innerText = ''
      mensageDespesa.current.innerText = ''
      const values = []
      values.push(Number(financiamento))
      
    
      for(let i = 1; i<=Number(prazo); i++){
        values.push(financiamento / prazo)
      }


      const result = values.reduce((acc,cur)=>{
        saldoDevedor.push((acc-cur).toFixed(2))
        return acc-cur
      })
      saldoDevedor.unshift(financiamento)
      const amort = Number(financiamento) / Number(prazo)
    

      for(let i = 1; i<=Number(prazo); i++){
        const parcela = Number(financiamento)*(((1+contaTaxa)**Number(prazo))*contaTaxa)/((((1+contaTaxa)**prazo)-1))
        parcelas.push(parcela)
        var simulation = {
        parcelas:`Parcela ${i}`,
        valorParcela: parcela.toFixed(2),
        juros: (saldoDevedor[i-1]*contaTaxa).toFixed(2),
        financiado: financiamento,
        amortizacao: (parcela - (saldoDevedor[i-1]*contaTaxa)).toFixed(2) ,
        saldoDevedor: saldoDevedor[i],
        status:status
        }
        simulationsArray.push(simulation)  
      }

      const nascimentoConvertido = new Date(aniversario).getFullYear()
      const anoAtual = new Date().getFullYear()
      const idade = anoAtual-nascimentoConvertido

      setPrimeiraParcela(Number(parcelas[0]).toFixed(2))
      setUltimaParcela(Number(parcelas[parcelas.length-1]).toFixed(2))

      
      
  }
}

async function createInDb(ev){
  ev.preventDefault()
  const jurosConvertido = juros.replace(/%/g,'')
  const taxaConta = 1/12
  const contaTaxa = Number(((jurosConvertido/100)+1)**taxaConta)-1
    const url = process.env.NEXT_PUBLIC_APIURL 
    const data = new Date()
    const numeroMes = data.getMonth()
    var nomesDosMeses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    var nomeDoMes = nomesDosMeses[numeroMes];
    const protocoloAleatorio = gerarHexAleatorio()
    setProtocolo(protocoloAleatorio)
    
    const obj = {nomeCliente: nome,
      emailCliente: email,
      telefoneCliente: telefone,
      valorImovel: imovel,
      numeroParcelas:prazo,
      primeiraParcela,
      ultimaParcela,
      banco: banco,
      amortizacao:amortizacao,
      juros:juros,
      etapa:"Na busca de um consultor para seu processo",
      status:"Em Andamento",
      mesInicio:nomeDoMes,
      mesFinalizado: "",
      nomeConsultor : "",
      telefoneConsultor: "",
      emailConsultor : "",
      idConsultor : "",
      protocoloAleatorio:protocoloAleatorio,
      message: ""}

   
    const userDb = await fetch(`https://db-indicacoes.onrender.com/processos`,{
      method: 'POST',
      body: JSON.stringify(obj),
      headers:{
        'Content-Type': "application/json"
      }
    })
    refProtocolo.current.style.display = 'block'
    setTimeout(() => {
    alert('Processo criado com sucesso agora aguarde um nossos consultores aceitarem seu pedido')
    }, 1000);
    
    }
 
   
  

  
  
  return (    
    <LayoutClient>
    <div className={style.container}>
    <title>Simular financiamento</title>
    <main className={style.main}>
      <div className={style.modal} ref={refModal}>
        <h1
        onClick={closeModal}
        >
        X
        </h1>
        <p>
        Caso aceite ser contatado por um consultor daremos
        inicio ao processo de financiamento do seu tão sonha
        do imovel sera gerado um numero de protocolo que 
        podera ser usado por voce nosso cliente para que 
        acompanhe todo o processo e em que fase do finan
        ciamento voce esta com esse numero de protocolo
        voce tambem tera acesso a dados do nosso consultor
        designado para que voce possa tirar duvidas via email
        ou whatsapp.
        </p>
      </div>

      <div className={style.modal} ref={refProtocolo}>
        <h1
        onClick={closeProtocolModal}
        >
        X
        </h1>
        <h2>
        O seu numero de protocolo é 
        </h2>
        <span>
        {protocolo}
        </span>
        <h3>Guarde esse numero para poder checar o andamento de seu processo 
        ou ter mais informações sobre o mesmo</h3>
      </div>
    
      <form 
      className={style.form}
      ref={formRef}
      onSubmit={(ev)=>createSimulation(ev)}
      >
          <div>
          <label htmlFor="banco">Banco</label>
          <span className={style.errorSpan} ref={mensageBanco}></span>
          <select
          defaultValue = 'option1'
          onChange={(ev)=> bancoPrazo(ev)}
          >
            <option value= "option1">Selecione um Banco</option>
            <option value="bradesco">Bradesco</option>
            <option value="santander">Santander</option>
            <option value="itau">Itau</option>
          </select>
        </div>

        <label htmlFor="aniversario">Data de nascimento</label>
        <span className={style.errorSpan} ref={mensageAniversario}></span>
        <input 
        type="date" 
        value={aniversario}
        onChange={(ev)=>checkIdade(ev)}        
        />
        <div>
          <label htmlFor="valorImovel">Valor do imovel</label>
          <span className={style.errorSpan} ref={mensage}></span>
          <input
          type="text"
          name="valorImovel"
          value={imovel}
          onChange={(ev)=>setImovel(ev.currentTarget.value)}
          onKeyUp={(ev)=>minValues(ev)}
          />
        </div>
        <div>
          <label htmlFor="valorFinanciamento">Valor do financiamento</label>
          <span className={style.errorSpan} ref={mensagePorcentagemFinanciamento}></span>
          <input
          type="text"
          name="valorFinanciamento"
          value={financiamento}
          onChange={(ev)=>setFinanciamento(ev.currentTarget.value)}
          onKeyUp={(ev)=>maxValue(ev)}
          ref={inputRef}
          />
        </div>
        <div>
          <label htmlFor="valorEntrada">Valor da entrada</label>
          <span className={style.errorSpan} ref={mensageEntrada}></span>
          <input
          type="text"
          name="valorEntrada"
          value={entrada}
          onChange={(ev)=>setEntrada(ev.currentTarget.value)}
          onKeyUp={(ev)=>checkField(ev)}
          />
        </div>

    
        <div>
          <label htmlFor="prazoFinanciamento">Prazo financiamento</label>
          <span className={style.errorSpan} ref={mensageParcela}></span>
          <input
          type="text"
          name="prazoFinanciamento"
          value={prazo}
          onChange={(ev)=>setPrazo(ev.currentTarget.value)}
          onKeyUp ={(ev)=>maxPrazos(ev)}
          />
        </div>

        <div>
          <label htmlFor="">Sistema amortização</label>
          <span className={style.errorSpan} ref={mensageAmortizacao}></span>
          <select
          value={amortizacao}
          onChange={(ev)=>checkSistema(ev)}
          >
            <option value="Selecione seu sistema de amortização" selected>Selecione seu sistema de amortização</option>
            <option value="SAC">SAC</option>
            <option value="PRICE">PRICE</option>
          </select>
        </div>
        <label htmlFor="juros">Taxa juros</label>
        <span className={style.errorSpan} ref={mensageJuros}></span>
        <input 
        type="text" 
        name="juros"
        value={juros}
        onChange={(ev)=>setJuros(ev.currentTarget.value)}
        />
        <label htmlFor="despesas">Incluir despesas?</label>
        <span className={style.errorSpan} ref={mensageDespesa}></span>
        <div className={style.radioContainer}>
          <div className={style.radio}>
            <label htmlFor="sim">Sim</label>
            <input
            type="radio"
            name="despesas"
            value={'Sim'}
            checked={despesas === 'Sim'}
            
            onChange={(ev)=>despesasFunction(ev.currentTarget.value)}
            />
          </div>
          <div className={style.radio}>
            <label htmlFor="nao">Não</label>
            <input
            type="radio"
            name="despesas"
            value={'Não'}
            checked={despesas === 'Não'}
            onChange={(ev)=>despesasFunction(ev.currentTarget.value)}
            />
          </div>
        </div>
        <div className={style.outputContainer} ref={outputRef}>
          <label htmlFor="despesas">Despesas</label>
          <input 
          type="text" 
          className={style.outputRef}
          value={valorDespesa}
          />
        </div>
        <button
        ref={btnRef}
        className={style.btn1}
        onClick={createSimulation}
        >Simular</button>
      </form>
      <button
        onClick={limparCampos}
        className={style.btn2}
        ref={btnLimpar}
        >
          Limpar
      </button>

      {active === true?(
      <div>
        <div className={style.summary} ref={refResumo}>
          <h1>Resumo do financiamento</h1>
          <h4>Valor Imovel: R$ {imovel}</h4>
          <h4>Valor Financiamento: R$ {financiamento}</h4>
          <h4>Valor Entrada: R$ {entrada}</h4>
          <h4>Renda Minima: (NÃO INFORMADO)</h4>
          {despesas === 'Sim'?(
            <h4>Despesas: R$ {Number(valorDespesa).toFixed(2)}</h4>
          ):(
            <h4>Despesas: (NÃO INFORMADO)</h4>
          )}
          <h4>Vistoria: R$ 2.114,03</h4>
          <h4>Valor Total Financiado: R$ {Number(conta).toFixed(2)}</h4>
          <h4>Prazo: {prazo} meses</h4>
          <h4>Primeira Parcela: R$ {primeiraParcela}</h4>
          <h4>Ultima Parcela: R$ {ultimaParcela}</h4>
          <h4>Valor CET: (NÃO INFORMADO)</h4>
          <h4>Valor CESH: (NÃO INFORMADO)</h4>
          <h4>Taxa Efetiva: {juros}</h4>
          <h4>Taxa Nominal: (NÃO INFORMADO)</h4>
          <button className={style.btnPdf}>
            <Image
            alt='pdfBtn'
            src={pdfSvg}
            width={30}
            onClick={()=>SimulationsPDF(simulationsArray)}
            />
            </button> 
            </div>

        <div className={style.interrogationContainer} ref={interrogationContainerRef}>
        <input 
        type="checkbox" 
        name="consultor" 
        id="consultor"
        ref={refChecked}
        onClick={(ev)=>openMoreFields(ev.currentTarget)}
        onChange={(ev)=>openOtherFields(ev)}
        />
        <label htmlFor="consultor">Deseja ser contatado por um de nossos consultores ?
        </label>
        <div className={style.interrogation}>
        <p
        onClick={openModal}
        >
        ?
        </p>
        </div>
        </div>
        <div ref={invisibleInputsRef} className={style.invisibleInputs}>
          <form onSubmit={(ev)=>createInDb(ev)}>
            <div>
            <label htmlFor="nome">Nome</label>
            <input
            type="text"
            name='nome'
            value={nome}
            onChange={(ev)=>setNome(ev.currentTarget.value)}
            />
            </div>
            <div>
            <label htmlFor="email">Email</label>
            <input
            type="text"
            name='email'
            value={email}
            onChange={(ev)=>setEmail(ev.currentTarget.value)}
            />
            </div>
            <div>
            <label htmlFor="Telefone">Telefone</label>
            <input
            type="text"
            name='Telefone'
            value={telefone}
            onChange={(ev)=>setTelefone(ev.currentTarget.value)}
            onKeyUp={(ev)=> handlePhone(ev)}
            maxLength={15}
            />
            </div>
            <button>PEDIR UM CONSULTOR</button>
          </form>
        </div>
      </div>
      ):(
      <div>
        <div className={style.summary} ref={refResumo}>
        <h1>Resumo do financiamento</h1>
        <h4>Valor Imovel: R$ {imovel}</h4>
        <h4>Valor Financiamento: R$ {financiamento}</h4>
        <h4>Valor Entrada: R$ {entrada}</h4>
        <h4>Renda Minima: (NÃO INFORMADO)</h4>
        {despesas === 'Sim'?(
            <h4>Despesas: R$ {Number(valorDespesa).toFixed(2)}</h4>
        ):(
            <h4>Despesas: (NÃO INFORMADO)</h4>
        )}
        <h4>Vistoria: R$ 2.114,03</h4>
        <h4>Valor Total Financiado: R$ {Number(financiamento).toFixed(2)}</h4>
        <h4>Prazo: {prazo} meses</h4>
        <h4>Primeira Parcela: R$ {primeiraParcela}</h4>
        <h4>Ultima Parcela: R$ {ultimaParcela}</h4>
        <h4>Valor CET: (NÃO INFORMADO)</h4>
        <h4>Valor CESH: (NÃO INFORMADO)</h4>
        <h4>Taxa Efetiva: {juros}</h4>
        <h4>Taxa Nominal: (NÃO INFORMADO)</h4>
        <button
        className={style.btnPdf}
        onClick={()=>SimulationsPDF(simulationsArray)}
        >
        <Image
        alt='pdfBtn'
        src={pdfSvg}
        width={30}
        />
        </button>
        </div>
        <div className={style.interrogationContainer} ref={interrogationContainerRef}>
        <input 
        type="checkbox" 
        name="consultor" 
        id="consultor"
        ref={refChecked}
        onClick={(ev)=>openMoreFields(ev.currentTarget)}
        onChange={(ev)=>openOtherFields(ev)}

        />
        <label htmlFor="consultor">Deseja ser contatado por um de nossos consultores ?
        </label>
        <div className={style.interrogation}>
        <p
        onClick={openModal}
        >
        ?
        </p>
        </div>
        </div>
        <div ref={invisibleInputsRef} className={style.invisibleInputs}>
        <form onSubmit={(ev)=>createInDb(ev)}>
          <div>
          
            <label htmlFor="nome">Nome</label>
            <input
            type="text"
            name='nome'
            value={nome}
            onChange={(ev)=>setNome(ev.currentTarget.value)}
            />
            </div>
            <div>
            <label htmlFor="email">Email</label>
            <input
            type="text"
            name='email'
            value={email}
            onChange={(ev)=>setEmail(ev.currentTarget.value)}
            />
            </div>
            <div>
            <label htmlFor="Telefone">Telefone</label>
            <input
            type="text"
            name='Telefone'
            value={telefone}
            onChange={(ev)=>setTelefone(ev.currentTarget.value)}
            onKeyUp={(ev)=> handlePhone(ev)}
            maxLength={15}
            />
          </div>
          <button>PEDIR UM CONSULTOR</button>
          </form>
        </div>
      </div>
      )}
    </main>
    </div>
    </LayoutClient>
  )
}