'use client'
import LayoutDefault from '@/src/components/LayoutDefault'
import style from '@/src/styles/processoConsultor.module.scss'
import {useEffect,useRef, useState} from 'react'
import LayoutClient from '@/src/components/LayoutClient'

export default function Post({params}:any) {

  const refBanco = useRef<HTMLHeadingElement>(null)
  const refWithoutConsult  = useRef<HTMLHeadingElement>(null)
  const refParcelas = useRef<HTMLHeadingElement>(null)
  const refValor = useRef<HTMLHeadingElement>(null)
  const refEmail = useRef<HTMLHeadingElement>(null)
  const refNome = useRef<HTMLHeadingElement>(null)
  const refStatus = useRef<HTMLDivElement>(null)
  const refTelefone = useRef<HTMLHeadingElement>(null)
  const firstCircle = useRef<HTMLDivElement>(null)
  const secondCircle = useRef<HTMLDivElement>(null)
  const thirdCircle = useRef<HTMLDivElement>(null)
  const fourthCircle = useRef<HTMLDivElement>(null)
  const clienteNome = useRef<HTMLHeadingElement>(null)
  const clienteTelefone = useRef<HTMLHeadingElement>(null)
  const clienteEmail = useRef<HTMLHeadingElement>(null)
  const messageRef = useRef<HTMLHeadingElement>(null)
  
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resposta = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/processos/${params.id}`);
        if (!resposta.ok) {
          throw new Error('Não foi possível obter os dados da API');
        }
        const dadosJson = await resposta.json();
       
        
        if(dadosJson[0].nomeconsultor === ''){
          if(refWithoutConsult.current && refStatus.current){
            refWithoutConsult.current.innerText = 'Ainda no aguardo do aceite do pedido por um consultor' 
            refStatus.current.style.display = 'none'
          }
        }else if(refBanco.current && refValor.current && refParcelas.current && refNome.current && refEmail.current && clienteEmail.current && clienteNome.current && clienteTelefone.current && firstCircle.current && secondCircle.current && thirdCircle.current && fourthCircle.current && refTelefone.current && messageRef.current){
          refBanco.current.innerText = `Banco: ${dadosJson[0].banco}`
          refValor.current.innerText = `Valor: ${dadosJson[0].valorimovel}`
          refParcelas.current.innerText = `Parcelas: ${dadosJson[0].numeroparcelas}`
        
          refNome.current.innerText = `Nome : ${dadosJson[0].nomeconsultor}`
          refEmail.current.innerText = `Email : ${dadosJson[0].emailconsultor}`
          refTelefone.current.innerText = `Telefone : ${dadosJson[0].telefoneconsultor}`
        
          clienteNome.current.innerText = `Nome : ${dadosJson[0].nomecliente}`
          clienteEmail.current.innerText = `Email : ${dadosJson[0].emailcliente}`
          clienteTelefone.current.innerText = `Telefone : ${dadosJson[0].telefonecliente}`
        
          
        
           if(dadosJson[0].etapa === 'Recolhimento de Documentos' && dadosJson[0].status === 'Em Andamento' || dadosJson[0].status === 'Em andamento'){
            firstCircle.current.style.backgroundColor = 'Yellow'
            messageRef.current.innerText = 'Os interessados no financiamento imobiliário devem fornecer documentação pessoal, comprovantes de renda, e outros documentos necessários para a análise do banco.'
           }else if(dadosJson[0].etapa === 'Recolhimento de Documentos' && dadosJson[0].status === 'Recusada'){
            firstCircle.current.style.backgroundColor = 'Red'
            messageRef.current.innerText = dadosJson[0].message
           }else if(dadosJson[0].etapa === 'Recolhimento de Documentos' && dadosJson[0].status === 'Aceita'){
            firstCircle.current.style.backgroundColor = 'Green'
            secondCircle.current.style.backgroundColor = 'Yellow'
            messageRef.current.innerText = 'Parabéns! Recebemos seus documentos. Estamos iniciando a análise para o financiamento do seu imóvel. Em breve, entraremos em contato.'
           }else if(dadosJson[0].etapa === 'Analise Bancaria' && dadosJson[0].status === 'Em Andamento'){
            firstCircle.current.style.backgroundColor = 'Green'
            secondCircle.current.style.backgroundColor = 'Yellow'
            messageRef.current.innerText = 'O banco revisa os documentos fornecidos, avalia a capacidade financeira do solicitante e verifica a viabilidade do financiamento. Essa etapa inclui a verificação de histórico de crédito e outros critérios de elegibilidade.'
           }else if(dadosJson[0].etapa === 'Analise Bancaria' && dadosJson[0].status === 'Recusada'){
            firstCircle.current.style.backgroundColor = 'Green'
            secondCircle.current.style.backgroundColor = 'Red'
            messageRef.current.innerText = dadosJson[0].message
           }else if(dadosJson[0].etapa === 'Analise Bancaria' && dadosJson[0].status === 'Aceita'){
            firstCircle.current.style.backgroundColor = 'Green'
            secondCircle.current.style.backgroundColor = 'Green'
            messageRef.current.innerText = 'Ótima notícia! Sua análise bancária foi aprovada. Agora, avançaremos para a próxima etapa do financiamento imobiliário.'
           }else if(dadosJson[0].etapa === 'Vistoria de Imovel' && dadosJson[0].status === 'Em Andamento'){
            firstCircle.current.style.backgroundColor = 'Green'
            secondCircle.current.style.backgroundColor = 'Green'
            thirdCircle.current.style.backgroundColor = 'Yellow'
            messageRef.current.innerText = 'Uma vistoria é realizada no imóvel para avaliar suas condições físicas e determinar seu valor de mercado. Isso é crucial para o banco garantir que o imóvel ofereça a segurança necessária para o financiamento.'
           }else if(dadosJson[0].etapa === 'Vistoria de Imovel' && dadosJson[0].status === 'Recusada'){
            firstCircle.current.style.backgroundColor = 'Green'
            secondCircle.current.style.backgroundColor = 'Green'
            thirdCircle.current.style.backgroundColor = 'Red'
            messageRef.current.innerText = dadosJson[0].message
           }else if(dadosJson[0].etapa === 'Vistoria de Imovel' && dadosJson[0].status === 'Aceita'){
            firstCircle.current.style.backgroundColor = 'Green'
            secondCircle.current.style.backgroundColor = 'Green'
            thirdCircle.current.style.backgroundColor = 'Green'
            messageRef.current.innerText = 'A vistoria do seu imóvel foi concluída com sucesso! Estamos prosseguindo para as etapas finais do financiamento. Logo teremos novidades.'
           }else if(dadosJson[0].etapa === 'Emissao do Contrato' && dadosJson[0].status === 'Em Andamento'){
           fourthCircle.current.style.backgroundColor = 'Yellow'
           }else if(dadosJson[0].etapa === 'Emissao do Contrato' && dadosJson[0].status === 'Recusada'){
            firstCircle.current.style.backgroundColor = 'Green'
            secondCircle.current.style.backgroundColor = 'Green'
            thirdCircle.current.style.backgroundColor = 'Green'
            fourthCircle.current.style.backgroundColor = 'Red'
            messageRef.current.innerText = dadosJson[0].message
           }else if(dadosJson[0].etapa === 'Emissao do Contrato' && dadosJson[0].status === 'Aceita'){
            firstCircle.current.style.backgroundColor = 'Green'
            secondCircle.current.style.backgroundColor = 'Green'
            thirdCircle.current.style.backgroundColor = 'Green'
            fourthCircle.current.style.backgroundColor = 'Green'
            messageRef.current.innerText = 'Parabéns! Seu financiamento foi aprovado, e o contrato está pronto para assinatura. Em breve, você será o(a) proprietário(a) do seu novo lar.'
           }
          }
      } catch (erro) {
        console.error('Erro ao obter dados da API:', erro);
      }
    };
    fetchData()
  });


  return (
    <LayoutClient>
     <div className={style.geralContainer}>
    <title>Checagem de processo</title>
  <div className={style.section}>
    <h1>Dados do Imovel</h1>
    <h3 ref={refBanco}></h3>
    <h3 ref={refParcelas}></h3>
    <h3 ref={refValor}></h3>
  </div>
  <div className={style.section}>
    <h1>Dados do Proponente</h1>
    <h3 ref={clienteNome}></h3>
    <h3 ref={clienteEmail}></h3>
    <h3 ref={clienteTelefone}></h3>
  </div>
  <div className={style.section}>
    <h1>Dados do Consultor</h1>
    <h2 ref={refWithoutConsult}></h2>
    <h3 ref={refNome}></h3>
    <h3 ref={refEmail}></h3>
    <h3 ref={refTelefone}></h3>
  </div>
  <div className={style.section}>
    <h1>Status do Processo</h1>
    <div className={style.container} ref={refStatus}>
      <div className={style.circleContainer}>
        <div className={style.circle} ref={firstCircle}>
        </div>
        <p>Recolhimento de Documentos</p>
      </div>
      <div className={style.circleContainer}>
        <div className={style.circle} ref={secondCircle}>
        </div>
        <p>Analise Bancaria</p>
      </div>
      <div className={style.circleContainer}>
        <div className={style.circle} ref={thirdCircle}>
        </div>
        <p>Vistoria de Imovel</p>
      </div>
        <div className={style.circleContainer}>
        <div className={style.circle} ref={fourthCircle}>
        </div>
        <p>Emissão do Contrato</p>
      </div>
    </div>
  </div>

  <article className={style.step}>
    <h4>O que a etapa do meu processo significa?</h4>
    <p ref={messageRef}></p>
  </article>
  </div>
    </LayoutClient>
  )
}