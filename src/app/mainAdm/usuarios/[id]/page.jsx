'use client'

import { useEffect, useRef } from "react"
import style from '../../../../styles/processosAdm.module.scss'
import LayoutAdmin from "@/src/components/LayoutAdm"

export default function Consultor({params}){
  const refNome = useRef()
  const refEmail = useRef()
  const refOperações = useRef()

  useEffect(() => {
    const fetchData = async (params) => {
      try {
        const resposta = await fetch(`http://localhost:3000/consultores/${params.id}`);
        if (!resposta.ok) {
          throw new Error('Não foi possível obter os dados da API');
        }
        let dadosJson = await resposta.json();
        
        refNome.current.innerText = dadosJson.nome
        refEmail.current.innerText = dadosJson.email
        refOperações.current.innerText = `Operações em andamento ${dadosJson.operacoes.length}`
    
  
      } catch (erro) {
        console.error('Erro ao obter dados da API:', erro);
      }
    };
    fetchData(params)
  });
return(
  <LayoutAdmin>
  <main className={style.main}>
  <h1 ref={refNome}></h1>
  <div className={style.container}>
    <span ref={refEmail}></span>
    <span ref={refOperações}></span>
  </div>
  </main>
  </LayoutAdmin>

)
}