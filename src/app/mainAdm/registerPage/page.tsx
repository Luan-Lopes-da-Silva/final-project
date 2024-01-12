'use client'

import LayoutRegister from "@/src/components/LayoutRegister";
import style from "@/src/styles/incluirAdm.module.scss"
import registerSvg from '@/public/registerSvg.svg'
import Image from "next/image";
import {z} from 'zod'
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import emailJs from '@emailjs/browser'


export default function RegisterPageAdm(){
  const checkEmail = async (email: string): Promise<boolean> => {
    try {
      const dbUsers = await fetch(`https://db-adm.onrender.com/adms`);
      const dbUsersConversed:UserAdm[] = await dbUsers.json();
      const userWithEmail = dbUsersConversed.find((user) => user.email === email);
      return Boolean(userWithEmail); 
    } catch (error) {
      console.error('Erro ao buscar e-mail no banco de dados:', error)
      return false;
    }
  };
  
  const createAdmFormSchema = z.object({
    name: z.string()
    .nonempty("O nome é obrigatorio")
    .min(4,"O nome deve ter no minimo 4 caracteres")
    ,
    email: z.string()
    .min(1,"O email é obrigatório")
    .email("O formato do email é inválido")
    .refine(async (email) => {
      const emailExists = await checkEmail(email);
      return !emailExists;
    },"Este e-mail já está em uso"),
    password: z.string()
    .min(4,"Senha de no minimo 4 caratecters")
    .nonempty("A senha é obrigatoria"),
    confirmPassword: z.string()
    .min(1,'A confirmação de senha é obrigatoria'),
    phone: z.string()
    .nonempty("O telefone é obrigatorio")
    .min(9, "Um telefone no Brasil tem no minimo 9 numeros")
  }).refine(({password, confirmPassword})=>password === confirmPassword,{
      message: "As senhas não batem",
      path: ["confirmPassword"]
  })

  

  type UserAdm =  createUserFormData & {
    idAdm: string
  }
  
  type createUserFormData = z.infer<typeof createAdmFormSchema>
  const { register, handleSubmit, watch, formState: { errors } } = useForm<createUserFormData>({resolver:zodResolver(createAdmFormSchema)})

  function gerarHexAleatorio(){
  const caracteresHex = '0123456789ABCDEFGHIJKLMNOPRSTUVWXYZ'
  let hexAleatorio = '#'

  for (let i = 0; i<4; i++){
    const indiceAleatorio = Math.floor(Math.random()* caracteresHex.length)
    hexAleatorio += caracteresHex.charAt(indiceAleatorio)
  }
  return hexAleatorio
  }



  const generatePassword = gerarHexAleatorio()


    async function createAdm(data:createUserFormData){
    const admDb = await fetch(`https://db-adm.onrender.com/adms`,{
          method: "POST",
          body: JSON.stringify(
            {name:data.name,email:data.email,password:data.password,phone:data.password,idAdm:generatePassword,role:'Adm',memberSince: new Date(), avatar: ''}
            ),
            headers:{
            "Content-Type": "application/json"
            }
        })  
        const templateParams = {
          to_name: data.name,
          email : data.email
        }

        emailJs.send("service_7mjjz9h","template_new2y9z",templateParams,"EwswvU46-v2AATS3K").then((res)=>{
        console.log('Email Enviado', res.status,res.text)
        })
        alert('Cadastro feito com sucesso')
    }

  
  return(
    <LayoutRegister>
      <title>Register - ADM</title>
       <div className={style.main}>
      <div className={style.firstColumn}>
      <Image
      alt="Register svg"
      width={600}
      height={600}
      src={registerSvg}
      ></Image>
      </div>
      <form className={style.form} onSubmit={handleSubmit(createAdm)}>
      
      <label htmlFor="name">Nome</label>
      {errors.name &&  <p className={style.errorSpan}>{errors.name.message}</p>}
      <input 
      type="text" 
      {...register('name')}
      id="name"
      />

      <label htmlFor="email">Email</label>
        {errors.email && (
          <p className={style.errorSpan}>{errors.email.message}</p>
        )}
      <input 
      type="text" 
      {...register('email')}
      id="email"
      />

      <label htmlFor="password">Senha</label>
      {errors.password &&  <p className={style.errorSpan}>{errors.password.message}</p>}
      <input 
      type="password" 
      id="password"
      {...register('password')}
      />

      <label htmlFor="confirmPassword">Confirmação de senha</label>
      {errors.confirmPassword &&  <p className={style.errorSpan}>{errors.confirmPassword.message}</p>}
      <input 
      type="password" 
      id="confirmPassword"
      {...register('confirmPassword')}
      />

      <label htmlFor="phone">Telefone</label>
      {errors.phone &&  <p className={style.errorSpan}>{errors.phone.message}</p>}
      <input 
      type="text" 
      id="phone"
      {...register('phone')}
      />

      <button>Cadastrar-se</button>
      </form>
  
    </div>
    </LayoutRegister>
  )
}