'use client'

import { useEffect, useRef } from "react"
import style from '../../../../styles/processosAdm.module.scss'
import LayoutAdmin from "@/src/components/LayoutAdm"

export default function Consultor({params}){
  const nameRef = useRef()
  const emailRef = useRef()
  const operationsRef = useRef()

  useEffect(() => {
    const fetchData = async (params) => {
      try {
        const answer = await fetch(`http://localhost:3000/consultores/${params.id}`);
        if (!answer.ok) {
          throw new Error('Não foi possível obter os dados da API');
        }
        let dadosJson = await answer.json();
        
        nameRef.current.innerText = dadosJson.nome
        emailRef.current.innerText = dadosJson.email
        operationsRef.current.innerText = `Operações em andamento ${dadosJson.operacoes.length}`
    
  
      } catch (erro) {
        console.error('Erro ao obter dados da API:', erro);
      }
    };
    fetchData(params)
  });
return(
  <LayoutAdmin>
  <main className={style.main}>
  <h1 ref={nameRef}></h1>
  <div className={style.container}>
    <span ref={emailRef}></span>
    <span ref={operationsRef}></span>
  </div>
  </main>
  </LayoutAdmin>

)
}