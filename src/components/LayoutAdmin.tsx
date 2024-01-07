'use client'
import './globals.css'
import style from '@/src/styles/layoutAdmin.module.scss'
import Image from 'next/image'
import iconProfile from '@/public/myProfile.svg'
import iconLogout from '@/public/logoutSvg.svg'
import iconMenu from '@/public/menu-svgrepo-com.svg'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import userImg from  '@/public/account_circle_FILL0_wght400_GRAD0_opsz24.svg'


export default function LayoutAdmin({
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
  const refNome = useRef<HTMLParagraphElement>(null)
  const testRef = useRef<HTMLBodyElement>(null)



  type User = {
    name: string
    email: string
    phone: string
    idAdm: string
    id: number
    memberSince: string
    role: string
    avatar: string
  }
  
  function getLocalStorage(): any  {
    const dataString = localStorage.getItem('Usuario Logado')
 
    if(dataString){
      return JSON.parse(dataString)
    }else{
      throw new Error("Você não esta logado");
    }
  }

  useEffect(()=>{
    try {
    const userLocal: User[] = getLocalStorage()
    if(refSpanConsultor.current && nameOnRef.current && refAvatar.current ){
      refSpanConsultor.current.innerText = userLocal[0].idAdm
      nameOnRef.current.innerText = userLocal[0].name
      if(userLocal[0].avatar!='' ){
        refAvatar.current.style.backgroundImage = `url(${userLocal[0].avatar})`
        refAvatar.current.style.backgroundSize = '50px 50px'
        refAvatar.current.style.backgroundPosition = 'center'
        refAvatar.current.style.objectFit = 'cover'
        }else{
        refAvatar.current.style.backgroundImage = `url(${userImg.src})`
        refAvatar.current.style.backgroundSize = '50px 50px'
        refAvatar.current.style.backgroundPosition = 'center'
        refAvatar.current.style.objectFit = 'cover'
        }
    }   
    } catch (error) {
      alert('Você não se encontra logado iremos te redirecionar pra página de login.') 
      setTimeout(()=>{
      location.href = '/mainAdm/loginPage'
      },500)
    }
    },[])

  function logout(){
    localStorage.setItem('Usuario Logado', '')
    window.location.href = '/mainAdm/loginPage'
  }


  function expandMenu(){
    setCount(count+1)
    if(siderMenuRef.current && refContainerMenu.current && testRef.current){
      if(count%2===0){
      siderMenuRef.current.style.display = 'flex'
      refContainerMenu.current.style.backgroundColor = '#181B1E' 
      refContainerMenu.current.style.zIndex = '1000'
      testRef.current.style.zIndex = '1'
      }
      else{
      siderMenuRef.current.style.display = 'none'
      refContainerMenu.current.style.backgroundColor = 'transparent'
      }
    }   
  }
  


  return (
    <html lang="pt-BR">
      <body>
      <div className={style.container}>
        <header className={style.header}>
          <nav>
            <h1>LOGO</h1>
            <ul>
              <Link href={'/mainAdm'}>INICIO</Link>
              <Link href={'/mainAdm/processos'}>VER PROCESSOS</Link>
              <Link href={'/mainAdm/incluir'}>CADASTRAR CONSULTOR</Link>
              <Link href={'/mainAdm/remover'}>REMOVER CONSULTOR</Link>
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
            <ul className={style.hide} ref={siderMenuRef}>
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
                <span>Meu perfil</span>
              </div>

              <div>
                <Link href={''} ref={refLink}>
                <Image
                height={20}
                width={20}
                src={iconLogout}
                alt='icon logout'
                onClick={logout}
                >
                </Image>  
                </Link>
                <span>Logout</span>
              </div>
            </ul>
            </div>
          </nav>
        </header>
        <main className={style.main} ref={testRef}>
          {children}
        </main>
      
      </div>
                      
      
      </body>
    </html>
  )
 
  
}