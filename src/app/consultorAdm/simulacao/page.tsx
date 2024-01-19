'use client'
import React from 'react';
import ConsultorLayout from "@/src/components/ConsultorLayout";
import style from '@/src/styles/simulConsultor.module.scss'
import Image from "next/image";
import SimulationsPDF from '@/src/app/Reports/Simulations/Simulations'
import pdfSvg from '@/public/pdf-svgrepo-com.svg'
import { ChangeEvent, FormEvent, useRef, useState } from "react";


type Simulation = {
  installments : string
  installmentValue: string
  taxs: string
  financied: string
  amortization: string
  dueBalance: Number
}

let simulationsArray:Simulation[] = []


export default function Simulacao(){

  const [immobile,setImmobile] = useState('')
  const [expanses,setExpanses] = useState('')
  const [amortization,setAmortization] = useState('')
  const [birthday , setBirthday] = useState('')
  const [prohibited,setProhibited] = useState('')
  const [bank,setBank] = useState('')
  const [financement,setFinancement] = useState('')
  const [terms,setTerms] = useState('')
  const [taxs,setTaxs] = useState('')
  const [active,setActive] = useState(true)
  const dueBalance: Number[] = []
  const installments: Number[] = []
  const [firstInstallment,setFirstInstallment] = useState('')
  const [lastInstallment,setLastInstallment] = useState('')
  const cleanBtn = useRef<HTMLButtonElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const outputRef = useRef<HTMLInputElement>(null)
  const mensage = useRef<HTMLParagraphElement>(null)
  const amortMessage = useRef<HTMLParagraphElement>(null)
  const bankMessage = useRef<HTMLParagraphElement>(null)
  const birthdayMessage = useRef<HTMLParagraphElement>(null)
  const expanseMessage = useRef<HTMLParagraphElement>(null)
  const prohibitedMessage = useRef<HTMLParagraphElement>(null)
  const taxsMessage = useRef<HTMLParagraphElement>(null)
  const installmentMessage = useRef<HTMLParagraphElement>(null)
  const financementPercentMessage = useRef<HTMLParagraphElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const inputBirthday= useRef<HTMLInputElement>(null)
  const expanseValue = Number(immobile)*0.05
  const account = expanseValue + Number(financement)

  function cleanFields(){
    setImmobile('')
    setFinancement('')
    setProhibited('')
    setTerms('')
    setBank('')
    setTaxs('')
    setBirthday('')
    setAmortization('')
    setExpanses('')
    simulationsArray  = []
    if (outputRef.current && summaryRef.current && inputBirthday.current) {
      outputRef.current.style.display = 'none'
      summaryRef.current.style.display = 'none'
      inputBirthday.current.focus()
    }
}

  function expansesFunction(ev:ChangeEvent<HTMLInputElement>){
      const maxFinancement = Number(immobile)*0.080 
      if(ev.currentTarget.value==='Sim' && account>maxFinancement){
        setExpanses(ev.currentTarget.value)
        if(outputRef.current && financementPercentMessage.current && inputRef.current){
          outputRef.current.style.display = 'block'
          financementPercentMessage.current.innerText = 'Porcentagem máxima de financement atingida abaixe o valor'
          inputRef.current.focus()
        }
      }else if(ev.currentTarget.value === 'Sim' && account<maxFinancement){
        setExpanses(ev.currentTarget.value)
        if(outputRef.current && financementPercentMessage.current && inputRef.current){
          outputRef.current.style.display = 'block'
          financementPercentMessage.current.innerText = ''
          
        }
      }else{
        setExpanses(ev.currentTarget.value)
        if(outputRef.current && financementPercentMessage.current){
          outputRef.current.style.display = 'none'
          financementPercentMessage.current.innerText = ''
        }
      }
    }
    
    function checkAge(ev:ChangeEvent<HTMLInputElement>){
      const born = ev.currentTarget.value
      const conversedBorn = new Date(born).getFullYear()
      const currentYear = new Date().getFullYear()
      setBirthday(ev.currentTarget.value)
      if(birthdayMessage.current){
        if(currentYear-conversedBorn>80){
        birthdayMessage.current.innerText = 'Idade acima do permitido para financement.'
      }else if(currentYear-conversedBorn<18){
        birthdayMessage.current.innerText = 'Idade abaixo do permitido para financement.'
      }else{
        birthdayMessage.current.innerText = ''
      }
      } 
    }
   
    function checkField(ev:React.KeyboardEvent<HTMLInputElement>){
    const prohibtedValue = (Number(immobile)*20) /100
    
  
    const target = ev.currentTarget
  
    if (target.value === '' || target.value === '0') {
      if (prohibitedMessage.current) {
        prohibitedMessage.current.innerText = 'Preencha esse campo corretamente';
      }
    } else if (target.name === 'prohibited' && Number(target.value) < prohibtedValue) {
      if (prohibitedMessage.current) {
        prohibitedMessage.current.innerText = `Valor mínimo de entrada R$ ${prohibtedValue},00`;
      }
    } else {
      if (prohibitedMessage.current) {
        prohibitedMessage.current.innerText = '';
      }
    }
   }
  
   function checkSistem(ev:ChangeEvent<HTMLInputElement>){
    setAmortization(ev.currentTarget.value)
    if(amortMessage.current){
      if(ev.currentTarget.value === 'Selecione seu sistema de amortização'){
        amortMessage.current.innerText = 'Selecione um sistema'
        }else{
        amortMessage.current.innerText = ''
        }
    }
   }
  
  
  function maxTerms(ev:React.KeyboardEvent<HTMLInputElement>){
    const target = ev.currentTarget 
    const conversedBorn = new Date(birthday).getFullYear()
    const currentYear = new Date().getFullYear()
    const account = (currentYear-conversedBorn) + Number(target.value)/12
    setTerms(target.value)
    if(installmentMessage.current){
      if(Number(target.value)<3){
        installmentMessage.current.innerText = 'Numero minimo de parcelas 12'
      }
      else if(bank === 'bradesco' && Number(target.value)>420){
       installmentMessage.current.innerText = 'Numero maximo de parcelas 420'
      }else if(bank === 'bradesco' && account>80){
      const sobra = (account-80)*12 
      installmentMessage.current.innerText = `Devido as politicas do bank seu novo limite de parcelas é ${420-Number(sobra.toFixed(0))}`
      }else{
       installmentMessage.current.innerText = ''
      }
    }
  }

  function minValues(ev:React.KeyboardEvent<HTMLInputElement>){
    const target = ev.currentTarget 
    const prohibtedValue = (Number(target.value)*20) /100
    if(mensage.current && prohibitedMessage.current && installmentMessage.current && financementPercentMessage.current){
      if(Number(target.value) < 50){
        mensage.current.innerText = 'Valor minimo de imovel R$ 40,000'
      }else{
        mensage.current.innerText = ''
        financementPercentMessage.current.innerText = ''
        prohibitedMessage.current.innerText = ''
        installmentMessage.current.innerText = ''
        const financement = (Number(target.value) * 80) / 100
        setFinancement(`${financement}`)
        setProhibited(`${prohibtedValue}`)
      }
    }
  }

  function maxValue(ev:React.KeyboardEvent<HTMLInputElement>){
    const target = ev.currentTarget 
    const percent = (Number(target.value)/Number(immobile)) * 100 
    if(financementPercentMessage.current){
      if(percent>80){
        financementPercentMessage.current.innerText = 'Porcentagem máxima de financiamento atingida abaixe o valor'
        }else{
        financementPercentMessage.current.innerText = ''
        }
    }
  }

  function termBank(ev:ChangeEvent<HTMLSelectElement>){
    const target = ev.currentTarget
    setBank(target.value)
    if(bankMessage.current && taxsMessage.current && installmentMessage.current){
        if(target.value === 'bradesco'){
          setTaxs('6%')
          installmentMessage.current.innerText = ''
          taxsMessage.current.innerText = ''
          bankMessage.current.innerText = ''
        }else{
          bankMessage.current.innerText = 'Selecione um baco valido para dar continuidade'
          console.log('Outro banco')
        }
    }
    }
  
    

    async function createSimulation(ev:FormEvent){
      ev.preventDefault()
      const taxsConvertido = taxs.replace(/%/g,'')
      const taxaConta = 1/12
      const accountTaxa = Number(((Number(taxsConvertido)/100)+1)**taxaConta)-1
   
      const born = new Date(birthday).getFullYear()
      const currentYear = new Date().getFullYear()
      const account = (currentYear-born) + Number(terms)/12
      const prohibtedValue = (Number(immobile)*20) /100
      const percent = (Number(financement)/Number(immobile)) * 100
     
      if(bank === 'Selecione um bank'){
        if(bankMessage.current && taxsMessage.current){
          bankMessage.current.innerText = 'Selecione um banco valido para dar continuidade'
          taxsMessage.current.innerText = 'Preencha a taxa de taxs'
        }
      } 
      else if(birthday === ''){
        if(birthdayMessage.current){
          birthdayMessage.current.innerText = 'Preencha com sua data de born para dar continuidade.'
        }
      }else if(currentYear-born>80){
        if(birthdayMessage.current){
        birthdayMessage.current.innerText = 'Idade acima do permitido para financiamento.'
        }
      }else if(currentYear-born<18){
        if(birthdayMessage.current){ 
        birthdayMessage.current.innerText = 'Idade abaixo do permitido para financiamento.'
        }
      }
      else if(financement === '' && immobile === ''){
        if(mensage.current && financementPercentMessage.current && prohibitedMessage.current && bankMessage.current && taxsMessage.current && birthdayMessage.current){
        mensage.current.innerText = 'Preencha o valor do imovel'
        financementPercentMessage.current.innerText = 'Preencha o valor do financiamento'
        prohibitedMessage.current.innerText = 'Preencha o valor de entrada'
        bankMessage.current.innerText = ''
        taxsMessage.current.innerText = ''
        birthdayMessage.current.innerText = ''
        }
      }else if(financement === `${0}` && immobile === `${0}`){
        if(mensage.current && financementPercentMessage.current && prohibitedMessage.current && bankMessage.current && taxsMessage.current && birthdayMessage.current){
        prohibitedMessage.current.innerText = 'Preencha o valor de entrada'
        mensage.current.innerText = 'Preencha o valor do immobile'
        financementPercentMessage.current.innerText = 'Preencha o valor do financement'
        prohibitedMessage.current.innerText = 'Preencha o valor de prohibited'
        bankMessage.current.innerText = ''
        taxsMessage.current.innerText = ''
        birthdayMessage.current.innerText = ''
        }
      }else if(immobile === `${0}`){
        if(mensage.current){
          mensage.current.innerText = 'Preencha o valor do immobile'
        }
      }else if(financement === `${0}`){
        if(financementPercentMessage.current){
          financementPercentMessage.current.innerText = 'Preencha o valor do financement'
        }
      }else if(terms === ''){
        if(installmentMessage.current){
          installmentMessage.current.innerText = 'Preencha o numero de installments'
        }
      }else if(prohibited === '') {
        if(prohibitedMessage.current){
          prohibitedMessage.current.innerText = 'Preencha o valor de prohibited'
        }
      }else if(percent>80){
        if(financementPercentMessage.current){
          financementPercentMessage.current.innerText = 'Porcentagem máxima de financement atingida abaixe o valor'
        }
      }else if(bank === 'bradesco' && Number(terms)>420){
        if(installmentMessage.current){
          installmentMessage.current.innerText = 'Numero de installments acima do limite pra esse bank'
        }
      }else if(Number(prohibited)<Number(prohibtedValue)){
        if(prohibitedMessage.current){
          prohibitedMessage.current.innerText = `Valor minimo de prohibited R$ ${prohibtedValue},00`
        }
      }else if(taxs === ''){
        if(taxsMessage.current){
          taxsMessage.current.innerText = 'Preencha a taxa de taxs de acordo com o seu bank.'
        }
      }else if(Number(terms)<3){
        if(installmentMessage.current){
        installmentMessage.current.innerText = 'Numero de installments mininimas é 12.'
      }
      }else if(bank === 'bradesco' && account>80){
        const sobra = (account-80)*12 
        if(installmentMessage.current){
          installmentMessage.current.innerText = `Devido as politicas do bank seu novo limite de installments é ${420-Number(sobra.toFixed(0))}`
        }
      }else if(amortization === 'Selecione seu sistema de amortização'){
        if(amortMessage.current){
          amortMessage.current.innerText = 'Selecione um sistema '
        }
      }else if(expanses === ''){
        if(expanseMessage.current){
          expanseMessage.current.innerText = 'Selecione uma alternativa'
        }

      }else if(amortization === 'SAC' && bank=== 'bradesco'){
        setActive(false)
        if( summaryRef.current && amortMessage.current && financementPercentMessage.current && installmentMessage.current && prohibitedMessage.current && birthdayMessage.current && taxsMessage.current && expanseMessage.current && bankMessage.current){
        summaryRef.current.style.display = 'block'
        financementPercentMessage.current.innerText = ''
        installmentMessage.current.innerText = ''
        prohibitedMessage.current.innerText = ''
        bankMessage.current.innerText = ''
        birthdayMessage.current.innerText = ''
        taxsMessage.current.innerText = ''
        amortMessage.current.innerText = ''
        expanseMessage.current.innerText = ''
        const values:Number[] = []
        values.push(Number(financement))
        
        for(let i = 1; i<=Number(terms); i++){
          values.push(Number(financement) / Number(terms))
        }
  
        const result = values.reduce((acc,cur)=>{
          dueBalance.push(Number((Number(acc)-Number(cur)).toFixed(2)))
          return Number(acc)-Number(cur)
        })
  
        const amort = Number(financement) / Number(terms)
       
    
        for(let i = 1; i<=Number(terms); i++){
          const installment = (((5-Number([i])+1)*accountTaxa)+1)*amort
          installments.push(installment)
          var simulation = {
          installments:`Parcela ${i}`,
          installmentValue: installment.toFixed(2),
          taxs: (installment-amort).toFixed(2),
          financied: financement,
          amortization: amort.toFixed(2),
          dueBalance: dueBalance[i-1],
          }
          simulationsArray.push(simulation)   
      }
      setFirstInstallment(Number(installments[0]).toFixed(2))
      setLastInstallment(Number(installments[installments.length-1]).toFixed(2))
    }
      }else if(amortization === 'PRICE' && bank=== 'bradesco'){ 
      setActive(true)
      if(summaryRef.current && amortMessage.current && financementPercentMessage.current && installmentMessage.current && prohibitedMessage.current && birthdayMessage.current && taxsMessage.current && expanseMessage.current && bankMessage.current){
      summaryRef.current.style.display = 'block'
      financementPercentMessage.current.innerText = ''
      installmentMessage.current.innerText = ''
      prohibitedMessage.current.innerText = ''
      bankMessage.current.innerText = ''
      birthdayMessage.current.innerText = ''
      taxsMessage.current.innerText = ''
      amortMessage.current.innerText = ''
      expanseMessage.current.innerText = ''
      const values = []
      values.push(Number(financement))
      
    
      for(let i = 1; i<=Number(terms); i++){
        values.push(Number(financement) / Number(terms))
      }


      const result = values.reduce((acc,cur)=>{
        dueBalance.push(Number((Number(acc)-Number(cur)).toFixed(2)))
        return acc-cur
      })
      dueBalance.unshift(Number(financement))
      const amort = Number(financement) / Number(terms)
    

      for(let i = 1; i<=Number(terms); i++){
        const installment = Number(financement)*(((1+accountTaxa)**Number(terms))*accountTaxa)/((((1+accountTaxa)**Number(terms))-1))
        installments.push(installment)
        var simulation = {
        installments:`Parcela ${i}`,
        installmentValue: installment.toFixed(2),
        taxs: (Number(dueBalance[i-1])*accountTaxa).toFixed(2),
        financied: financement,
        amortization: (installment - (Number(dueBalance[i-1])*accountTaxa)).toFixed(2) ,
        dueBalance: dueBalance[i],
        
        }
        simulationsArray.push(simulation)  
      }

      setFirstInstallment(Number(installments[0]).toFixed(2))
      setLastInstallment(Number(installments[installments.length-1]).toFixed(2))
    
    }
        
    }
  
  }



  return(
   <ConsultorLayout>
    <title>Simulação - Consultor</title>
     <div className={style.accountiner}>
        <h1>Simulação</h1>
        <form className={style.form} onSubmit={(ev)=>createSimulation(ev)}>
          <label htmlFor="birthday">Data de born</label>
          <p ref={birthdayMessage} className={style.errorSpan}></p>
          <input 
          type="date" 
          name="birthday" 
          id="birthday"
          value={birthday}
          ref={inputBirthday}
          onChange={(ev)=>checkAge(ev)}
          />
          <label htmlFor="bank">Banco</label>
          <p ref={bankMessage} className={style.errorSpan}></p>
          <select 
          name="bank" 
          id="bank"
          value={bank}
          onChange={(ev)=>termBank(ev)}
          >
            <option value="selecione um bank">Selecione um bank</option>
            <option value="bradesco">Bradesco</option>
            <option value="santander">Santander</option>
          </select>
  
          <label htmlFor="house">Valor do immobile</label>
          <p ref={mensage} className={style.errorSpan}></p>
          <input 
          type="text" 
          name="house" 
          id="house"
          value={immobile} 
          onChange={(ev)=>setImmobile(ev.currentTarget.value)}
          onKeyUp={(ev)=>minValues(ev)}
          />
          <label htmlFor="financiment">Valor do financement</label>
          <p ref={financementPercentMessage} className={style.errorSpan}></p>
          <input 
          type="text" 
          name="financement" 
          id="financement" 
          ref={inputRef}
          value={financement}
          onChange={(ev)=>setFinancement(ev.currentTarget.value)}
          onKeyUp={(ev)=>maxValue(ev)}
          />
          <label htmlFor="prohibited">Valor da prohibited</label>
          <p ref={prohibitedMessage} className={style.errorSpan}></p>
          <input 
          type="text" 
          name="prohibited" 
          id="prohibited" 
          value={prohibited}
          onChange={(ev)=>setProhibited(ev.currentTarget.value)}
          onKeyUp={(ev)=>checkField(ev)}
          />
        
          <label htmlFor="term">Prazo</label>
          <p ref={installmentMessage} className={style.errorSpan}></p>
          <input 
          type="text" 
          name="term" 
          id="term" 
          value={terms}
          onChange={(ev)=>setTerms(ev.currentTarget.value)}
          onKeyUp={(ev)=>maxTerms(ev)}
          />
          <label htmlFor="amort">Sistema de Amortização</label>
          <p ref={amortMessage} className={style.errorSpan}></p>
          <input 
          type="text" 
          name="amort" 
          id="amort"
          value={amortization}
          onChange={(ev)=>checkSistem(ev)}
          />
          <label htmlFor="taxs">Taxas de Juros</label>
          <p ref={taxsMessage} className={style.errorSpan}></p>
          <input 
          type="text" 
          name="taxs" 
          id="taxs" 
          value={taxs}
          onChange={(ev)=>setTaxs(ev.currentTarget.value)}
          />
          <label htmlFor="expanses">Incluir expanses?</label>
          <p ref={expanseMessage} className={style.errorSpan}></p>
          <div className={style.radios}>
          <div className={style.radio}>
            <label htmlFor="sim">Sim</label>
            <input
            type="radio"
            name="expanses"
            value={'Sim'}
            checked={expanses === 'Sim'}
            onChange={(ev)=>expansesFunction(ev)}
            />
          </div>
          <div className={style.radio}>
            <label htmlFor="nao">Não</label>
            <input
            type="radio"
            name="expanses"
            value={'Não'}
            checked={expanses === 'Não'}
            onChange={(ev)=>expansesFunction(ev)}
            />
          </div>
          </div>
          <div className={style.outputContainer} ref={outputRef}>
          <label htmlFor="expanses">Despesas</label>
          <input 
          type="text" 
          className={style.outputRef}
          value={expanseValue}
          />
        </div>
          <div>
            <button ref={btnRef}>SIMULAR</button>
            <button onClick={cleanFields} ref={cleanBtn}>LIMPAR</button>
          </div>
        </form>

        {active === true?(
      <div className={style.summary} ref={summaryRef}>
        <h2>Resumo do financement</h2>
        <h4>Valor Imovel: R$ {immobile}</h4>
        <h4>Valor Financiamento: R$ {financement}</h4>
        <h4>Valor Entrada: R$ {prohibited}</h4>
        <h4>Renda Minima: (NÃO INFORMADO)</h4>
        {expanses === 'Sim'?(
          <h4>Despesas: R$ {Number(expanseValue).toFixed(2)}</h4>
        ):(
          <h4>Despesas: (NÃO INFORMADO)</h4>
        )}
        <h4>Vistoria: R$ 2.114,03</h4>
        <h4>Valor Total Financiado: R$ {Number(account).toFixed(2)}</h4>
        <h4>Prazo: {terms} meses</h4>
        <h4>Primeira Parcela: R$ {firstInstallment}</h4>
        <h4>Ultima Parcela: R$ {lastInstallment}</h4>
        <h4>Valor CET: (NÃO INFORMADO)</h4> 
        <h4>Valor CESH: (NÃO INFORMADO)</h4> 
        <h4>Taxa Efetiva: {taxs}</h4> 
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
      <div className={style.summary} ref={summaryRef}>
      <h2>Resumo do financement</h2>
      <h4>Valor Imovel: R$ {immobile}</h4>
      <h4>Valor Financiamento: R$ {financement}</h4>
      <h4>Valor Entrada: R$ {prohibited}</h4>
      <h4>Renda Minima: (NÃO INFORMADO)</h4>
      {expanses === 'Sim'?(
          <h4>Despesas: R$ {Number(expanseValue).toFixed(2)}</h4>
      ):(
          <h4>Despesas: (NÃO INFORMADO)</h4>
      )}
      <h4>Vistoria: R$ 2.114,03</h4>
      <h4>Valor Total Financiado: R$ {Number(financement).toFixed(2)}</h4>
      <h4>Prazo: {terms} meses</h4>
      <h4>Primeira Parcela: R$ {firstInstallment}</h4>
      <h4>Ultima Parcela: R$ {lastInstallment}</h4>
      <h4>Valor CET: (NÃO INFORMADO)</h4>
      <h4>Valor CESH: (NÃO INFORMADO)</h4>
      <h4>Taxa Efetiva: {taxs}</h4>
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