'use client'
import LayoutClient from '../components/LayoutClient'
import style from '@/src/styles/home.module.scss'

export default function Home() {
  return (
    <LayoutClient>
    <title>Home</title>
    <main className={style.main}>
    <section >
      <h1>Inovação Imobiliária ao Seu Alcance</h1>
      <p>Em um mundo movido por inovação, a [Nome da Sua Empresa] surge como uma força transformadora no mercado imobiliário. Nossos serviços vão além da simplificação do processo de financiamento, oferecendo uma plataforma intuitiva que conecta todos os pontos-chave dessa jornada.
      Achamos que o sucesso é mais significativo quando compartilhado. Por isso, convidamos você a fazer parte dessa revolução conosco. Já imaginou ser parte fundamental da mudança que o setor imobiliário precisa?
      </p>
      <p>Você deseja ser parte da [Nome da Sua Empresa]? Queremos parceiros comprometidos com a inovação e o progresso. Juntos, podemos construir um futuro imobiliário mais eficiente, transparente e acessível para todos. Vamos moldar o amanhã, juntos!</p>
      <button>JUNTE-SE A NÓS</button>
    </section>
    <section>
      <h1>Consultoria Imobiliária Aprimorada: <br></br>Desbrave o Mundo da Propriedade <br></br>com Nossa Plataforma Intuitiva.</h1>
      <p>Nossa fintech redefine a consultoria imobiliária, auxiliando consultores e clientes por meio de um sistema intuitivo. Oferecemos uma comunicação aprimorada, facilitando o entendimento do processo de financiamento. Acompanhe cada etapa com facilidade e confiança, transformando o caminho para a sua nova propriedade em uma experiência positiva e sem estresse.</p>
    </section>
    <section >
      <h1>Conectando Sonhos à Realidade: <br></br>Fintech Inovadora para <br></br>Financiamento Imobiliário</h1>
      <p>Na nossa fintech, acreditamos em transformar sonhos em realidade. Facilitamos o financiamento para o cliente e proporcionamos ferramentas avançadas para consultores, tornando o processo mais acessível e eficiente. Com uma comunicação transparente e um sistema totalmente integrado, estamos aqui para guiar você passo a passo em direção ao seu novo lar.</p>
    </section>
    <section>
      <h1>Sua Jornada Imobiliária <br></br>Simplificada: A Fintech que <br></br>Facilita Financiamentos</h1>
      <p>Simplificamos o caminho para a sua nova casa! Nossa fintech revoluciona o processo de financiamento, proporcionando uma comunicação mais eficaz entre cliente e consultor. Com um sistema totalmente integrado e fácil de usar, oferecemos um acompanhamento detalhado do processo. Descubra uma maneira mais fácil e eficiente de alcançar a propriedade dos seus sonhos.</p>
    </section>
    <section >
    <h1>Inovação Imobiliária: Fintech <br></br>que Une Clientes, Consultores e <br></br>Imobiliárias</h1>
    <p>Nossa fintech é a ponte que une clientes, consultores e imobiliárias. Facilitamos o financiamento para o cliente, tornando a consultoria mais eficiente. Com uma comunicação aprimorada e um sistema totalmente integrado, garantimos que cada passo do processo seja acompanhado de perto. Descubra uma nova era na jornada imobiliária, onde a inovação encontra a facilidade de uso.</p>
    </section>
    </main>
    </LayoutClient>
  )
}