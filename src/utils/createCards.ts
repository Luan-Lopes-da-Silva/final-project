import { deleteConsultant, getConsultants } from "../functions/getConsultanst"
import { getAdms } from "./getAdms"
import avatarSvgDefault from '@/public/account_circle_FILL0_wght400_GRAD0_opsz24.svg'
import svgTotalProcess from '@/public/totalProcess.svg'
import svgFinishedProcess from '@/public/finishProcess.svg'

export async function createCardConsultant(nameConsultant:string,avatarConsultant:string,firstText:string,secondText:string,url:string,id:string='',emailConsultor:string = '',idExclude:string = 'valor padrao'){
const consultantArray = await getConsultants()
const admsArray = await getAdms()
const filterId = consultantArray.filter(consultant=>(consultant.idconsultant === id))
const filter = filterId.filter(consultant=>(consultant.id))
const article = document.createElement('article')
const nameConsultantP = document.createElement('p')
nameConsultantP.innerText = `${nameConsultant}`


const avatarImg = document.createElement('img')
avatarImg.width = 90
avatarImg.height = 90
avatarImg.alt = 'Avatar consultor'

if(avatarConsultant ===''){
  avatarImg.src = avatarSvgDefault.src
}else{
  avatarImg.src = avatarConsultant
}


const divTotalProcess = document.createElement('div')
const imgTotalProcess = document.createElement('img')
const pTotalProcess = document.createElement('p')
pTotalProcess.innerText =`+ ${firstText} processos totais`
imgTotalProcess.width = 16
imgTotalProcess.height = 16
imgTotalProcess.src = svgTotalProcess.src
divTotalProcess.append(imgTotalProcess,pTotalProcess)

const divFinishedProcess = document.createElement('div')
const imgFinishProcess = document.createElement('img')
const pFinishedProcess = document.createElement('p')
pFinishedProcess.innerText =`+ ${secondText} processos finalizados`
imgFinishProcess.width = 16
imgFinishProcess.height = 16
imgFinishProcess.src = svgFinishedProcess.src
divFinishedProcess.append(imgFinishProcess,pFinishedProcess)

const btn = document.createElement('button')


if(filter.length>0){
  if(url === 'http://localhost:3001/mainAdm'){
    btn.innerHTML = `<a href="mainAdm/consultor/${filter[0].id}">VER PERFIL</a>`
}else{
    btn.innerText = `DELETAR CONSULTOR`
    btn.addEventListener('click',async()=>{
      await deleteConsultant(idExclude)
    })
}
}else{
    const filterIdAdm = admsArray.filter(adm=>(adm.email === emailConsultor))
    btn.innerHTML = `<a href="mainAdm/adm/${filterIdAdm[0].id}">VER PERFIL</a>`
}

article.append(nameConsultant,avatarImg,divTotalProcess,divFinishedProcess,btn)
return article
}