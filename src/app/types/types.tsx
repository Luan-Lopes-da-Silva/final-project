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
    idconsultant: string
    name: string
    phone: string
    role: string
    membersince: string
    responsibleAdm:string
    position: number
}

export type Adm = {
    name: string
    email: string
    password: string
    idadm: string
    role: string
}

export type ConsultantDB = {
id: string
email: string
idconsultant: string
idresponsibleadm: string
membersince : string
name : string
password : string
phone : string
role : string
avatar: string
}

