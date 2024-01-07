'use client'
import {  FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import LayoutConsultorDashBoard from "@/src/components/LayoutConsultorDashboard";
import style from '@/src/styles/homeConsultor.module.scss'
import closeSvg from '@/public/Vector.svg'
import Image from "next/image";
import expandSvg from '@/public/expandSvg.svg'
import expandRotateSvg from '@/public/expandRotate.svg'
import React from 'react'


export default function Home(){
  const refProcessos = useRef<HTMLSpanElement>(null)
  const refFinalizados = useRef<HTMLSpanElement>(null)
  const refProcessosTotais = useRef<HTMLSpanElement>(null)
  const refFinalizadosTotais = useRef<HTMLSpanElement>(null)
  const tasksContainer = useRef<HTMLDivElement>(null)
  const refForm = useRef<HTMLFormElement>(null)
  const [nameTask,setNameTask] = useState('')
  const [summaryTask,setSummaryTask] = useState('')
 
  let countTeste = 1
  
  type Process = {
    id: string
    name: string
    email: string
    telefone: string
    banco: string
    modalidade: string
    imovel: string
    parcelas: number
    primeiraparcela: number
    ultimaparcela:number
    status: string
    idconsultor: string
    mesinicio: string
    mesfinalizado:string
    protocoloaleatorio: string
  }

  type User = {
    avatar: string
    email: string
    id: number
    idConsultor: string
    nome: string
    telefone: string
  }

  type Task = {
    name: string | null
    task: string | null
    idConsultor: string | null
    id?:number 
  }


  
  function openForm (){
    if(refForm.current){
      refForm.current.style.display = 'block'
    }
  }

  function closeForm (){
    if(refForm.current){
      refForm.current.style.display = 'none'
    }
  }

  function getLocalStorage(): User  {
    const dataString = localStorage.getItem('Usuario Logado')
    const defaultUser:User = {
      avatar: 'Undefined',
      email:  'Undefined',
      id: 12,
      idConsultor: 'Undefined',
      nome: 'Undefined',
      telefone: 'Undefined'
  }

    if(dataString){
      return JSON.parse(dataString)
    }else{
      return  defaultUser
    }
  }
  const handleButtonClick = async(ev:any)=>{
    const buttonElement = ev.currentTarget as HTMLButtonElement | null;
        
          if (buttonElement && buttonElement.parentElement) {
            tasksContainer.current?.removeChild(buttonElement.parentElement);
        
            try {
              const response = await fetch(`http://localhost:3000/tasks/${buttonElement.parentElement.id}`, {
                method: 'DELETE',
              });
        
              if (response.ok) {
                // Tratar a exclusão bem-sucedida
                console.log('Tarefa excluída com sucesso!');
              } else {
                // Tratar a falha na exclusão
                console.error('Falha ao excluir a tarefa:', response.status);
              }
            } catch (error) {
              // Tratar erros na requisição
              console.error('Erro ao excluir a tarefa:', error);
            }
          }
  }
  const handleImageClick = async (ev: any) => {
    countTeste++;
    if (ev.currentTarget instanceof HTMLImageElement && ev.currentTarget.parentElement) {
      if (countTeste % 2 === 0) {
        ev.currentTarget.parentElement.style.height = '100%';
        ev.currentTarget.src = expandRotateSvg.src;
  
        const p = ev.currentTarget.parentElement.querySelector('p');
        if (p) {
          p.style.display = 'block';
          p.style.width = '500px';
        }
      } else {
        ev.currentTarget.parentElement.style.height = '42px';
        ev.currentTarget.src = expandSvg.src;
  
        const p = ev.currentTarget.parentElement.querySelector('p');
        if (p) {
          p.style.display = 'none';
        }
      }
    }
  };

  const createTask = async (ev:FormEvent) => {
    ev.preventDefault()
    if(localStorage.getItem('Usuario Logado')){
      const loginUser:User = getLocalStorage()
      const task:Task = {
        name: nameTask,
        task: summaryTask,
        idConsultor: loginUser.idConsultor
      }
      
     const createTask = await fetch(`http://localhost:3000/tasks`,{
      method: 'POST',
      body: JSON.stringify(task),
      headers:{
        "Content-Type": "application/json"
      }
     })

     const tasksDb = await fetch('http://localhost:3000/tasks')
     const tasksConversed: Task[] = await tasksDb.json()
     
     const filter:Task[] = tasksConversed.filter(task=>(task.idConsultor === loginUser.idConsultor))
     

     const container = document.createElement('article')
      container.id = `${filter[filter.length-1].id}`
      const nameOfTask = document.createElement('span')
      nameOfTask.innerText = `${filter[filter.length-1].name}`
      const summaryOfTask = document.createElement('p')
      summaryOfTask.innerText = `${filter[filter.length-1].task}`
      const button = document.createElement('button')
      button.innerText = 'EXCLUIR TAREFA'
      const img = document.createElement('img')
      img.src = expandSvg.src
      img.width = 20
      img.height = 20
      img.alt = 'Expand svg'
      
      img.addEventListener('click', handleImageClick);
      button.addEventListener('click', handleButtonClick);
      container.append(nameOfTask,summaryOfTask,button,img)
      tasksContainer.current?.append(container)
      setNameTask('')
      setSummaryTask('')
  }
}

  const renderTasks = async () => {
    if(localStorage.getItem('Usuario Logado')){
      const loginUser:User = getLocalStorage()
      const task:Task = {
        name: nameTask,
        task: summaryTask,
        idConsultor: loginUser.idConsultor
      }
      
  
      const tasksDb = await fetch('http://localhost:3000/tasks')
      const tasksConversed: Task[] = await tasksDb.json()
      
      const filter:Task[] = tasksConversed.filter(task=>(task.idConsultor === loginUser.idConsultor))
      
  
     for(let i=0; i<filter.length; i++){
      const container = document.createElement('article')
      container.id = `${filter[i].id}`
      const nameOfTask = document.createElement('span')
      nameOfTask.innerText = `${filter[i].name}`
      const summaryOfTask = document.createElement('p')
      summaryOfTask.innerText = `${filter[i].task}`
      const button = document.createElement('button')
      button.innerText = 'EXCLUIR TAREFA'
      const img = document.createElement('img')
      img.src = expandSvg.src
      img.width = 20
      img.height = 20
      img.alt = 'Expand svg'
      
      img.addEventListener('click',handleImageClick)
        button.addEventListener('click',handleButtonClick)
      container.append(nameOfTask,summaryOfTask,button,img)
      tasksContainer.current?.append(container)
     }
    }
    
  }
  
  useEffect(()=>{
    const url = process.env.NEXT_PUBLIC_APIURL
    try {
      const insertInfos = async () =>{
        const loginUser:User = getLocalStorage()
          const processos = await fetch (`${url}/processos`)
          const processosJson: Process[] = await processos.json()
          const data = new Date()
          const numeroMes = data.getMonth()
          var nomesDosMeses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
          ];
          var nomeDoMes = nomesDosMeses[numeroMes];
          const filterTotal: Process[] = processosJson.filter(process=>(process.idconsultor === loginUser.idConsultor))
          const totalMensal =filterTotal.filter(process=>(process.mesinicio === nomeDoMes))
          const mensalFinalizado = filterTotal.filter(process=>(process.mesfinalizado === nomeDoMes))
          const totalFinalizados = filterTotal.filter(process=> (process.status === 'Aceita'))
          if(refFinalizados.current && refFinalizadosTotais.current && refProcessos.current && refProcessosTotais.current){
            if(filterTotal.length<1){
              refProcessos.current.innerText = '0'
              refFinalizados.current.innerText = '0'
              refProcessosTotais.current.innerText = '0'
              refFinalizadosTotais.current.innerText = '0'
              }else if(totalMensal.length<1){
              refProcessos.current.innerText = '0'
              refFinalizados.current.innerText = '0'
              }else{
              refProcessos.current.innerText = `${totalMensal.length}`
              refFinalizados.current.innerText = `${mensalFinalizado.length}`
              refProcessosTotais.current.innerText = `${filterTotal.length}`
              refFinalizadosTotais.current.innerText = `${totalFinalizados.length}`
              }
          }
        }
        insertInfos()
        renderTasks()        
    } catch (error) {
      alert('Você não se encontra logado iremos te redirecionar pra página de login.') 
      setTimeout(()=>{
      location.href = '/consultorAdm/login'
      },500)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return(
    <LayoutConsultorDashBoard>
      <title>Consultor Dashboard</title>
      <div className={style.container}>
      <h1>Processos</h1>
        <div className={style.cards}>
          <section className={style.section}>
            <h2>Mensais</h2>
            <article className={style.card}>
              <div className={style.totais}>
                <p>Totais</p>
                <span ref={refProcessos}>0</span>
              </div>
              <div className={style.finalizados}>
              <p>Finalizados</p>
              <span ref={refFinalizados}>0</span>
              </div>
            </article>
          </section>

        
          <section className={style.section}>
            <h2>Totais</h2>
            <article className={style.card}>
              <div className={style.totais}>
                <p>Totais</p>
                <span ref={refProcessosTotais}>0</span>
              </div>
              <div className={style.finalizados}>
              <p>Finalizados</p>
              <span ref={refFinalizadosTotais}>0</span>
              </div>
            </article>
          </section>
        </div>
        
        <section className={style.section}>
        <h1>Tarefas do Dia</h1>
        <div className={style.tasks} ref={tasksContainer}></div>
        <div className={style.tasksContainer}>
          <button onClick={openForm} className={style.button}>ADICIONAR TAREFA</button>
          <form onSubmit={(ev)=>createTask(ev)} className={style.form} ref={refForm}>
          <Image
          alt="closeIcon"
          width={20}
          height={20}
          src={closeSvg}
          className={style.close}
          onClick={closeForm}
          />
          <label htmlFor="name">Nome Tarefa</label>
          <input type="text" id="name" name="name" value={nameTask} onChange={(ev)=>setNameTask(ev.currentTarget.value)}/>
          <label htmlFor="summary">Resumo da tarefa</label>
          <textarea name="summary" id="summary" cols={30} rows={10} value={summaryTask} onChange={(ev)=>setSummaryTask(ev.currentTarget.value)}></textarea>
          <button>PUBLICAR</button>
          </form>
        </div>
        </section>
      </div>
     
    </LayoutConsultorDashBoard>
    
  )
}