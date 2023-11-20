import Script from 'next/script'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
      <header>
      <h1><Link href={'/'}>Logo</Link></h1>
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
