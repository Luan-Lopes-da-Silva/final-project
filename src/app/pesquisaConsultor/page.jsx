'use client'
import { useRef, useState } from 'react'
import style from '../../styles/pesquisa.module.scss'
import Link from 'next/link'
import LayoutDefault from '@/src/components/LayoutDefault'


export const metadata = {
  title: 'Pesquisa'
}

export default function Pesquisa(){
const [search,setSearch] = useState() 
const installmentsRef = useRef()
const financiedRef = useRef()
const protocolRef = useRef()
const errorMessage = useRef()
const cardRef = useRef()
const idRef = useRef()
const [id,setId] = useState()

  async function searchProtocol(ev){
    const operations = await fetch(`${process.env.NEXT_PUBLIC_APIURL}`).then((res)=>res.json());
    const findOperation = operations.filter(operation=> operation.protocoloAleatorio === ev)
    
    if(findOperation.length>0){
    errorMessage.current.innerText = ''
    cardRef.current.style.display = 'block'
    financiedRef.current.innerText = `Financiado: ${findOperation[0].financiamento}`
    protocolRef.current.innerText = `Protocolo: ${findOperation[0].protocoloAleatorio.replace(/\w{66}$/m,'...')}`

    setId(findOperation[0].id)
    }else{
    cardRef.current.style.display = 'none'
    errorMessage.current.innerText = 'Protocolo não encontrado'
    }
  }


  return(
    <LayoutDefault>
    <div className={style.container}>
    <title>Pesquisar Protocolo</title>
    <main className={style.main}>
      <form className={style.form}>
        <label htmlFor=""pesquisa>Pesquisar seu processo</label>
        <input 
        type="text" 
        name='pesquisa' 
        id='pesquisa'
        value={search}
        onChange={(ev)=> searchProtocol(ev.currentTarget.value)}
        />
      </form>
      <p ref={errorMessage}></p>
      <div className={style.card} ref={cardRef}>
      <p ref={installmentsRef}></p>
      <p ref={financiedRef}></p>
      <p ref={protocolRef}></p>
      <p ref={idRef}></p>
      <button><Link href={`pesquisa/${id}`}>Ver mais</Link></button>
      </div>
    </main>
    </div>
    </LayoutDefault>

  )
}