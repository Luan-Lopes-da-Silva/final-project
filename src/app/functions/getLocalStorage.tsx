import { Adm, Consultor } from "../types/types";

export default function getLocalStorage(){
const localUser = localStorage.getItem('Usuario Logado')
if(localUser){
  const conversedUser:Consultor = JSON.parse(localUser) 
  return conversedUser
}
}

export function getAdmLocalStorage(){
  const localAdm = localStorage.getItem('Usuario Logado')
  if(localAdm){
    const conversedUser:Adm[] = JSON.parse(localAdm) 
    return conversedUser
  }
}