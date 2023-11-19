import style from './page.module.scss'

async function getPost(params){
const res = await fetch(`https://json-server-two-zeta.vercel.app/operations/${params.id}`)
const post = await res.json()
return post
}
 
export default async function Post({params}) {
const post = await getPost(params)
  return (
    <div className={style.container}>
    <header>
      <h1>Logo</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>Services</li>
          <li>About us</li>
        </ul>
      </nav>
    </header>
    <main className={style.main}>
      <h2>Valor financiado: {post.financiamento}</h2>
      <h2>Numero de parcelas: {post.parcelas.length}</h2>
      <h2>Numero de protocolo: {post.protocoloAleatorio}</h2>
    </main>
    </div>
  )
}