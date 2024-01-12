'use client'
import './globals.css'
import style from '@/src/styles/layoutConsultor.module.scss'
import Image from 'next/image'
import iconProfile from '@/public/myProfile.svg'
import iconLogout from '@/public/logoutSvg.svg'
import iconMenu from '@/public/menu-svgrepo-com.svg'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import userImg from  '@/public/account_circle_FILL0_wght400_GRAD0_opsz24.svg'
import svgName from '@/public/nameSvg.svg'
import svgSince from '@/public/sinceSvg.svg'
import svgRanking from '@/public/rankingSvg.svg'
import svgFunction from '@/public/functionSvg.svg'

export default function LayoutAdminDashboard({
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
  const refFunction = useRef<HTMLParagraphElement>(null)
  const refRanking = useRef<HTMLParagraphElement>(null)
  const refAvatarAside = useRef<HTMLParagraphElement>(null)
  const refNome = useRef<HTMLParagraphElement>(null)
  const refMembro = useRef<HTMLParagraphElement>(null)


  type User = {
    name: string
    email: string
    phone: string
    idadm: string
    id: number
    membersince: string
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
    if(refLink.current && refSpanConsultor.current && refNome.current && nameOnRef.current && refRanking.current && refMembro.current && refFunction.current && refAvatar.current && refAvatarAside.current){

    
      const newDate = new Date(userLocal[0].membersince)

      refLink.current.href = `/mainAdm/perfil/${userLocal[0].id}`
      refSpanConsultor.current.innerText = `ID ADM : ${userLocal[0].idadm}`
      refNome.current.innerText = userLocal[0].name
      nameOnRef.current.innerText = userLocal[0].name
      refRanking.current.innerText = 'indefinido'
      refMembro.current.innerText = `${newDate.toLocaleString('pt-BR',{timeZone: 'UTC'}).substring(0,10)}`
      refFunction.current.innerText = userLocal[0].role

      if(userLocal[0].avatar!='' ){
        refAvatar.current.style.backgroundImage = `url(${userLocal[0].avatar})`
        refAvatar.current.style.backgroundSize = '50px 50px'
        refAvatar.current.style.backgroundPosition = 'center'
        refAvatar.current.style.objectFit = 'cover'
  
        refAvatarAside.current.style.backgroundImage = `url(${userLocal[0].avatar})`
        refAvatarAside.current.style.backgroundSize = '200px 200px'
        refAvatarAside.current.style.backgroundPosition = 'center'
        refAvatarAside.current.style.backgroundRepeat = 'no-repeat'
        refAvatarAside.current.style.objectFit = 'cover'
        }else{
        refAvatar.current.style.backgroundImage = `url(${userImg.src})`
        refAvatar.current.style.backgroundSize = '50px 50px'
        refAvatar.current.style.backgroundPosition = 'center'
        refAvatar.current.style.objectFit = 'cover'
  
        refAvatarAside.current.style.backgroundImage = `url(${userImg.src})`
        refAvatarAside.current.style.backgroundSize = '200px 200px'
        refAvatarAside.current.style.backgroundPosition = 'center'
        refAvatarAside.current.style.backgroundRepeat = 'no-repeat'
        refAvatarAside.current.style.objectFit = 'cover'
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
      <body>
      <div className={style.container}>
        <header className={style.header}>
          <nav>
            <h1><Link href={'/mainAdm'}>LOGO</Link></h1>
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
             <div className={style.content}>
              <aside>
                <div className={style.avatarAside} ref={refAvatarAside}></div>
                <article>
                <Image
                height={20}
                width={20}
                src={svgName}
                alt='icon name'
                >
                </Image>
                <p ref={refNome}></p>
                </article>
                <article>
                <Image
                height={20}
                width={20}
                src={svgSince}
                alt='icon member since'
                >
                </Image>
                  <p ref={refMembro}></p>
                </article>
                <article>
                <Image
                height={20}
                width={20}
                src={svgRanking}
                alt='icon ranking'
                >
                </Image>
                  <p ref={refRanking}></p>
                </article>
                <article>
                <Image
                height={20}
                width={20}
                src={svgFunction}
                alt='icon function'
                >
                </Image>
                  <p ref={refFunction}></p>
                </article>
              </aside>
              {children}
            </div>          
      </div>
      </body>
    </html>
  )
 
  
}