'use client'

import Link from 'next/link'
import './globals.css'
import style from '@/src/styles/layoutConsultor.module.scss'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import iconProfile from '@/public/myProfile.svg'
import iconLogout from '@/public/logoutSvg.svg'
import iconMenu from '@/public/menu-svgrepo-com.svg'

export default function ConsultorLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  const [count,setCount] = useState(2)
  const refContainerMenu = useRef<HTMLDivElement>(null)
  const refSpanConsultor = useRef<HTMLParagraphElement>(null)
  const refAvatar = useRef<HTMLDivElement>(null)
  const nameOnRef = useRef<HTMLParagraphElement>(null)
  const siderMenuRef = useRef<HTMLUListElement>(null)
  const refLink = useRef<HTMLAnchorElement>(null)


  type User = {
    avatar: string
    email: string
    id: number
    idconsultant: string
    name: string
    telefone: string
    role: string
    memberSince: string
  }


    useEffect(()=>{
      function getLocalStorage(): User  {
        const dataString = localStorage.getItem('Usuario Logado')
        const defaultUser:User = {
          avatar: 'Undefined',
          email:  'Undefined',
          id: 12,
          idconsultant: 'Undefined',
          name: 'Undefined',
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
      
      try {
      const user = getLocalStorage()
      console.log(user)
      if(refLink.current && refSpanConsultor.current && nameOnRef.current && refAvatar.current){
        refLink.current.href = `/consultorAdm/perfil/${user.id}`
        refSpanConsultor.current.innerText = `ID CONSULTOR : ${user.idconsultant}`
        nameOnRef.current.innerText = `${user.name}`

        if(user.avatar!='' ){
          refAvatar.current.style.backgroundImage = `url(${user.avatar})`
          refAvatar.current.style.backgroundSize = '50px 50px'
          refAvatar.current.style.backgroundPosition = 'center'
          refAvatar.current.style.objectFit = 'cover'
    
          }else{
          refAvatar.current.style.backgroundImage = `url(${iconProfile.src})`
          refAvatar.current.style.backgroundSize = '50px 50px'
          refAvatar.current.style.backgroundPosition = 'center'
          refAvatar.current.style.objectFit = 'cover'
          }
      }}catch(error){
        console.log(error)
      }
  },[])

  function logout(){
    localStorage.setItem('Usuario Logado', '')
    window.location.href = '/consultorAdm/login'
  }
  
  

function expandMenu(){
  setCount(count+1)

  if(siderMenuRef.current && refContainerMenu.current){
    if(count%2===0){
    siderMenuRef.current.style.display = 'flex'
    refContainerMenu.current.style.backgroundColor = '#181B1E'  
    }
    else{
    siderMenuRef.current.style.display = 'none'
    refContainerMenu.current.style.backgroundColor = 'transparent'
    }
  }
 
    
}

  return (
    <html lang="pt-BR">
      <body >
      <div className={style.container}>
        <header className={style.header}>
          <nav>
            <h1>LOGO</h1>
            <ul>
              <Link href={'/consultorAdm'}>INICIO</Link>
              <Link href={'/consultorAdm/simulacao'}>SIMULAR</Link>
              <Link href={'/consultorAdm/processos'}>VER PROCESSOS</Link>
              <Link href={'/consultorAdm/cadastrar'}>CADASTRAR PROCESSO</Link>
            </ul>
            <div className={style.avatarContainer} ref={refContainerMenu}>
              <p ref={refSpanConsultor}></p>
             <div className={style.infosUser}>
                <div className={style.avatar} ref={refAvatar}></div>
                <p ref={nameOnRef}></p>
                <Image
                height={40}
                width={40}
                src={iconMenu}
                alt='icon menu'
                className={style.menu}
                onClick={expandMenu}
                >
                </Image>
             </div>
             <ul className={style.hide} ref={siderMenuRef} >
              <div>
                <Link href={''} ref={refLink}>
                <Image
                height={20}
                width={20}
                src={iconProfile}
                alt='icon profile'
                >
                </Image>
                </Link>
                <span>Meu Perfil</span>
              </div>
              <div>
    
                <Image
                height={20}
                width={20}
                src={iconLogout}
                alt='icon logout'
                onClick={logout}
                >
                </Image>
                <span>Logout</span>
              </div>
             </ul>
            </div>
          </nav>
        </header>         
        <main className={style.main}>{children}</main>
      </div>
       
      </body>
    </html>
  )
 
  
}