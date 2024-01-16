export async function getConsultants(){
const dbConsultant = await fetch('https://consultant-db.onrender.com/consultants')
if(dbConsultant.status === 400 || dbConsultant.status === 500){
  const array:any[] = []
  return array
}else{
 const dbConversed:any[] = await dbConsultant.json()
 return dbConversed
}
}

export async function getConsultantFromId(id:string){
const dbConsultant = await fetch(`https://consultant-db.onrender.com/consultants/${id}`)
if(dbConsultant.status === 400 || dbConsultant.status === 500){
const array:any[] = []
return array
}else{
 const consultantConversed:any[] = await dbConsultant.json()
 return consultantConversed
}
}