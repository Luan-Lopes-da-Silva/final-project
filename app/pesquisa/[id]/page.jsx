import style from './page.module.scss'

async function getPost(params){
const res = await fetch(`http://localhost:3000/operations/${params.id}`)
const post = await res.json()
return post
}



 
export default async function Post({params}) {
const post = await getPost(params)
const styles = {
  backgroundColor : 'green'
}



  return (
    <div className={style.container}>
    <title>Checagem de processo</title>
    <main className={style.main}>
      <div className={style.section}>
      <h1>Dados do proponente</h1>
      <p>Idade: </p>
      <p>Telefone:</p>
      <p>Email:</p>
      </div>
      <div className={style.section}>
      <h1>Dados do financiamento</h1>
      <p>Entrada:</p>
      <p>Valor financiado: R$ {post.financiamento},00</p>
      <p>Numero de parcelas: {post.parcelas.length}</p>
      <p>Data de inicio de financiamento: </p>
      <p>Data de termino de financiamento: </p>
      <p>Valor de cada parcela: </p>
      <p>Modalidade de financiamento</p>
      </div>

      <div className={style.section}>
      <h1>Status do financiamento</h1>
      {post.status === 'Vistoria de imovel'?(
        <div className={style.progress}>
      <div className={style.progressContainer}>
            <div className={style.circleGreen}></div>
            <p>recolhimento de documentos</p>
          </div>
            
          <div className={style.progressContainer}>
            <div className={style.circleGreen}></div>
            <p>analise bancaria</p>
          </div>

          <div className={style.progressContainer}>
            <div className={style.circle}></div>
            <p>vistoria de imovel</p>
          </div>
          <div className={style.progressContainer}>
            <div className={style.circle}></div>
            <p>emissão do contrato</p>
          </div>
      </div>
      ):(
      <div className={style.progress}>
      <div className={style.progressContainer}>
            <div className={style.circleGreen}></div>
            <p>recolhimento de documentos</p>
          </div>
            
          <div className={style.progressContainer}>
            <div className={style.circle}></div>
            <p>analise bancaria</p>
          </div>

          <div className={style.progressContainer}>
            <div className={style.circle}></div>
            <p>vistoria de imovel</p>
          </div>
          <div className={style.progressContainer}>
            <div className={style.circle}></div>
            <p>emissão do contrato</p>
          </div>
      </div>
      )}
      
      </div>
    </main>
    </div>
  )
}