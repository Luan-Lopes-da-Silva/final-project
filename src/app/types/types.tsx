export type Process ={
    nomeCliente: string
    emailCliente: string
    telefoneCliente:string
    valorImovel: string
    numeroParcelas : number
    primeiraParcela : string
    ultimaParcela : string
    banco: string
    amortizacao: string
    juros: string
    etapa: string
    status: string
    nomeConsultor: string
    telefoneConsultor : string
    emailConsultor:string
    idConsultor: string
    protocoloAleatorio: string
    id: number
    message: string
}

export type Consultor = {
    avatar: string
    email: string
    id: number
    idConsultor: string
    nome: string
    telefone: string
    role: string
    memberSince: string
}

