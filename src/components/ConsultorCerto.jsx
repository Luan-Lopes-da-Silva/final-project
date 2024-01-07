'use client'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/logo.svg'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })
import style from '../styles/homeConsultor.module.scss'
import { useEffect, useRef, useState } from 'react'
import expandSvg from '@/public/expand_more_FILL0_wght400_GRAD0_opsz24.svg'
import userImg from  '@/public/account_circle_FILL0_wght400_GRAD0_opsz24.svg'
import logoutIcon from '@/public/logout_FILL0_wght400_GRAD0_opsz24.svg'
import profileIcon from '@/public/account_circle_FILL0_wght400_GRAD0_opsz24.svg'


export default function LayoutConsultor({ children }) {
  const siderMenuRef = useRef()
  const [count, setCount] = useState(2);
  const refLink = useRef()
  const refSpanConsultor = useRef()
  const refLanguage = useRef()
  

  useEffect(()=>{
  try {
  const user = JSON.parse(localStorage.getItem('Usuario Logado')) 
  refLink.current.href = `/consultorAdm/perfil/${user.id}`
  refSpanConsultor.current.innerText = `ID CONSULTOR : ${user.idConsultor}`
  if(user.avatar!=''){
  refAvatar.current.style.backgroundImage = `url(${user.avatar})`
  refAvatar.current.style.backgroundSize = '60px 60px'
  refAvatar.current.style.backgroundPosition = 'center'
  refAvatar.current.style.objectFit = 'cover'
  }else{
  refAvatar.current.style.backgroundImage = `url(${userImg.src})`
  refAvatar.current.style.backgroundSize = '60px 60px'
  refAvatar.current.style.backgroundPosition = 'center'
  refAvatar.current.style.objectFit = 'cover'
  }
  } catch (error) {
  alert('Você não se encontra logado iremos te redirecionar pra página de login.') 
  setTimeout(()=>{
  location.href = 'consultorAdm/login'
  },500)   
  }
  },[])
  
  const refAvatar = useRef()
  const refContainerMenu = useRef()

  function logout(){
    localStorage.setItem('Usuario Logado', '')
    window.location.href = '/consultorAdm/login'
  }

  function goProfile(){
  const user = JSON.parse(localStorage.getItem('Usuario Logado'))
  window.location.href = `consultorAdm/perfil/${user.id}`
  }

  function expandMenu(){
  setCount(count+1)
  if(count%2===0){
  siderMenuRef.current.style.display = 'flex'
  siderMenuRef.current.style.flexDirection = 'column'
  siderMenuRef.current.style.position = 'absolute'
  siderMenuRef.current.style.width = '100%'
  siderMenuRef.current.style.zIndex = '600'
  siderMenuRef.current.style.top = '100%'
  siderMenuRef.current.style.color = 'black'
  siderMenuRef.current.style.textAlign = 'center'
  siderMenuRef.current.style.backgroundColor = 'white'
  siderMenuRef.current.style.marginLeft = '-20px'
  siderMenuRef.current.style.height = '70px'
  siderMenuRef.current.style.padding = '8px'
  siderMenuRef.current.style.gap = '6px'
  refContainerMenu.current.style.backgroundColor = 'white'
  }else{
  siderMenuRef.current.style.display = 'none'
  refContainerMenu.current.style.backgroundColor = 'transparent'
  }
  }
    
  return (
    <html lang= 'pt-BR'>
      <body className={style.body}>
      <header className={style.header}>
      <nav>
        <Link href={'/consultorAdm'}>
        <Image
        src={logo}
        height={70}
        width={70}
        alt='Logo'
        className={style.logo}
        />
        </Link>
        <ul>
          <li><Link href={'/consultorAdm/simulacao'}>Simular</Link></li>
          <li><Link href={'/consultorAdm/processos'}>Ver Processos</Link></li>
          <li><Link href={'/consultorAdm/cadastrar'}>Cadastrar Processo</Link></li>
          
          <div className={style.container} ref={refContainerMenu} >
            <div className={style.circleContainer}>
            <span ref={refSpanConsultor}></span>
              <div className={style.circle} ref={refAvatar}></div>
            </div>
            <Image
            alt='expand'
            src={expandSvg}
            width={40}
            height={40}
            className={style.btn}
            onClick={(ev)=>expandMenu(ev)}
            />
            <div className={style.hide} ref={siderMenuRef}>
             <div className={style.linkContainer}>
              <span>Meu perfil</span>
              <Link href={''} ref={refLink} >
                <Image
                src={profileIcon}
                height={20}
                width={20}
                alt='Logo'
                className={style.logo}
                onClick={goProfile}
                />
              </Link>
            </div>
             <div className={style.linkContainer}>
              <span>Logout</span>
              <Image
              src={logoutIcon}
              height={20}
              width={20}
              alt='logout icon'
              onClick={logout}
              />
             </div>
            </div>
          </div>
        </ul>
      </nav>
      </header>  
      {children}
      <Script src='https://cdn.lordicon.com/bhenfmcm.js'/>
      </body>
      
    </html>
  )
}
