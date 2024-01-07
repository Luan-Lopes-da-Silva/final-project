'use client'

import { useEffect, useRef, useState } from "react"
import style from '@/src/styles/profileConsultor.module.scss'
import Image from "next/image"
import userImg from '@/public/account_circle_FILL0_wght400_GRAD0_opsz24.svg'

export default function Perfil(){
const localStorageUser = JSON.parse(localStorage.getItem('Usuario Logado'))
const refSenha = useRef()
const refNovaSenha = useRef()
const refAvatar = useRef()
const [name,setName] = useState(localStorageUser.nome)
const [email,setEmail] = useState(localStorageUser.email)
const [telefone,setTelefone] = useState(localStorageUser.telefone)
const [senha,setSenha] = useState()
const [novaSenha,setNovaSenha] = useState()
const [confirmSenha,setConfirmSenha] = useState()
const [avatar,setAvatar] = useState(localStorageUser.avatar)

useEffect(()=>{
 const getProfile = async () =>{
 const profile = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`)
 const profileConversed = await profile.json()

 if(profileConversed.avatar!=''){
  refAvatar.current.src = profileConversed.avatar
 }else{
  refAvatar.current.src = userImg.src
 }
 }
getProfile()
})


function newPassword(ev){
if(ev.currentTarget.value!= novaSenha){
refNovaSenha.current.innerText = 'Senhas não coincidem'
refNovaSenha.current.style.color = 'red'
}else{
refNovaSenha.current.innerText = 'Senhas coincidem'
refNovaSenha.current.style.color = 'green'
}
}

async function changeInfos(ev){
ev.preventDefault()
const response = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`)
const userJson = await response.json()

if(name!= localStorageUser.nome && email!= localStorageUser.email){
const user = {
  nome: name,
  id:localStorageUser.id,
  email:email,
  idConsultor:localStorageUser.idConsultor,
  avatar:localStorageUser.avatar,
  telefone:localStorageUser.telefone
}
localStorage.setItem('Usuario Logado',JSON.stringify(user))

  const response = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`,{
    method: "PATCH",
    body: JSON.stringify(
      {
      nome: name,
      email:email
      }
    ),
    headers: {
      "Content-Type": "application/json"
    }
  })
  location.reload()
}else if(name!= localStorageUser.nome && telefone!= localStorageUser.telefone){
  const user = {
    nome: name,
    id:localStorageUser.id,
    email:localStorageUser.email,
    idConsultor:localStorageUser.idConsultor,
    avatar:localStorageUser.avatar,
    telefone: telefone
  }
  localStorage.setItem('Usuario Logado',JSON.stringify(user))
  const response = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`,{
    method: "PATCH",
    body: JSON.stringify(
      {
        nome: name,
        telefone:telefone
      }
    ),
    headers: {
      "Content-Type": "application/json"
    }
  })
  location.reload()
}
else if(name!= localStorageUser.nome && telefone!= localStorageUser.telefone && email!=localStorageUser.email){
  const user = {
    nome: name,
    id:localStorageUser.id,
    email:email,
    idConsultor:localStorageUser.idConsultor,
    avatar:localStorageUser.avatar,
    telefone: telefone
  }
  localStorage.setItem('Usuario Logado',JSON.stringify(user))
  const response = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`,{
    method: "PATCH",
    body: JSON.stringify(
      {
        nome: name,
        telefone: telefone,
        email:email
      }
    ),
    headers: {
      "Content-Type": "application/json"
    }
  })
  location.reload()
}
else if(name!= localStorageUser.nome && telefone!= localStorageUser.telefone && senha===userJson.senha && novaSenha===confirmSenha){
  const user = {
    nome: name,
    id:localStorageUser.id,
    email:localStorageUser.email,
    idConsultor:localStorageUser.idConsultor,
    avatar:localStorageUser.avatar,
    telefone: telefone
  }
  localStorage.setItem('Usuario Logado',JSON.stringify(user))
  const response = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`,{
    method: "PATCH",
    body: JSON.stringify(
      {
        nome: name,
        telefone: telefone,
        senha:novaSenha
      }
    ),
    headers: {
      "Content-Type": "application/json"
    }
  })
  location.reload()
}else if(name!= localStorageUser.nome  && senha===userJson.senha && novaSenha===confirmSenha){
  const user = {
    nome: name,
    id:localStorageUser.id,
    email:localStorageUser.email,
    idConsultor:localStorageUser.idConsultor,
    avatar:localStorageUser.avatar,
    telefone: telefone
  }
  localStorage.setItem('Usuario Logado',JSON.stringify(user))
  const response = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`,{
    method: "PATCH",
    body: JSON.stringify(
      {
        nome: name,
        senha:novaSenha
      }
    ),
    headers: {
      "Content-Type": "application/json"
    }
  })
  location.reload()
}else if(name!= localStorageUser.nome){
  const user = {
    nome: name,
    id:localStorageUser.id,
    email:localStorageUser.email,
    idConsultor:localStorageUser.idConsultor,
    avatar:localStorageUser.avatar,
    telefone:localStorageUser.telefone
  }
  localStorage.setItem('Usuario Logado',JSON.stringify(user))
  const response = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`,{
    method: "PATCH",
    body: JSON.stringify(
      {
        nome: name
      }
    ),
    headers: {
      "Content-Type": "application/json"
    }
  })
  location.reload()
}
else if(email!= localStorageUser.email && telefone!=localStorageUser.telefone &&senha===userJson.senha && novaSenha===confirmSenha){
  const user = {
    nome: localStorageUser.nome,
    id:localStorageUser.id,
    email:email,
    idConsultor:localStorageUser.idConsultor,
    avatar:localStorageUser.avatar,
    telefone:telefone
  }
  localStorage.setItem('Usuario Logado',JSON.stringify(user))
  const response = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`,{
    method: "PATCH",
    body: JSON.stringify(
      {
        telefone:telefone,
        email:email,
        senha:novaSenha
      }
    ),
    headers: {
      "Content-Type": "application/json"
    }
  })
}
else if(email!= localStorageUser.email && senha===userJson.senha && novaSenha===confirmSenha){
  const user = {
    nome: localStorageUser.nome,
    id:localStorageUser.id,
    email:email,
    idConsultor:localStorageUser.idConsultor,
    avatar:localStorageUser.avatar,
    telefone: localStorageUser.telefone
  }
  localStorage.setItem('Usuario Logado',JSON.stringify(user))
  const response = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`,{
    method: "PATCH",
    body: JSON.stringify(
      {
        email:email,
        senha:novaSenha
      }
    ),
    headers: {
      "Content-Type": "application/json"
    }
  })
  location.reload()
}else if(email!=localStorageUser.email){
  const user = {
    nome: localStorageUser.nome,
    id:localStorageUser.id,
    email:email,
    idConsultor:localStorageUser.idConsultor,
    avatar:localStorageUser.avatar,
    telefone: localStorageUser.telefone
  }
  localStorage.setItem('Usuario Logado',JSON.stringify(user))
  const response = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`,{
    method: "PATCH",
    body: JSON.stringify(
      {
        email:email
      }
    ),
    headers: {
      "Content-Type": "application/json"
    }
  })
  location.reload()
}else if(senha===userJson.senha && novaSenha===confirmSenha){
  const response = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`,{
    method: "PATCH",
    body: JSON.stringify(
      {
        senha:novaSenha
      }
    ),
    headers: {
      "Content-Type": "application/json"
    }
  })
  location.reload()
}else{
  const user = {
    nome: name,
    id:localStorageUser.id,
    email:email,
    idConsultor:localStorageUser.idConsultor,
    avatar:localStorageUser.avatar,
    telefone: telefone
  }
  localStorage.setItem('Usuario Logado',JSON.stringify(user))
  const response = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`,{
    method: "PATCH",
    body: JSON.stringify(
      {
        nome:name,
        telefone:telefone,
        email:email,
        senha:novaSenha,
      }
    ),
    headers: {
      "Content-Type": "application/json"
    }
  })
}
}

function trocarAvatar (ev){
  var reader = new FileReader();
  reader.onload = async function() {
      var dataURL = reader.result;
      const user = {
        nome: localStorageUser.nome,
        id: localStorageUser.id,
        email: localStorageUser.email,
        idConsultor: localStorageUser.idConsultor,
        avatar: dataURL,
      }
    localStorage.setItem('Usuario Logado',JSON.stringify(user))
    setAvatar(dataURL)
      const response = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`,{
        method: "PATCH",
        body: JSON.stringify(
          {
          avatar:dataURL
          }
        ),
        headers: {
          "Content-Type": "application/json"
        }
      })
  };
  reader.readAsDataURL(ev.currentTarget.files[0]);
  location.reload()
}

