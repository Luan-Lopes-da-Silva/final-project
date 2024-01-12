'use client'
import React from 'react';
import ConsultorLayout from "@/src/components/ConsultorLayout";
import style from '@/src/styles/simulConsultor.module.scss'
import Image from "next/image";
import SimulationsPDF from '@/src/app/Reports/Simulations/Simulations'
import pdfSvg from '@/public/pdf-svgrepo-com.svg'
import { ChangeEvent, FormEvent, useRef, useState } from "react";


type Simulation = {
  parcelas : string
  valorParcela: string
  juros: string
  financiado: string
  amortizacao: string
  saldoDevedor: Number
}

let simulationsArray:Simulation[] = []


export default function Simulacao(){

  const [imovel,setImovel] = useState('')
  const [despesas,setDespesas] = useState('')
  const [amortizacao,setAmortizacao] = useState('')
  const [aniversario , setAniversario] = useState('')
  const [entrada,setEntrada] = useState('')
  const [banco,setBanco] = useState('')
  const [financiamento,setFinanciamento] = useState('')
  const [prazo,setPrazo] = useState('')
  const [juros,setJuros] = useState('')
  const [active,setActive] = useState(true)
  const saldoDevedor: Number[] = []
  const parcelas: Number[] = []
  const [primeiraParcela,setPrimeiraParcela] = useState('')
  const [ultimaParcela,setUltimaParcela] = useState('')
  const btnLimpar = useRef<HTMLButtonElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const outputRef = useRef<HTMLInputElement>(null)
  const mensage = useRef<HTMLParagraphElement>(null)
  const mensageAmortizacao = useRef<HTMLParagraphElement>(null)
  const mensageBanco = useRef<HTMLParagraphElement>(null)
  const mensageAniversario = useRef<HTMLParagraphElement>(null)
  const mensageDespesa = useRef<HTMLParagraphElement>(null)
  const mensageEntrada = useRef<HTMLParagraphElement>(null)
  const mensageJuros = useRef<HTMLParagraphElement>(null)
  const mensageParcela = useRef<HTMLParagraphElement>(null)
  const mensagePorcentagemFinanciamento = useRef<HTMLParagraphElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const refResumo = useRef<HTMLDivElement>(null)
  const inputAniversario= useRef<HTMLInputElement>(null)
  const valorDespesa = Number(imovel)*0.05
  const conta = valorDespesa + Number(financiamento)

  function limparCampos(){
    setImovel('')
    setFinanciamento('')
    setEntrada('')
    setPrazo('')
    setBanco('')
    setJuros('')
    setAniversario('')
    setAmortizacao('')
    setDespesas('')
    simulationsArray  = []
    if (outputRef.current && refResumo.current && inputAniversario.current) {
      outputRef.current.style.display = 'none'
      refResumo.current.style.display = 'none'
      inputAniversario.current.focus()
    }
}

  function despesasFunction(ev:ChangeEvent<HTMLInputElement>){
      const maxFinanciamento = Number(imovel)*0.080 
      if(ev.currentTarget.value==='Sim' && conta>maxFinanciamento){
        setDespesas(ev.currentTarget.value)
        if(outputRef.current && mensagePorcentagemFinanciamento.current && inputRef.current){
          outputRef.current.style.display = 'block'
          mensagePorcentagemFinanciamento.current.innerText = 'Porcentagem máxima de financiamento atingida abaixe o valor'
          inputRef.current.focus()
        }
      }else if(ev.currentTarget.value === 'Sim' && conta<maxFinanciamento){
        setDespesas(ev.currentTarget.value)
        if(outputRef.current && mensagePorcentagemFinanciamento.current && inputRef.current){
          outputRef.current.style.display = 'block'
          mensagePorcentagemFinanciamento.current.innerText = ''
          
        }
      }else{
        setDespesas(ev.currentTarget.value)
        if(outputRef.current && mensagePorcentagemFinanciamento.current){
          outputRef.current.style.display = 'none'
          mensagePorcentagemFinanciamento.current.innerText = ''
        }
      }
    }
    
    function checkIdade(ev:ChangeEvent<HTMLInputElement>){
      const nascimento = ev.currentTarget.value
      const nascimentoConvertido = new Date(nascimento).getFullYear()
      const anoAtual = new Date().getFullYear()
      setAniversario(ev.currentTarget.value)
      if(mensageAniversario.current){
        if(anoAtual-nascimentoConvertido>80){
        mensageAniversario.current.innerText = 'Idade acima do permitido para financiamento.'
      }else if(anoAtual-nascimentoConvertido<18){
        mensageAniversario.current.innerText = 'Idade abaixo do permitido para financiamento.'
      }else{
        mensageAniversario.current.innerText = ''
      }
      } 
    }
   
    function checkField(ev:React.KeyboardEvent<HTMLInputElement>){
    const valorEntrada = (Number(imovel)*20) /100
    
  
    const target = ev.currentTarget
  
    if (target.value === '' || target.value === '0') {
      if (mensageEntrada.current) {
        mensageEntrada.current.innerText = 'Preencha esse campo corretamente';
      }
    } else if (target.name === 'prohibited' && Number(target.value) < valorEntrada) {
      if (mensageEntrada.current) {
        mensageEntrada.current.innerText = `Valor mínimo de entrada R$ ${valorEntrada},00`;
      }
    } else {
      if (mensageEntrada.current) {
        mensageEntrada.current.innerText = '';
      }
    }
   }
  
   function checkSistema(ev:ChangeEvent<HTMLInputElement>){
    setAmortizacao(ev.currentTarget.value)
    if(mensageAmortizacao.current){
      if(ev.currentTarget.value === 'Selecione seu sistema de amortização'){
        mensageAmortizacao.current.innerText = 'Selecione um sistema'
        }else{
        mensageAmortizacao.current.innerText = ''
        }
    }
   }
  
  
  function maxPrazos(ev:React.KeyboardEvent<HTMLInputElement>){
    const target = ev.currentTarget 
    const nascimentoConvertido = new Date(aniversario).getFullYear()
    const anoAtual = new Date().getFullYear()
    const conta = (anoAtual-nascimentoConvertido) + Number(target.value)/12
    setPrazo(target.value)
    if(mensageParcela.current){
      if(Number(target.value)<3){
        mensageParcela.current.innerText = 'Numero minimo de parcelas 12'
      }
      else if(banco === 'bradesco' && Number(target.value)>420){
       mensageParcela.current.innerText = 'Numero maximo de parcelas 420'
      }else if(banco === 'bradesco' && conta>80){
      const sobra = (conta-80)*12 
      mensageParcela.current.innerText = `Devido as politicas do banco seu novo limite de parcelas é ${420-Number(sobra.toFixed(0))}`
      }else{
       mensageParcela.current.innerText = ''
      }
    }
  }

  function minValues(ev:React.KeyboardEvent<HTMLInputElement>){
    const target = ev.currentTarget 
    const valorEntrada = (Number(target.value)*20) /100
    if(mensage.current && mensageEntrada.current && mensageParcela.current && mensagePorcentagemFinanciamento.current){
      if(Number(target.value) < 50){
        mensage.current.innerText = 'Valor minimo de imovel R$ 40,000'
      }else{
        mensage.current.innerText = ''
        mensagePorcentagemFinanciamento.current.innerText = ''
        mensageEntrada.current.innerText = ''
        mensageParcela.current.innerText = ''
        const financiamento = (Number(target.value) * 80) / 100
        setFinanciamento(`${financiamento}`)
        setEntrada(`${valorEntrada}`)
      }
    }
  }

  function maxValue(ev:React.KeyboardEvent<HTMLInputElement>){
    const target = ev.currentTarget 
    const porcentagem = (Number(target.value)/Number(imovel)) * 100 
    if(mensagePorcentagemFinanciamento.current){
      if(porcentagem>80){
        mensagePorcentagemFinanciamento.current.innerText = 'Porcentagem máxima de financiamento atingida abaixe o valor'
        }else{
        mensagePorcentagemFinanciamento.current.innerText = ''
        }
    }
  }

  function bancoPrazo(ev:ChangeEvent<HTMLSelectElement>){
    const target = ev.currentTarget
    setBanco(target.value)
    if(mensageBanco.current && mensageJuros.current && mensageParcela.current){
        if(target.value === 'bradesco'){
          setJuros('6%')
          mensageParcela.current.innerText = ''
          mensageJuros.current.innerText = ''
          mensageBanco.current.innerText = ''
        }else{
          mensageBanco.current.innerText = 'Selecione um banco valido para dar continuidade'
          console.log('Outro banco')
        }
    }
    }
  
    

    async function createSimulation(ev:FormEvent){
      ev.preventDefault()
      const jurosConvertido = juros.replace(/%/g,'')
      const taxaConta = 1/12
      const contaTaxa = Number(((Number(jurosConvertido)/100)+1)**taxaConta)-1
   
      const nascimento = new Date(aniversario).getFullYear()
      const anoAtual = new Date().getFullYear()
      const conta = (anoAtual-nascimento) + Number(prazo)/12
      const valorEntrada = (Number(imovel)*20) /100
      const porcentagem = (Number(financiamento)/Number(imovel)) * 100
     
      if(banco === 'Selecione um banco'){
        if(mensageBanco.current && mensageJuros.current){
          mensageBanco.current.innerText = 'Selecione um banco valido para dar continuidade'
          mensageJuros.current.innerText = 'Preencha a taxa de juros'
        }
      } 
      else if(aniversario === ''){
        if(mensageAniversario.current){
          mensageAniversario.current.innerText = 'Preencha com sua data de nascimento para dar continuidade.'
        }
      }else if(anoAtual-nascimento>80){
        if(mensageAniversario.current){
        mensageAniversario.current.innerText = 'Idade acima do permitido para financiamento.'
        }
      }else if(anoAtual-nascimento<18){
        if(mensageAniversario.current){ 
        mensageAniversario.current.innerText = 'Idade abaixo do permitido para financiamento.'
        }
      }
      else if(financiamento === '' && imovel === ''){
        if(mensage.current && mensagePorcentagemFinanciamento.current && mensageEntrada.current && mensageBanco.current && mensageJuros.current && mensageAniversario.current){
        mensage.current.innerText = 'Preencha o valor do imovel'
        mensagePorcentagemFinanciamento.current.innerText = 'Preencha o valor do financiamento'
        mensageEntrada.current.innerText = 'Preencha o valor de entrada'
        mensageBanco.current.innerText = ''
        mensageJuros.current.innerText = ''
        mensageAniversario.current.innerText = ''
        }
      }else if(financiamento === `${0}` && imovel === `${0}`){
        if(mensage.current && mensagePorcentagemFinanciamento.current && mensageEntrada.current && mensageBanco.current && mensageJuros.current && mensageAniversario.current){
        mensageEntrada.current.innerText = 'Preencha o valor de entrada'
        mensage.current.innerText = 'Preencha o valor do imovel'
        mensagePorcentagemFinanciamento.current.innerText = 'Preencha o valor do financiamento'
        mensageEntrada.current.innerText = 'Preencha o valor de entrada'
        mensageBanco.current.innerText = ''
        mensageJuros.current.innerText = ''
        mensageAniversario.current.innerText = ''
        }
      }else if(imovel === `${0}`){
        if(mensage.current){
          mensage.current.innerText = 'Preencha o valor do imovel'
        }
      }else if(financiamento === `${0}`){
        if(mensagePorcentagemFinanciamento.current){
          mensagePorcentagemFinanciamento.current.innerText = 'Preencha o valor do financiamento'
        }
      }else if(prazo === ''){
        if(mensageParcela.current){
          mensageParcela.current.innerText = 'Preencha o numero de parcelas'
        }
      }else if(entrada === '') {
        if(mensageEntrada.current){
          mensageEntrada.current.innerText = 'Preencha o valor de entrada'
        }
      }else if(porcentagem>80){
        if(mensagePorcentagemFinanciamento.current){
          mensagePorcentagemFinanciamento.current.innerText = 'Porcentagem máxima de financiamento atingida abaixe o valor'
        }
      }else if(banco === 'bradesco' && Number(prazo)>420){
        if(mensageParcela.current){
          mensageParcela.current.innerText = 'Numero de parcelas acima do limite pra esse banco'
        }
      }else if(Number(entrada)<Number(valorEntrada)){
        if(mensageEntrada.current){
          mensageEntrada.current.innerText = `Valor minimo de entrada R$ ${valorEntrada},00`
        }
      }else if(juros === ''){
        if(mensageJuros.current){
          mensageJuros.current.innerText = 'Preencha a taxa de juros de acordo com o seu banco.'
        }
      }else if(Number(prazo)<3){
        if(mensageParcela.current){
        mensageParcela.current.innerText = 'Numero de parcelas mininimas é 12.'
      }
      }else if(banco === 'bradesco' && conta>80){
        const sobra = (conta-80)*12 
        if(mensageParcela.current){
          mensageParcela.current.innerText = `Devido as politicas do banco seu novo limite de parcelas é ${420-Number(sobra.toFixed(0))}`
        }
      }else if(amortizacao === 'Selecione seu sistema de amortização'){
        if(mensageAmortizacao.current){
          mensageAmortizacao.current.innerText = 'Selecione um sistema '
        }
      }else if(despesas === ''){
        if(mensageDespesa.current){
          mensageDespesa.current.innerText = 'Selecione uma alternativa'
        }

      }else if(amortizacao === 'SAC' && banco=== 'bradesco'){
        setActive(false)
        if( refResumo.current && mensageAmortizacao.current && mensagePorcentagemFinanciamento.current && mensageParcela.current && mensageEntrada.current && mensageAniversario.current && mensageJuros.current && mensageDespesa.current && mensageBanco.current){
        refResumo.current.style.display = 'block'
        mensagePorcentagemFinanciamento.current.innerText = ''
        mensageParcela.current.innerText = ''
        mensageEntrada.current.innerText = ''
        mensageBanco.current.innerText = ''
        mensageAniversario.current.innerText = ''
        mensageJuros.current.innerText = ''
        mensageAmortizacao.current.innerText = ''
        mensageDespesa.current.innerText = ''
        const values:Number[] = []
        values.push(Number(financiamento))
        
        for(let i = 1; i<=Number(prazo); i++){
          values.push(Number(financiamento) / Number(prazo))
        }
  
        const result = values.reduce((acc,cur)=>{
          saldoDevedor.push(Number((Number(acc)-Number(cur)).toFixed(2)))
          return Number(acc)-Number(cur)
        })
  
        const amort = Number(financiamento) / Number(prazo)
       
    
        for(let i = 1; i<=Number(prazo); i++){
          const parcela = (((5-Number([i])+1)*contaTaxa)+1)*amort
          parcelas.push(parcela)
          var simulation = {
          parcelas:`Parcela ${i}`,
          valorParcela: parcela.toFixed(2),
          juros: (parcela-amort).toFixed(2),
          financiado: financiamento,
          amortizacao: amort.toFixed(2),
          saldoDevedor: saldoDevedor[i-1],
          }
          simulationsArray.push(simulation)   
      }
      setPrimeiraParcela(Number(parcelas[0]).toFixed(2))
      setUltimaParcela(Number(parcelas[parcelas.length-1]).toFixed(2))
    }
      }else if(amortizacao === 'PRICE' && banco=== 'bradesco'){ 
      setActive(true)
      if(refResumo.current && mensageAmortizacao.current && mensagePorcentagemFinanciamento.current && mensageParcela.current && mensageEntrada.current && mensageAniversario.current && mensageJuros.current && mensageDespesa.current && mensageBanco.current){
      refResumo.current.style.display = 'block'
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
        values.push(Number(financiamento) / Number(prazo))
      }


      const result = values.reduce((acc,cur)=>{
        saldoDevedor.push(Number((Number(acc)-Number(cur)).toFixed(2)))
        return acc-cur
      })
      saldoDevedor.unshift(Number(financiamento))
      const amort = Number(financiamento) / Number(prazo)
    

      for(let i = 1; i<=Number(prazo); i++){
        const parcela = Number(financiamento)*(((1+contaTaxa)**Number(prazo))*contaTaxa)/((((1+contaTaxa)**Number(prazo))-1))
        parcelas.push(parcela)
        var simulation = {
        parcelas:`Parcela ${i}`,
        valorParcela: parcela.toFixed(2),
        juros: (Number(saldoDevedor[i-1])*contaTaxa).toFixed(2),
        financiado: financiamento,
        amortizacao: (parcela - (Number(saldoDevedor[i-1])*contaTaxa)).toFixed(2) ,
        saldoDevedor: saldoDevedor[i],
        
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
  
  }



  return(
   <ConsultorLayout>
    <title>Simulação - Consultor</title>
     <div className={style.container}>
        <h1>Simulação</h1>
        <form className={style.form} onSubmit={(ev)=>createSimulation(ev)}>
          <label htmlFor="birthday">Data de nascimento</label>
          <p ref={mensageAniversario} className={style.errorSpan}></p>
          <input 
          type="date" 
          name="birthday" 
          id="birthday"
          value={aniversario}
          ref={inputAniversario}
          onChange={(ev)=>checkIdade(ev)}
          />
          <label htmlFor="bank">Banco</label>
          <p ref={mensageBanco} className={style.errorSpan}></p>
          <select 
          name="bank" 
          id="bank"
          value={banco}
          onChange={(ev)=>bancoPrazo(ev)}
          >
            <option value="selecione um banco">Selecione um banco</option>
            <option value="bradesco">Bradesco</option>
            <option value="santander">Santander</option>
          </select>
  
          <label htmlFor="house">Valor do imovel</label>
          <p ref={mensage} className={style.errorSpan}></p>
          <input 
          type="text" 
          name="house" 
          id="house"
          value={imovel} 
          onChange={(ev)=>setImovel(ev.currentTarget.value)}
          onKeyUp={(ev)=>minValues(ev)}
          />
          <label htmlFor="financiment">Valor do financiamento</label>
          <p ref={mensagePorcentagemFinanciamento} className={style.errorSpan}></p>
          <input 
          type="text" 
          name="financement" 
          id="financement" 
          ref={inputRef}
          value={financiamento}
          onChange={(ev)=>setFinanciamento(ev.currentTarget.value)}
          onKeyUp={(ev)=>maxValue(ev)}
          />
          <label htmlFor="prohibited">Valor da entrada</label>
          <p ref={mensageEntrada} className={style.errorSpan}></p>
          <input 
          type="text" 
          name="prohibited" 
          id="prohibited" 
          value={entrada}
          onChange={(ev)=>setEntrada(ev.currentTarget.value)}
          onKeyUp={(ev)=>checkField(ev)}
          />
        
          <label htmlFor="term">Prazo</label>
          <p ref={mensageParcela} className={style.errorSpan}></p>
          <input 
          type="text" 
          name="term" 
          id="term" 
          value={prazo}
          onChange={(ev)=>setPrazo(ev.currentTarget.value)}
          onKeyUp={(ev)=>maxPrazos(ev)}
          />
          <label htmlFor="amort">Sistema de Amortização</label>
          <p ref={mensageAmortizacao} className={style.errorSpan}></p>
          <input 
          type="text" 
          name="amort" 
          id="amort"
          value={amortizacao}
          onChange={(ev)=>checkSistema(ev)}
          />
          <label htmlFor="taxs">Taxas de Juros</label>
          <p ref={mensageJuros} className={style.errorSpan}></p>
          <input 
          type="text" 
          name="taxs" 
          id="taxs" 
          value={juros}
          onChange={(ev)=>setJuros(ev.currentTarget.value)}
          />
          <label htmlFor="expanses">Incluir despesas?</label>
          <p ref={mensageDespesa} className={style.errorSpan}></p>
          <div className={style.radios}>
          <div className={style.radio}>
            <label htmlFor="sim">Sim</label>
            <input
            type="radio"
            name="despesas"
            value={'Sim'}
            checked={despesas === 'Sim'}
            onChange={(ev)=>despesasFunction(ev)}
            />
          </div>
          <div className={style.radio}>
            <label htmlFor="nao">Não</label>
            <input
            type="radio"
            name="despesas"
            value={'Não'}
            checked={despesas === 'Não'}
            onChange={(ev)=>despesasFunction(ev)}
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
          <div>
            <button ref={btnRef}>SIMULAR</button>
            <button onClick={limparCampos} ref={btnLimpar}>LIMPAR</button>
          </div>
        </form>

        {active === true?(
      <div className={style.summary} ref={refResumo}>
        <h2>Resumo do financiamento</h2>
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
      ):(
      <div className={style.summary} ref={refResumo}>
      <h2>Resumo do financiamento</h2>
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
      )}
     </div>
   </ConsultorLayout>
  )
}