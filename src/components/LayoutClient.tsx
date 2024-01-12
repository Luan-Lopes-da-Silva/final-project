'use client'
import Link from 'next/link'
import './globals.css'
import style from '@/src/styles/layoutClient.module.scss'
export default function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {

// Omit<User, 'name' | 'address'> pega o tipo user mais omite as propriedades name and address
// Pick<User, 'name' | 'address'> pega de dentro de user apenas name e address
// Partial<User> Torna todas as propriedades opcionais

  return (
    <html lang="pt-BR">
      <body className={style.container}>
      <header className={style.header}>
        <nav>
          
          <h1><Link href={'/'}>LOGO</Link></h1>
          <ul>
            <Link href={'/'}>INICIO</Link>
            <Link href={'/financiamentos'}>FINANCIAMENTOS</Link>
            <Link href={'/perguntas'}>COMO FUNCIONA</Link>
            <Link href={'/simulacao'}>SIMULAÇÃO</Link>
            <Link href={'/pesquisa'}>PESQUISAR</Link>
          </ul>
        </nav>
      </header>
      {children}
      <footer className={style.footer}>
        <div className={style.footerContainer}>
          <div className={style.column}>
            <h3>Empresa</h3>
            <p>Endereço : Rua das Inovações, 123</p>
            <p>Bairro Techville, CEP 98765-432</p>
            <p>Telefone : (55) 1234-5678</p>
            <p>E-mail : contato@finovatech.com</p>
          </div>
          <div className={style.column}>
            <h3>Nos Siga</h3>
            <div className={style.icons}>
             <div></div>
             <div></div>
             <div></div>
             <div></div>
            </div>
          </div>
        </div>
      </footer>
      </body>
    </html>
  )
 
  
}