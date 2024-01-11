'use client'
import {useRef, useState } from 'react'
import style from '../../styles/pesquisa.module.scss'
import Link from 'next/link'
import LayoutClient from '@/src/components/LayoutClient'
import itauSvg from '@/public/itauSvg.svg'
import bradescoSvg from '@/public/bradescoSvg.svg'
import santanderSvg from '@/public/santanderSvg.svg'
import bbSvg from '@/public/bbSvg.svg'
import caixaSvg from '@/public/caixaSvg.svg'
import taxSvg from '@/public/taxSvg.svg'
import houseSvg from '@/public/houseSvg.svg'
import billsSvg from '@/public/billsSvg.svg'
import clientSvg from '@/public/clientSvg.svg'

export const metadata = {
  title: 'Pesquisa'
}

export default function Pesquisa(){
const [busca,setBusca] = useState('') 
const parcelasRef = useRef<HTMLParagraphElement>(null)
const imovelRef = useRef<HTMLParagraphElement>(null)
const taxsRef = useRef<HTMLParagraphElement>(null)
const errorMessage = useRef<HTMLParagraphElement>(null)
const refBank = useRef<HTMLDivElement>(null)
const cardRef = useRef<HTMLDivElement>(null)
const idRef = useRef<HTMLParagraphElement>(null)
const [id,setId] = useState()

  async function pesquisarProtocolo(ev:any){
  ev.preventDefault()
  const dbProcess = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/processos`)
  const jsonProcess:any[] = await dbProcess.json()
  const filterProcess = jsonProcess.filter((process)=>process.protocoloaleatorio === busca)
    if(taxsRef.current && parcelasRef.current && imovelRef.current && cardRef.current && errorMessage.current && refBank.current){
    if(filterProcess.length<1 ){
      errorMessage.current.innerText = 'Nenhum processo foi encontrado'
    }else{
      setId(filterProcess[0].id)
      errorMessage.current.innerText = ''
      cardRef.current.style.display = 'flex'
      const bankImg = document.createElement('img')
      bankImg.width = 90
      bankImg.height = 90
      bankImg.alt = 'Bank name svg'
      if(filterProcess[0].banco === 'Bradesco'){
      bankImg.src = bradescoSvg.src
      }else if(filterProcess[0].banco === 'santander'){
      bankImg.src = santanderSvg.src
      }else if(filterProcess[0].banco === 'banco do brasil'){
      bankImg.src = bbSvg.src
      }else if(filterProcess[0].banco === 'itau'){
      bankImg.src = itauSvg.src
      }else{
      bankImg.src = caixaSvg.src
      }
      refBank.current.append(bankImg)
      
      const divTax = document.createElement('div')
      const img = document.createElement('img')
      img.width = 30
      img.height = 30
      img.alt = 'Tax icon'
      img.src = taxSvg.src
      const taxSpan = document.createElement('span')
      taxSpan.innerText = `${filterProcess[0].juros} JUROS/A`
      divTax.append(img,taxSpan)
      taxsRef.current.appendChild(divTax)
  
      const divHouse = document.createElement('div')
      const imgHouse = document.createElement('img')
      imgHouse.width = 30
      imgHouse.height = 30
      imgHouse.alt = 'House icon'
      imgHouse.src = houseSvg.src
      const spanHouse = document.createElement('span')
      spanHouse.innerText = `R$ ${filterProcess[0].valorimovel}`
      divHouse.append(imgHouse,spanHouse)
      imovelRef.current.appendChild(divHouse)
  
      const divBills = document.createElement('div')
      const imgBills = document.createElement('img')
      imgBills.width = 30
      imgBills.height = 30
      imgBills.alt = 'Bills icon'
      imgBills.src = billsSvg.src
      const spanBills = document.createElement('span')
      spanBills.innerText = `${filterProcess[0].numeroparcelas} PARCELAS`
      divBills.append(imgBills,spanBills)
      parcelasRef.current.appendChild(divBills)
    }
  }
    
 
  }


  return(
    <LayoutClient>
    <div className={style.container}>
    <title>Pesquisar Protocolo</title>
    <main className={style.main}>
      <form className={style.form} onSubmit={(ev)=>pesquisarProtocolo(ev)}>
        <label htmlFor="pesquisa">Pesquisar seu processo</label>
        <input 
        type="text" 
        name='pesquisa' 
        id='pesquisa'
        value={busca}
        onChange={(ev)=> setBusca(ev.currentTarget.value)}
        />
        <button>PESQUISAR</button>
      </form>
      <p ref={errorMessage} className={style.errorSpan}></p>
      <div className={style.card} ref={cardRef}>
      <div ref={refBank}></div>
      <p ref={taxsRef}></p>
      <p ref={imovelRef}></p>
      <p ref={parcelasRef}></p>
      <button><Link href={`pesquisa/${id}`}>Ver mais</Link></button>
      </div>
    </main>
    </div>
    </LayoutClient>

  )
}