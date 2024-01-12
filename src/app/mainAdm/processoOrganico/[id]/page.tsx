'use client'
import LayoutAdmin from "@/src/components/LayoutAdmin";
import { useEffect, useRef } from "react";

export default function ProcessPage({params}:any){
  const entradaRef = useRef<HTMLParagraphElement>(null)
  const parcelasRef = useRef<HTMLParagraphElement>(null)
  const amortizacaoRef = useRef<HTMLParagraphElement>(null)
  const financiamentoRef = useRef<HTMLParagraphElement>(null)

type OrganicProcess = {
entrada:string
parcelas: string
amortizacao: string
financiamento: string
}
  async function getProcess(){
   try {
    const dbResponse = await fetch(`http://localhost:3000/organicos/${params.id}`)
    const responseJson: OrganicProcess = await dbResponse.json()
    console.log(responseJson)
    if(entradaRef.current && financiamentoRef.current && parcelasRef.current && amortizacaoRef.current){
    financiamentoRef.current.innerText = `Valor financiado : ${responseJson.financiamento}`
    parcelasRef.current.innerText = `Numero de parcelas : ${responseJson.parcelas.length}`
    amortizacaoRef.current.innerText = `Sistema de amortização : ${responseJson.amortizacao}`
    }
   } catch (error) {
   console.log(error)
   }
  }

  useEffect(()=>{
  getProcess()  
  })
  return(
    <LayoutAdmin>
      <h1>Dados do imóvel</h1>
      <p ref={entradaRef}></p>
      <p ref={financiamentoRef}></p>
      <p ref={parcelasRef}></p>
      <p ref={amortizacaoRef}></p>
    </LayoutAdmin>
  )
}