import axios from "axios";
import { ContactProps } from "../components/Contact";

const API_URL = 'http://localhost:8085/contacts'

export async function saveContact(contact : ContactProps) {
    return await axios.post(API_URL, contact)
    
}
export async function getContacts(page = 0 , size = 10) {
    return await axios.get(API_URL+"?page="+page+"&size="+size)
    
}
export async function getContact(id : string) {
    return await axios.get(API_URL+"/"+id)
    
}
export async function updateContact(contact : ContactProps) {
    return await axios.post(API_URL, contact)
    
}
export async function updatePhoto(formData: string) {
    return await axios.put(API_URL+"/photo",formData)
    
}
export async function deleteContact(email:string) {
    return await axios.delete(API_URL+"?email="+email)
    
}
    

