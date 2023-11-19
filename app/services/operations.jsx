export const fetchOperacoes = async () => {
  const operacoes = await fetch(`${process.env.NEXT_PUBLIC_APIURL}`).then(res => res.json())
  return operacoes
}

export const fetchOperacao = async (id) => {
  const operacao = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${id}`).then(res => res.json())
  console.log(operacao)
  return operacao
}