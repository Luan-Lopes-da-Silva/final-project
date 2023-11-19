import { NextApiRequest, NextApiResponse } from 'next'
import operacoes from '../../db.json'

export default function handler(req:NextApiRequest,res:NextApiResponse){
return(
  <h1>{operacoes.operations[0].financiamento}</h1>
)
}