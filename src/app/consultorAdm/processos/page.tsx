'use client'

import { useEffect,useRef, useState } from "react"
import style from '@/src/styles/processosConsultor.module.scss'
import ConsultorLayout from "@/src/components/ConsultorLayout"
import taxSvg from "@/public/taxSvg.svg"
import houseSvg from "@/public/houseSvg.svg"
import billsSvg from "@/public/billsSvg.svg"
import clientSvg from "@/public/clientSvg.svg"
import bradescoSvg from "@/public/bradescoSvg.svg"
import santanderSvg from "@/public/santanderSvg.svg"
import bbSvg from "@/public/bbSvg.svg"
import itauSvg from "@/public/Itau.svg"
import caixaSvg from "@/public/caixaSvg.svg"


type User = {
  avatar: string
  email: string
  id: number
  idconsultant: string
  nome: string
  telefone: string
  role: string
  memberSince: string
}

type Process = {
banco: string,
email: string,
etapa: string,
id: string,
idconsultant: string,
imovel:string,
mes: string,
message: string,
valorimovel:string,
numeroparcelas:string,
nomecliente:string
modalidade:string,
name: string,
parcelas: number,
primeiraparcela: number,
ultimaparcela: number,
protocoloaleatorio : string,
status: string,
telefone: string
}



function getLocalStorage(): User  {
  const dataString = localStorage.getItem('Usuario Logado')
  const defaultUser:User = {
    avatar: 'Undefined',
    email:  'Undefined',
    id: 12,
    idconsultant: 'Undefined',
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

export default function Processos(){
  const refContainer = useRef<HTMLDivElement>(null)
  


  useEffect(()=>{
  const getUser = async () =>{
  const localUser = getLocalStorage()
  const url = process.env.NEXT_PUBLIC_APIURL
  const operations = await fetch(`${url}/processos`)
  const operationsJson:any[] = await operations.json()
  const operationsOfUser = operationsJson.filter(operation=>(operation.idconsultor === localUser.idconsultant))
  if(refContainer.current){
  if(operationsOfUser.length>0){
    for(let i=0; i<operationsOfUser.length;i++){
      const processContainer = document.createElement('article')
      processContainer.id = operationsOfUser[i].id
    
      const imgPrincipal = document.createElement('img')
    
      if(operationsOfUser[i].banco === 'Bradesco'){
        imgPrincipal.width = 150
        imgPrincipal.height = 150
        imgPrincipal.alt = 'Bank svg'
        imgPrincipal.style.objectFit = 'cover'
        imgPrincipal.src = bradescoSvg.src
      }else if(operationsOfUser[i].banco === 'Santander'){
        imgPrincipal.width = 380
        imgPrincipal.height = 80
        imgPrincipal.alt = 'Bank svg'
        imgPrincipal.style.objectFit = 'cover'
        imgPrincipal.src = santanderSvg.src
      }else if(operationsOfUser[i].banco === 'Itau'){
        imgPrincipal.width = 150
        imgPrincipal.height = 150
        imgPrincipal.alt = 'Bank svg'
        imgPrincipal.style.objectFit = 'cover'
        imgPrincipal.src = itauSvg.src
      }else if(operationsOfUser[i].banco === 'Caixa'){
        imgPrincipal.width = 380
        imgPrincipal.height = 80
        imgPrincipal.alt = 'Bank svg'
        imgPrincipal.style.objectFit = 'cover'
        imgPrincipal.src = caixaSvg.src
      }else{
        imgPrincipal.width = 150
        imgPrincipal.height = 150
        imgPrincipal.alt = 'Bank svg'
        imgPrincipal.style.objectFit = 'cover'
        imgPrincipal.src = bbSvg.src
      }
      
      
      const divHouse = document.createElement('div')
      const houseSpan = document.createElement('p')
      houseSpan.innerText = `R$ ${operationsOfUser[i].valorimovel}`
      const svgHouse = document.createElement('img')
      svgHouse.width = 20
      svgHouse.height = 20
      svgHouse.alt = 'Svg House'
      svgHouse.src = houseSvg.src
      
      divHouse.append(svgHouse,houseSpan)

      const divBills = document.createElement('div')
      const billsSpan = document.createElement('p')
      billsSpan.innerText = `${operationsOfUser[i].numeroparcelas} parcelas`
      const svgBills = document.createElement('img')
      svgBills.width = 20
      svgBills.height = 20
      svgBills.alt = 'Svg Bills'
      svgBills.src = billsSvg.src
      
      divBills.append(svgBills,billsSpan)
      
      
      const divName = document.createElement('div')
      const nameOfClientSpan = document.createElement('p')
      const svgName = document.createElement('img')
      svgName.width = 20
      svgName.height = 20
      svgName.alt = 'SVG name'
      svgName.src = clientSvg.src
      nameOfClientSpan.innerText = operationsOfUser[i].nomecliente
      
       divName.append(svgName,nameOfClientSpan)
      const button = document.createElement('button')
      button.innerHTML = `<a href='processos/${operationsOfUser[i].id}'>Checar</a>`
    
      processContainer.append(imgPrincipal,divHouse,divBills,divName,button)
      refContainer.current.append(processContainer)
      }
  }else{
    const emptySpan = document.createElement('p') 
    emptySpan.innerText = 'Você ainda não tem nenhum processo registrado em sua conta'
    refContainer.current.append(emptySpan)
  }
  }
  }
  getUser()
  },[])
  return(
    <ConsultorLayout>
    <title>Seus Processos</title>
    <div className={style.container}>
     <h1>Ver processos</h1>
     <div ref={refContainer} className={style.processContainer}>
     </div>
    </div>
    </ConsultorLayout>
  )
}