async function checkSenha(ev){
  const inputValue = ev.currentTarget.value
  const response = await fetch(`http://localhost:3000/consultores/${localStorageUser.id}`)
  const responseJson = await response.json()

  if(inputValue!= responseJson.senha){
  refSenha.current.innerText = 'Senha diferente da atual'
  refSenha.current.style.color = 'red'
  }else{
  refSenha.current.innerText = 'Senha correta' 
  refSenha.current.style.color = 'green'

  }

}






return(
    <div>
      <title>Editar perfil</title>
      <form className={style.form} onSubmit={(ev)=>changeInfos(ev)}>
      <div className={style.avatar}>
        <label htmlFor="avatar">Mudar Foto</label>
        <input
        type="file"
        id="avatar"
        name="avatar"
        onChange={(ev)=>trocarAvatar(ev)}
        />
        <Image
        src={''}
        width = {100}
        height = {100}
        ref={refAvatar}
        alt = 'avatar'
        />
      </div>
      <label htmlFor="">Nome</label>
       <input type="text"  value={name} onChange={(ev)=>setName(ev.currentTarget.value)}/>
        <label htmlFor="">Email</label>
       <input type="text"  value={email} onChange={(ev)=>setEmail(ev.currentTarget.value)}/>
       <label htmlFor="">Telefone</label>
       <input type="text"  value={telefone} onChange={(ev)=>setTelefone(ev.currentTarget.value)}/>
       <label htmlFor="">Senha Antiga</label>
       <span ref={refSenha}></span>
       <input type="password"
       value={senha}
       onChange={(ev)=>setSenha(ev.currentTarget.value)}
       onKeyUp={(ev)=>checkSenha(ev)}
       />
       <label htmlFor="">Nova Senha</label>
       <input type="password" value={novaSenha} onChange={(ev)=>setNovaSenha(ev.currentTarget.value)}/>
       <label htmlFor="">Confirmação de nova senha</label>
       <span ref={refNovaSenha}></span>
       <input
       type="password"
       value={confirmSenha}
       onChange={(ev)=>setConfirmSenha(ev.currentTarget.value)}
       onKeyUp={(ev)=>newPassword(ev)}
       />
      <button>Alterar</button>
      </form>
    </div>


)
}