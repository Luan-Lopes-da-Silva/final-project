import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/logo.svg'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

export default function LayoutDefault({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
      <header>
        <Link href={'/'}>
        <Image
        src={logo}
        height={80}
        width={80}
        alt='Logo'
        />
        </Link>
      <nav>
        <ul>
          <li><Link href={'/'}>Home</Link></li>
          <li><Link href={'/'}>About us</Link></li>
          <li><Link href={'/'}>Services</Link></li>
          <li><Link href={'/pesquisa'}>Search</Link></li>
        </ul>
      </nav>
      </header>  
      {children}
      <Script src='https://cdn.lordicon.com/bhenfmcm.js'/>
      </body>
      
    </html>
  )
}
