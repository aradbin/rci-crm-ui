const API_URL = process.env.REACT_APP_API_URL
const API_URL_LOCAL = 'http://localhost:8080'

const BASE_URL = API_URL_LOCAL

const USERS_URL = `${BASE_URL}/users`
const CUSTOMERS_URL = `${BASE_URL}/customers`
const TASKS_URL = `${BASE_URL}/tasks`
const EMAIL_URL = `${BASE_URL}/email`
const EMAIL_SETTINGS_URL = `${BASE_URL}/email-settings`
const WHATSAPP_URL = `${BASE_URL}/whatsapp`
const SETTINGS_URL = `${BASE_URL}/settings`

export { USERS_URL, CUSTOMERS_URL, TASKS_URL, EMAIL_URL, EMAIL_SETTINGS_URL, WHATSAPP_URL, SETTINGS_URL }