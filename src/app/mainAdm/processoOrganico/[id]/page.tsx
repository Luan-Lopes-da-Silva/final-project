'use client'
import LayoutAdmin from "@/src/components/LayoutAdmin";
import { useEffect, useRef } from "react";

export default function ProcessPage({params}:any){
  const prohibitedRef = useRef<HTMLParagraphElement>(null)
  const installmentsRef = useRef<HTMLParagraphElement>(null)
  const amortizationRef = useRef<HTMLParagraphElement>(null)
  const financementRef = useRef<HTMLParagraphElement>(null)

type OrganicProcess = {
prohibited:string
installments: string
amortization: string
financiament: string
}
  async function getProcess(){
   try {
    const dbResponse = await fetch(`http://localhost:3000/organicos/${params.id}`)
    const responseJson: OrganicProcess = await dbResponse.json()
    console.log(responseJson)
    if(prohibitedRef.current && financementRef.current && installmentsRef.current && amortizationRef.current){
    financementRef.current.innerText = `Valor financiado : ${responseJson.financiament}`
    installmentsRef.current.innerText = `Numero de parcelas : ${responseJson.installments.length}`
    amortizationRef.current.innerText = `Sistema de amortização : ${responseJson.amortization}`
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
      <p ref={prohibitedRef}></p>
      <p ref={financementRef}></p>
      <p ref={installmentsRef}></p>
      <p ref={amortizationRef}></p>
    </LayoutAdmin>
  )
}