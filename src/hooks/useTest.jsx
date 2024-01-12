'use client'

import { useEffect } from "react";

export default function useTest(params){
  useEffect(()=>{
  if(params.status === 'Analise Bancaria'){
    console.log('Esta em analise')
  }
  return()=>{
    console.log('Ja foi analisado')
  }
  })
}