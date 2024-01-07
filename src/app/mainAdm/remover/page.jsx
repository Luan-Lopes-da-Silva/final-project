'use client'
import { useEffect,useRef } from "react";
import LayoutAdmin from "../../../components/LayoutAdm";
import style from '../../../styles/processosAdm.module.scss'

export default function RemoverConsultores(){
  const containerRef = useRef()
  useEffect(()=>{
  const test = async () =>{
  const response = await fetch('http://localhost:3000/consultores')
  const responseJson = await response.json()

  for(let i = 0; i<responseJson.length; i++){
  const div = document.createElement('div')
  div.id = responseJson[i].id
  const nomeSpan = document.createElement('span')
  nomeSpan.innerText = `${responseJson[i].nome}`
  const emailSpan = document.createElement('span')
  emailSpan.innerText = `${responseJson[i].email}`

  const button = document.createElement('button')
  button.innerText = 'Deletar'
  button.addEventListener('click' , async (ev)=>{
  containerRef.current.removeChild(div)
  await fetch(`http://localhost:3000/consultores/${responseJson[i].id}`,{method:'DELETE'})
  
  })
  div.append(nomeSpan,emailSpan,button)
  containerRef.current.appendChild(div)
  }
  }
  test()
  },[])
  return(
    <LayoutAdmin>
    <main className={style.main}>
    <h1>Consultores</h1>
    <div ref={containerRef} className={style.container}>
    </div>
    </main>
    </LayoutAdmin>
  )
}