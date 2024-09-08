import axios, {AxiosResponse} from 'axios'
import { toast } from 'react-toastify'
import { UNIPILE_API_KEY } from './ApiEndpoints'

export async function getRequest(url: string, query?: string) {
  return await axios
    .get(`${url}${query ? `?${query}` : ""}`)
    .then((d: AxiosResponse<any>) => d.data)
    .catch((error) => {
      catchError(error)
    })
}

export async function createRequest(url: string, values: any) {
  return await axios
    .post(url, values)
    .catch((error) => {
      catchError(error)
    })
}

export async function createRequestWithFile(url: string, values: any) {
  return await axios
    .post(url, values, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .catch((error) => {
      catchError(error)
    })
}

export async function updateRequest(url: string, values: any) {
  return await axios
    .patch(url, values)
    .catch((error) => {
      catchError(error)
    })
}

export async function deleteRequest(url: string) {
  return await axios
    .delete(url)
    .catch((error) => {
      catchError(error)
    })
}

export async function getRequestUnipile(url: string, query: string = "", attachment: boolean = false){
  return await fetch(`${url}${query !== '' ? `?${query}` : ''}`, {
    method: 'GET',
    headers: {accept: '*/*', 'X-API-KEY': `${UNIPILE_API_KEY}`}
  }).then(async (response: any) => {
    if(attachment){
      const data = await response.blob()
      return data
    }
    const data = await response.json()
    return data
  })
}

export async function createRequestUnipile(url: string, values: any) {
  return await axios
    .post(url, values, {
      headers: {
        accept: 'application/json',
        'content-type': 'multipart/form-data',
        'X-API-KEY': `${UNIPILE_API_KEY}`
      }
    })
    .catch((error) => {
      catchError(error)
    })
}

export async function updateRequestUnipile(url: string, values: any) {
  return await axios
    .patch(url, values, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-API-KEY': `${UNIPILE_API_KEY}`
      }
    })
    .catch((error) => {
      catchError(error)
    })
}

const catchError = (error: any) => {
  // if(error?.response?.data?.statusCode===401){
  //   toast.error(error?.response?.data?.message)
  //   window.location.replace('/auth')
  // }else if(error?.response?.data?.statusCode===409){
  //   toast.error(error?.response?.data?.message)
  // }else if(error?.response?.data?.statusCode===400){
  //   error?.response?.data?.message?.map((item: string) => {
  //     toast.error(item)
  //   })
  // }else if(error?.response?.data?.statusCode===404){
  //   toast.error(error?.response?.data?.message)
  // }else{
  //   toast.error('Something went wrong. Please try again')
  // }
  toast.error(error?.response?.data?.message)
}