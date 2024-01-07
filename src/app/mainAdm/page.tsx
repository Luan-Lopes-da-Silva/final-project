"use client"
import Image from "next/image";
import LayoutAdmin from "../../components/LayoutAdmin";
import style from '@/src/styles/homeAdm.module.scss'
import avatarSvg from '@/public/avatarPhoto.svg'
import totalProcess from '@/public/totalProcess.svg'
import finishProcess from '@/public/finishProcess.svg'
import taxSvg from '@/public/taxSvg.svg'
import houseSvg from '@/public/houseSvg.svg'
import billsSvg from '@/public/billsSvg.svg'
import itauSvg from '@/public/itauSvg.svg'
import LayoutAdminDashboard from "@/src/components/LayoutAdmDashboard";

export default function Home(){
 
  return(
    <LayoutAdminDashboard>
      <title>ADM - Home</title>
    <div className={style.container}>
    <h1>Consultores</h1>
    <div className={style.cards}>
        <div className={style.sections}>
          <section className={style.section}>
            <h2>Mensais</h2>
            <div className={style.card}>
              <p>CONSULTORES</p>
              <span>+500</span>
              <p>NO ULTIMO MES</p>
            </div>
            
          
          </section>
          <section className={style.section}>
            <h2>Totais</h2>
            <div className={style.card}>
              <p>CONSULTORES</p>
              <span>+1500</span>
              <p>DESDE <br></br>O<br></br> LANÇAMENTO</p>
            </div>
          </section>

          <section className={style.section}>
            <h2>Semanais</h2>
            <div className={style.card}>
              <p>CONSULTORES</p>
              <span>+80</span>
              <p>NA ULTIMA SEMANA</p>
            </div>
          </section>
        </div>
        </div>

        <h1>Processos</h1>

        <div className={style.cards}>
        <div className={style.sections}>
          <section className={style.section}>
            <h2>Mensais</h2>
            <div className={style.card}>
              <p>PROCESSOS</p>
              <span>+600</span>
              <p>NO ULTIMO MES</p>
            </div>
            
          
          </section>
          <section className={style.section}>
            <h2>Totais</h2>
            <div className={style.card}>
              <p>PROCESSOS</p>
              <span>+6500</span>
              <p>DESDE <br></br>O<br></br> LANÇAMENTO</p>
            </div>
          </section>

          <section className={style.section}>
            <h2>Mensais</h2>
            <div className={style.card}>
              <p>PROCESSOS</p>
              <span>+560</span>
              <p>FINALIZADOS <br></br>NO ULTIMO MÊS</p>
            </div>
          </section>

          <section className={style.section}>
            <h2>Totais</h2>
            <div className={style.card}>
              <p>PROCESSOS</p>
              <span>+6460</span>
              <p>FINALIZADOS <br></br>DESDE O <br></br>LANÇAMENTO</p>
            </div>
          </section>
        </div>
        </div>
        
        <h1>Rankings</h1>
        <div className={style.cards}>
        <div className={style.sections}>
        <h3>TOP 3 CONSULTORES MENSAIS</h3>
          <section className={style.profiles}>
            <article>
            <p>Luan Lopes da Silva</p>
            <Image
            width={90}
            height={90}
            alt="avatar consultor"
            src={avatarSvg}
            >
            </Image>
            <div>
              <Image 
              height={16}
              width={16}
              alt="total process svg"
              src={totalProcess}
              >
              </Image>
              <p>+20 processos totais</p>
            </div>
            <div>
               <Image 
              height={16}
              width={16}
              alt="finish process svg"
              src={finishProcess}
              >
              </Image>
              <p>+18 processos finalizado</p>
            </div>
            <button>VER PERFIL</button>
            </article>
            <article>
            <p>Luan Lopes da Silva</p>
            <Image
            width={90}
            height={90}
            alt="avatar consultor"
            src={avatarSvg}
            >
            </Image>
            <div>
              <Image 
              height={16}
              width={16}
              alt="total process svg"
              src={totalProcess}
              >
              </Image>
              <p>+20 processos totais</p>
            </div>
            <div>
               <Image 
              height={16}
              width={16}
              alt="finish process svg"
              src={finishProcess}
              >
              </Image>
              <p>+18 processos finalizado</p>
            </div>
            <button>VER PERFIL</button>
            </article>

            <article>
            <p>Luan Lopes da Silva</p>
            <Image
            width={90}
            height={90}
            alt="avatar consultor"
            src={avatarSvg}
            >
            </Image>
            <div>
              <Image 
              height={16}
              width={16}
              alt="total process svg"
              src={totalProcess}
              >
              </Image>
              <p>+20 processos totais</p>
            </div>
            <div>
               <Image 
              height={16}
              width={16}
              alt="finish process svg"
              src={finishProcess}
              >
              </Image>
              <p>+18 processos finalizado</p>
            </div>
            <button>VER PERFIL</button>
            </article>
          </section>
          <h3>ULTIMOS 5 PROCESSOS CADASTRADOS</h3>
          <section className={style.process}>
            <article>
              <Image
              width={90}
              height={90}
              alt="bank svg"
              src={itauSvg}
              ></Image>
              <div>
                <Image
                width={26}
                height={26}
                alt="taxs svg"
                src={taxSvg}
                ></Image>
                <p>6% JUROS/A</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="house svg"
                src={houseSvg}
                ></Image>
                <p>R$ 150,000.00</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="bills svg"
                src={billsSvg}
                ></Image>
                <p>240 parcelas</p>
              </div>
              <button>CHECAR PROCESSO</button>
            </article>
            <article>
              <Image
              width={90}
              height={90}
              alt="bank svg"
              src={itauSvg}
              ></Image>
              <div>
                <Image
                width={26}
                height={26}
                alt="taxs svg"
                src={taxSvg}
                ></Image>
                <p>6% JUROS/A</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="house svg"
                src={houseSvg}
                ></Image>
                <p>R$ 150,000.00</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="bills svg"
                src={billsSvg}
                ></Image>
                <p>240 parcelas</p>
              </div>
              <button>CHECAR PROCESSO</button>
            </article>

            <article>
              <Image
              width={90}
              height={90}
              alt="bank svg"
              src={itauSvg}
              ></Image>
              <div>
                <Image
                width={26}
                height={26}
                alt="taxs svg"
                src={taxSvg}
                ></Image>
                <p>6% JUROS/A</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="house svg"
                src={houseSvg}
                ></Image>
                <p>R$ 150,000.00</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="bills svg"
                src={billsSvg}
                ></Image>
                <p>240 parcelas</p>
              </div>
              <button>CHECAR PROCESSO</button>
            </article>
            <article>
              <Image
              width={90}
              height={90}
              alt="bank svg"
              src={itauSvg}
              ></Image>
              <div>
                <Image
                width={26}
                height={26}
                alt="taxs svg"
                src={taxSvg}
                ></Image>
                <p>6% JUROS/A</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="house svg"
                src={houseSvg}
                ></Image>
                <p>R$ 150,000.00</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="bills svg"
                src={billsSvg}
                ></Image>
                <p>240 parcelas</p>
              </div>
              <button>CHECAR PROCESSO</button>
            </article>
            <article>
              <Image
              width={90}
              height={90}
              alt="bank svg"
              src={itauSvg}
              ></Image>
              <div>
                <Image
                width={26}
                height={26}
                alt="taxs svg"
                src={taxSvg}
                ></Image>
                <p>6% JUROS/A</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="house svg"
                src={houseSvg}
                ></Image>
                <p>R$ 150,000.00</p>
              </div>
              <div>
                <Image
                width={26}
                height={26}
                alt="bills svg"
                src={billsSvg}
                ></Image>
                <p>240 parcelas</p>
              </div>
              <button>CHECAR PROCESSO</button>
            </article>
          </section>
        </div>
        </div>
        
      </div>
  
    </LayoutAdminDashboard>
  )
}