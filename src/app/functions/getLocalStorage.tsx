import { Consultor } from "../types/types";

export default function getLocalStorage(){
const localUser = localStorage.getItem('Usuario Logado')
if(localUser){
  const conversedUser:Consultor = JSON.parse(localUser) 
  return conversedUser
}
}