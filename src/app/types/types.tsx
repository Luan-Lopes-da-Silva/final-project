export type ProcessBD ={
    nomecliente: string
    emailcliente: string
    telefonecliente:string
    valorimovel: string
    numeroparcelas : number
    primeiraparcela : string
    ultimaparcela : string
    banco: string
    amortizacao: string
    juros: string
    etapa: string
    status: string
    nomeconsultor: string
    telefoneconsultor : string
    emailconsultor:string
    idconsultor: string
    protocoloaleatorio: string
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
    responseAdm:string
}

export type Adm = {
    name: string
    email: string
    password: string
    idAdm: string
    role: string
}

