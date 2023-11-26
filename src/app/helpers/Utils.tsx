import moment from "moment"
import { isNotEmpty } from "../../_metronic/helpers"
import { statuses } from "./Variables"

const stringifyRequestQuery = (values: any) => {
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

const formatDate = (value: any, type="") => {
  if(value && moment(value).isValid()){
    if(type==='input'){
      return moment(value).format('YYYY-MM-DD')
    }
    return moment(value).format('DD-MM-YYYY')
  }
  return ""
}

const formatDateTime = (value: any, type="") => {
  if(value && moment(value).isValid()){
    if(type==='input'){
      return moment(value).format('YYYY-MM-DD')
    }
    return moment(value).format('DD-MM-YYYY HH:MM A')
  }
  return ""
}

const firstLetterUpperCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getTaskPriorityBadge = (value: number) => {
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

const getTaskStatusBadge = (value: string) => {
  const status = statuses.find(item => item.value === value)
  
  return <span className={`badge badge-${status?.color}`}>{status?.label}</span>
}

const getTaskTime = (logs: any) => {
  let milliseconds = 0
  let start = null
  logs?.map((item: any) => {
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

const getTaskTimeString = (milliseconds: number) => {
  return moment.utc(moment.duration(milliseconds).as('milliseconds')).format('HH:mm:ss')
}

const getSettingsFromUserSettings = (userSettings: any, type: string) => {
  let settings: any = { label: null, value: null }
  userSettings?.map((item: any) => {
    if(item?.deleted_at === null && item?.settings?.type === type){
      if(type === 'email'){
        settings = {
          label: `${item?.settings?.name} (${item?.settings?.metadata?.username})`,
          value: item?.settings?.id
        }
      }else if(type === 'whatsapp'){
        settings = {
          label: `${item?.settings?.name} (${item?.settings?.metadata?.phone_number})`,
          value: item?.settings?.id,
          phone_number: item?.settings?.metadata?.phone_number
        }
      }else{
        settings = {
          label: item?.settings?.name,
          value: item?.settings?.id
        }
      }
    }
  })
  return settings
}

export { stringifyRequestQuery, formatDate, formatDateTime, firstLetterUpperCase, getTaskPriorityBadge, getTaskStatusBadge, getTaskTime, getTaskTimeString, getSettingsFromUserSettings }