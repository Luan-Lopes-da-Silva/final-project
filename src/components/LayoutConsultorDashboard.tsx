'use client'
import './globals.css'
import style from '../styles/layoutConsultor.module.scss'
import Image from 'next/image'
import iconProfile from '@/public/myProfile.svg'
import iconLogout from '@/public/logoutSvg.svg'
import iconMenu from '@/public/menu-svgrepo-com.svg'
import { useRef, useState,useEffect } from 'react'
import Link from 'next/link'
import userImg from  '@/public/account_circle_FILL0_wght400_GRAD0_opsz24.svg'
import svgName from '@/public/nameSvg.svg'
import svgSince from '@/public/sinceSvg.svg'
import svgRanking from '@/public/rankingSvg.svg'
import svgFunction from '@/public/functionSvg.svg'
import getLocalStorage from '../app/functions/getLocalStorage'

export default function LayoutConsultorDashBoard({
  children,
}: {
  children: React.ReactNode
}) {
  


  const [count,setCount] = useState(2)
  const siderMenuRef = useRef<HTMLUListElement>(null)
  const refContainerMenu = useRef<HTMLDivElement>(null)
  const nameOnRef = useRef<HTMLParagraphElement>(null)
  const refLink = useRef<HTMLAnchorElement>(null)
  const refAvatar = useRef<HTMLDivElement>(null)
  const refAvatarAside = useRef<HTMLDivElement>(null)
  const refNome = useRef<HTMLParagraphElement>(null)
  const refMembro = useRef<HTMLParagraphElement>(null)
  const refRanking = useRef<HTMLParagraphElement>(null)
  const refFunction = useRef<HTMLParagraphElement>(null)
  const refSpanConsultor = useRef<HTMLParagraphElement>(null)
   
    useEffect(()=>{    
      try {
      const user = getLocalStorage()
      console.log(user)
      if(refLink.current && refSpanConsultor.current && refNome.current && refMembro.current && refRanking.current && refFunction.current && refAvatar.current && refAvatarAside.current && nameOnRef.current && user){
        refLink.current.href = `/consultorAdm/perfil/${user.id}`
        refSpanConsultor.current.innerText = `ID CONSULTOR : ${user.idconsultant}`
        
        const newDate = new Date(user.membersince)

        refNome.current.innerText = `${user.name}`
        nameOnRef.current.innerText = `${user.name}`
        refMembro.current.innerText = `${newDate.toLocaleString('pt-BR',{timeZone:'UTC'}).substring(0,10)}`
        refRanking.current.innerText = `${user.position}`
        refFunction.current.innerText = `${user.role}`
        
        if(user.avatar!='' ){
        refAvatar.current.style.backgroundImage = `url(${user.avatar})`
        refAvatar.current.style.backgroundSize = '50px 50px'
        refAvatar.current.style.backgroundPosition = 'center'
        refAvatar.current.style.objectFit = 'cover'
  
        refAvatarAside.current.style.backgroundImage = `url(${user.avatar})`
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
      <body>
      <div className={style.container}>
        <header className={style.header}>
          <nav>
            <h1><Link href={'/consultorAdm'}>LOGO</Link></h1>
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