'use client'
import LayoutDefault from '@/src/components/LayoutDefault'
import style from '../../../styles/pesquisa.module.scss'
import {useEffect,useRef} from 'react'


export default function Post({params}) {

  const firstCircleRef = useRef()
  const secondCircleRef = useRef()
  const thirdCircleRef = useRef()
  const forthCircleRef = useRef()
  const idadeRef = useRef()
  const nomeRef = useRef()
  const telefoneRef = useRef()
  const emailRef = useRef()
  const entradaRef = useRef()
  const financiadoRef = useRef()
  const parcelasRef = useRef()
  const parcelaRef = useRef()
  const modalidadeRef = useRef()
  const statusRef = useRef()
  const h1Ref = useRef()

    useEffect(() => {
    const fetchData = async (params) => {
      try {
        const resposta = await fetch(`http://localhost:3000/indicacoes/${params.id}`);
        if (!resposta.ok) {
          throw new Error('Não foi possível obter os dados da API');
        }
        let dadosJson = await resposta.json();
        console.log(dadosJson.amortizacao)
       
        
        if(dadosJson.status === 'Emissao de Contrato'){
          firstCircleRef.current.style.backgroundColor = 'green'
          secondCircleRef.current.style.backgroundColor = 'green'
          thirdCircleRef.current.style.backgroundColor = 'green'
          forthCircleRef.current.style.backgroundColor = 'yellow'
        }else if(dadosJson.status === 'Vistoria de imovel'){
          firstCircleRef.current.style.backgroundColor = 'green'
          secondCircleRef.current.style.backgroundColor = 'green'
          thirdCircleRef.current.style.backgroundColor = 'yellow'   
        }else if(dadosJson.status === 'Analise bancaria'){
          firstCircleRef.current.style.backgroundColor = 'green'
          secondCircleRef.current.style.backgroundColor = 'yellow'
        }else if(dadosJson.status === 'Recolhimento de documentos'){
          firstCircleRef.current.style.backgroundColor = 'yellow'
        }else{
          statusRef.current.style.display = 'none'
          h1Ref.current.innerText = 'Seu processo ainda esta sendo avaliado e em processo de aceite por um de nossos consultores !'
        }

        nomeRef.current.innerText = dadosJson.nome 
        idadeRef.current.innerText = `Idade: ${dadosJson.idade} anos` 
        telefoneRef.current.innerText = `Telefone: ${dadosJson.telefone}`
        emailRef.current.innerText = `Email: ${dadosJson.email}`
        entradaRef.current.innerText = `Entrada: R$ ${dadosJson.entrada},00`
        financiadoRef.current.innerText = `Valor Financiado: R$ ${dadosJson.financiamento}`
        parcelasRef.current.innerText = `Numero de parcelas: ${dadosJson.parcelas.length} `
        parcelaRef.current.innerText = `Valor de cada parcela: R$ ${dadosJson.parcelas[0].toFixed(2)}`
        modalidadeRef.current.innerText = `Modalidade de financiamento: ${dadosJson.amortizacao}`
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
      <h2 ref={nomeRef}></h2>
      <p ref={idadeRef}></p>
      <p ref={telefoneRef}></p>
      <p ref={emailRef}></p>
      </div>
      <div className={style.section}>
      <h1>Dados do financiamento</h1>
      <p ref={entradaRef}></p>
      <p ref={financiadoRef}></p>
      <p ref={parcelasRef}></p>
      <p>Data de inicio de financiamento: </p>
      <p>Data de termino de financiamento: </p>
      <p ref={parcelaRef}> </p>
      <p ref={modalidadeRef}></p>
      </div>

      <div className={style.section}>
      <h1 ref={h1Ref}>Status do financiamento</h1>
      <div className={style.progress} ref={statusRef}>
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