import moment from "moment"
import { isNotEmpty } from "../../_metronic/helpers"
import { statuses } from "./Variables"

export const stringifyRequestQuery = (values: any) => {
    const filter = values
      ? Object.entries(values as Object)
          .filter((obj) => isNotEmpty(obj[1]))
          .map((obj) => {
            return `${encodeURIComponent(obj[0])}=${encodeURIComponent(obj[1])}`
          })
          .join('&')
      : ''

    return filter
}

export const formatDate = (value: any, type="") => {
  if(value && moment(value).isValid()){
    if(type==='input'){
      return moment(value).format('YYYY-MM-DD')
    }
    return moment(value).format('DD/MM/YYYY')
  }
  return ""
}

export const formatTime = (value: any, type="") => {
  if(value && moment(value).isValid()){
    if(type==='input'){
      return moment(value).format('YYYY-MM-DD')
    }
    return moment(value).format('hh:mm A')
  }
  return ""
}

export const formatDateTime = (value: any, type="") => {
  if(value && moment(value).isValid()){
    if(type==='input'){
      return moment(value).format('YYYY-MM-DD')
    }
    return moment(value).format('DD/MM/YYYY hh:mm A')
  }
  return ""
}

export const firstLetterUpperCase = (string: string) => {
  string = string.toLowerCase().replaceAll('_', ' ');
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getTaskPriorityBadge = (value: number) => {
  if(value===1){
    return <span className="badge badge-light-primary">Low</span>
  }
  if(value===2){
    return <span className="badge badge-light-warning">Medium</span>
  }
  if(value===3){
    return <span className="badge badge-light-danger">High</span>
  }
  return ''
}

export const isUrl = (string: string) => {
  var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  if(!!urlPattern.test(string)){
    return true
  }

  return false
}

export const getCustomerPriorityBadge = (value: number) => {
  if(value===2){
    return 'text-info'
  }
  if(value===3){
    return 'text-warning'
  }
  return ''
}

export const getStatusBadge = (status: boolean) => {  
  return <span className={`badge badge-${status ? 'success' : 'danger'}`}>{status ? 'Active' : 'Inactive'}</span>
}

export const getTaskStatusBadge = (value: string) => {
  const status = statuses.find(item => item.value === value)
  
  return <span className={`badge badge-${status?.color}`}>{status?.label}</span>
}

export const getTaskTime = (logs: any) => {
  let milliseconds = 0
  let start = null
  logs?.forEach((item: any) => {
    if(item?.action === 'start'){
      start = item.created_at
    }else{
      if(start){
        milliseconds += moment(item?.created_at).diff(moment(start))
      }
      start = null
    }
  })
  
  if(start){
    milliseconds += moment().diff(moment(start))
  }

  return milliseconds
}

export const getTaskTimeString = (milliseconds: number) => {
  return moment.utc(moment.duration(milliseconds).as('milliseconds')).format('HH:mm:ss')
}

export const getSettingsFromUserSettings = (userSettings: any, type: string) => {
  let settings: any = []
  userSettings?.forEach((item: any) => {
    if(item?.deleted_at === null && item?.settings?.type === type){
      if(type === 'email'){
        settings.push({
          label: `${item?.settings?.name} (${item?.settings?.metadata?.username})`,
          value: item?.settings?.id,
          username: item?.settings?.metadata?.username,
          unipile_account_id: item?.settings?.metadata?.unipile_account_id
        })
      }else if(type === 'whatsapp'){
        settings.push({
          label: `${item?.settings?.name} (${item?.settings?.metadata?.number})`,
          value: item?.settings?.id,
          number: item?.settings?.metadata?.number,
          unipile_account_id: item?.settings?.metadata?.unipile_account_id
        })
      }else if(type === 'phone' || type === 'voip'){
        settings.push({
          label: `${item?.settings?.name} (${item?.settings?.metadata?.number})`,
          value: item?.settings?.id,
          number: item?.settings?.metadata?.number
        })
      }else{
        settings.push({
          label: item?.settings?.name,
          value: item?.settings?.id
        })
      }
    }
  })

  return settings
}

export const getSettingsOptions = (settings: any, type: string) => {
  let options: any = []
  options = settings?.filter((item: any) => item?.type === type)?.map((item: any) => (
    {
      label: `
        ${item?.name}
        ${type === 'email' ? `(${item.metadata.username})` : ``}
        ${(type === 'whatsapp' || type === 'phone' || type === 'voip') ? `(${item.metadata.number})` : ``}
      `,
      value: item?.id
    }))

  return options
}

export const getOptions = (data: any) => {
  const options = data?.map((item: any) => (
    { label: item?.name, value: item?.id }
  ))

  return options || []
}