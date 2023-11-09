import moment from "moment"
import { isNotEmpty } from "../../_metronic/helpers"

const stringifyRequestQuery = (values: any) => {
    const filter = values
      ? Object.entries(values as Object)
          .filter((obj) => isNotEmpty(obj[1]))
          .map((obj) => {
            return `${obj[0]}=${obj[1]}`
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
  if(value==='todo'){
    return <span className="badge badge-secondary">To Do</span>
  }
  if(value==='inprogress'){
    return <span className="badge badge-info">In Progress</span>
  }
  if(value==='done'){
    return <span className="badge badge-success">Done</span>
  }
  return ''
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

export { stringifyRequestQuery, formatDate, formatDateTime, firstLetterUpperCase, getTaskPriorityBadge, getTaskStatusBadge, getSettingsFromUserSettings }