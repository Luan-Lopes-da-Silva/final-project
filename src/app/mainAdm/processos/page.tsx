'use client'
import LayoutAdmin from "../../../components/LayoutAdmin";
import {useRef,useEffect} from 'react'
import style from '../../../styles/processosAdm.module.scss'
import itauSvg from '@/public/itauSvg.svg'
import bradescoSvg from '@/public/bradescoSvg.svg'
import santanderSvg from '@/public/santanderSvg.svg'
import bbSvg from '@/public/bbSvg.svg'
import caixaSvg from '@/public/caixaSvg.svg'
import taxSvg from '@/public/taxSvg.svg'
import houseSvg from '@/public/houseSvg.svg'
import billsSvg from '@/public/billsSvg.svg'
import clientSvg from '@/public/clientSvg.svg'


export default function Processos(){
  const refContainer = useRef<HTMLDivElement>(null)
  const refIndicacoes = useRef<HTMLDivElement>(null)

  type Process ={
    nomecliente: string
    emailcliente: string
    telefonecliente:string
    valorimovel: string
    numeroparcelas : number
    primeiraParcela : string
    ultimaParcela : string
    banco: string
    amortizacao: string
    juros: string
    etapa: string
    status: string
    nomeconsultor: string
    telefoneconsultor : string
    idconsultor: string
    protocoloaleatorio: string
    id: number
    message: string
  }

  type UserAdm = {
    name: string
    idAdm: string
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
  const test = async () =>{
  const localUser:UserAdm[] = getLocalStorage()
  const response = await fetch('https://db-indicacoes.onrender.com/processos')
  const responseJson: Process[] = await response.json()

    for(let i = 0; i<responseJson.length; i++ ){
    const article = document.createElement('article')
    article.id = `${responseJson[i].id}`
    
    const bankImg = document.createElement('img')
    bankImg.width = 90
    bankImg.height = 90
    bankImg.alt = 'Bank name svg'
    if(responseJson[i].banco === 'bradesco'){
    bankImg.src = bradescoSvg.src
    }else if(responseJson[i].banco === 'santander'){
    bankImg.src = santanderSvg.src
    }else if(responseJson[i].banco === 'banco do brasil'){
      bankImg.src = bbSvg.src
    }else if(responseJson[i].banco === 'itau'){
      bankImg.src = itauSvg.src
    }else{
    bankImg.src = caixaSvg.src
    }
    
    const divTax = document.createElement('div')
    const img = document.createElement('img')
    img.width = 30
    img.height = 30
    img.alt = 'Tax icon'
    img.src = taxSvg.src
    const taxSpan = document.createElement('span')
    taxSpan.innerText = `${responseJson[i].juros} JUROS/A`
    divTax.append(img,taxSpan)

    const divHouse = document.createElement('div')
    const imgHouse = document.createElement('img')
    imgHouse.width = 30
    imgHouse.height = 30
    imgHouse.alt = 'House icon'
    imgHouse.src = houseSvg.src
    const spanHouse = document.createElement('span')
    spanHouse.innerText = `R$ ${responseJson[i].valorimovel}`
    divHouse.append(imgHouse,spanHouse)

    const divBills = document.createElement('div')
    const imgBills = document.createElement('img')
    imgBills.width = 30
    imgBills.height = 30
    imgBills.alt = 'Bills icon'
    imgBills.src = billsSvg.src
    const spanBills = document.createElement('span')
    spanBills.innerText = `${responseJson[i].numeroparcelas} PARCELAS`
    divBills.append(imgBills,spanBills)
    
    const divClient = document.createElement('div')
    const imgClient = document.createElement('img')
    imgClient.width = 30
    imgClient.height = 30
    imgClient.alt = 'Client icon'
    imgClient.src = clientSvg.src
    const spanClient = document.createElement('span')
    spanClient.innerText = responseJson[i].nomecliente

    divClient.append(imgClient,spanClient)
    
    const button = document.createElement('button')
    if(responseJson[i].nomeconsultor === ""){
      button.innerHTML = `<a href = processWithoutConsult/${responseJson[i].id}>Checar processo</a>`
    }else if(responseJson[i].nomeconsultor === localUser[0].name){
      button.innerHTML = `<a href = processAdm/${responseJson[i].id}>Checar processo</a>`
    }
    else{
      button.innerHTML = `<a href = processoOrganico/${responseJson[i].id}>Checar processo</a>`
    }
    

    article.append(bankImg,divTax,divHouse,divBills,divClient,button)
    if(refContainer.current){
      refContainer.current.append(article)
    }
    }
  }
  test()
  
  },[])
  return(
    <LayoutAdmin>
      <title>Processos</title>
      <main className={style.main}>
      <h1>Processos organicos</h1>
      <div ref={refContainer} className={style.container}>

      </div>
      <h1>Indicações</h1>
      <div ref={refIndicacoes} className={style.container}></div>
      </main>
    </LayoutAdmin>
  )
}