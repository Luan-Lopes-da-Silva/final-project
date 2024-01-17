export async function getAdms(){
  const dbAdms = await fetch("https://db-adm.onrender.com/adms")
  if(dbAdms.status === 400 || dbAdms.status ===500){
    const array:any[] = []
    return array
  }else{
    const dbConversed:any[] = await dbAdms.json()
    return dbConversed
  }
}

export async function getAdmFromId(id:string){
  const dbAdms = await fetch(`https://db-adm.onrender.com/adms/${id}`)
  if(dbAdms.status === 400 || dbAdms.status ===500){
    const array:any[] = []
    return array
  }else{
    const dbConversed:any[] = await dbAdms.json()
    return dbConversed
  }
}