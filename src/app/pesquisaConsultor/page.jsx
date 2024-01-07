'use client'
import { useRef, useState } from 'react'
import style from '../../styles/pesquisa.module.scss'
import Link from 'next/link'
import LayoutDefault from '@/src/components/LayoutDefault'


export const metadata = {
  title: 'Pesquisa'
}

export default function Pesquisa(){
const [busca,setBusca] = useState() 
const parcelasRef = useRef()
const financiadoRef = useRef()
const protocoloRef = useRef()
const errorMessage = useRef()
const cardRef = useRef()
const idRef = useRef()
const [id,setId] = useState()

  async function pesquisarProtocolo(ev){
    const operations = await fetch(`${process.env.NEXT_PUBLIC_APIURL}`).then((res)=>res.json());
    const findOperation = operations.filter(operation=> operation.protocoloAleatorio === ev)
    
    if(findOperation.length>0){
    errorMessage.current.innerText = ''
    cardRef.current.style.display = 'block'
    financiadoRef.current.innerText = `Financiado: ${findOperation[0].financiamento}`
    protocoloRef.current.innerText = `Protocolo: ${findOperation[0].protocoloAleatorio.replace(/\w{66}$/m,'...')}`

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
        value={busca}
        onChange={(ev)=> pesquisarProtocolo(ev.currentTarget.value)}
        />
      </form>
      <p ref={errorMessage}></p>
      <div className={style.card} ref={cardRef}>
      <p ref={parcelasRef}></p>
      <p ref={financiadoRef}></p>
      <p ref={protocoloRef}></p>
      <p ref={idRef}></p>
      <button><Link href={`pesquisa/${id}`}>Ver mais</Link></button>
      </div>
    </main>
    </div>
    </LayoutDefault>

  )
}