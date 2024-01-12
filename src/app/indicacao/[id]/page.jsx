'use client'
import LayoutDefault from '@/src/components/LayoutDefault'
import style from '../../../styles/protocolo.module.scss'
import {useEffect,useRef} from 'react'


export default function Post({params}) {

  const firstCircleRef = useRef()
  const secondCircleRef = useRef()
  const thirdCircleRef = useRef()
  const forthCircleRef = useRef()
  const bancoRef = useRef()
  const parcelasRef = useRef()
  const imovelRef = useRef()
  const h1Ref = useRef()

    useEffect(() => {
    const fetchData = async (params) => {
      try {
        const resposta = await fetch(`http://localhost:3000/indicacoes/${params.id}`);
        if (!resposta.ok) {
          throw new Error('Não foi possível obter os dados da API');
        }
        let dadosJson = await resposta.json();
        
       
        bancoRef.current.innerText = `Banco: ${dadosJson.banco}`
        imovelRef.current.innerText = `R$ ${dadosJson.imovel}`
        parcelasRef.current.innerText =`${dadosJson.parcelas} Parcelas`
        if(dadosJson.status === 'Emissao do Contrato'){
          firstCircleRef.current.style.backgroundColor = 'green'
          secondCircleRef.current.style.backgroundColor = 'green'
          thirdCircleRef.current.style.backgroundColor = 'green'
          forthCircleRef.current.style.backgroundColor = 'yellow'
        }else if(dadosJson.status === 'Vistoria de Imovel'){
          firstCircleRef.current.style.backgroundColor = 'green'
          secondCircleRef.current.style.backgroundColor = 'green'
          thirdCircleRef.current.style.backgroundColor = 'yellow'   
        }else if(dadosJson.status === 'Analise Bancaria'){
          firstCircleRef.current.style.backgroundColor = 'green'
          secondCircleRef.current.style.backgroundColor = 'yellow'
        }else if(dadosJson.status === 'Recolhimento de Documentos'){
          firstCircleRef.current.style.backgroundColor = 'yellow'
        }else{
          statusRef.current.style.display = 'none'
          h1Ref.current.innerText = 'Seu processo ainda esta sendo avaliado e em processo de aceite por um de nossos consultores !'
        }

        
        
      } catch (erro) {
        console.error('Erro ao obter dados da API:', erro);
      }
    };
    fetchData(params)
  });


  return (
    <LayoutDefault>
    <div className={style.container}>
    <title>Checagem de processo</title>
    <main className={style.main}>
      <div className={style.section}>
      <h1>Dados do proponente</h1>
      </div>
      <div className={style.section}>
      <h1>Dados do financiamento</h1>
      <p ref={bancoRef}></p>
      <p ref={imovelRef}></p>
      <p ref={parcelasRef}></p>
      <p>Data de inicio de financiamento: </p>
      <p>Data de termino de financiamento: </p>
      </div>

      <div className={style.section}>
      <h1 ref={h1Ref}>Status do financiamento</h1>
      <div className={style.progress}>
        <div className={style.progressContainer}>
          <div className={style.circle} ref={firstCircleRef}>
          </div>
          <p>Recolhimento de documentos</p>
        </div>
      

      <div className={style.progress}>
        <div className={style.progressContainer}>
          <div className={style.circle} ref={secondCircleRef}>
          </div>
          <p>Analise bancaria</p>
        </div>
      </div>

      <div className={style.progress}>
        <div className={style.progressContainer}>
          <div className={style.circle} ref={thirdCircleRef}>
          </div>
          <p>vistoria de imovel</p>
        </div>
      </div>

      <div className={style.progress}>
        <div className={style.progressContainer}>
          <div className={style.circle} ref={forthCircleRef}>
          </div>
          <p>Emissão do contrato</p>
        </div>
      </div>
      </div>
      </div>
    </main>
    </div>
    </LayoutDefault>
  )
}