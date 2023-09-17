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

const firstLetterUpper = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { stringifyRequestQuery, formatDate, firstLetterUpper }