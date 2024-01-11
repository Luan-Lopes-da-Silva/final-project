import { useState } from "react";

export default function useProcess(){
const [client,setClient] = useState('')
const [emailClient,setEmailClient] = useState('')
const [phoneClient,setPhoneClient] = useState('')
const [bank,setBank] = useState('')
const [modality,setModality] = useState('')
const [immobile,setImmobile] = useState('')
const [installments,setInstallments] = useState('')
const [firstInstallment,setFirstInstallment] = useState('')
const [lastInstallment,setLastInstallment] = useState('')
const [idConsultant,setIdConsultant] = useState('')
const [taxs,setTaxs] = useState('')

  return{client,setClient,emailClient,setEmailClient,phoneClient,setPhoneClient,bank,setBank,modality,setModality,immobile,setImmobile,installments,setInstallments,idConsultant,setIdConsultant,firstInstallment,setFirstInstallment,lastInstallment,setLastInstallment,taxs,setTaxs}
}