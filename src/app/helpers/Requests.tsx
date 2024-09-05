import axios, {AxiosResponse} from 'axios'
import { toast } from 'react-toastify'
import { UNIPILE_API_KEY } from './ApiEndpoints'

async function getRequest(url: string, query?: string) {
  return await axios
    .get(`${url}${query ? `?${query}` : ""}`)
    .then((d: AxiosResponse<any>) => d.data)
    .catch((error) => {
      catchError(error)
    })
}

async function createRequest(url: string, values: any, options: any = {}) {
  return await axios
    .post(url, values, options)
    .catch((error) => {
      catchError(error)
    })
}

async function createRequestWithFile(url: string, values: any) {
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

async function updateRequest(url: string, values: any) {
  return await axios
    .patch(url, values)
    .catch((error) => {
      catchError(error)
    })
}

async function deleteRequest(url: string) {
  return await axios
    .delete(url)
    .catch((error) => {
      catchError(error)
    })
}

const getRequestUnipile = (url: string, query: string = "", attachment: boolean = false) => {
  return fetch(`${url}${query !== '' ? `?${query}` : ''}`, {
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

export { getRequest, createRequest, createRequestWithFile, updateRequest, deleteRequest, getRequestUnipile }
