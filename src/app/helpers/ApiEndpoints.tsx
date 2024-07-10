const API_URL_LOCAL = 'http://localhost:8080'
const API_URL_PROD = 'https://api.rci.rest'
const API_URL_COMMUNICATION_LOCAL = 'http://localhost:8081'

const BASE_URL = API_URL_LOCAL
const BASE_URL_COMMUNICATION = API_URL_COMMUNICATION_LOCAL

const AUTH_URL = `${BASE_URL}/auth`
const USERS_URL = `${BASE_URL}/users`
const CUSTOMERS_URL = `${BASE_URL}/customers`
const CUSTOMER_SETTINGS_URL = `${BASE_URL}/customer-settings`
const CONTACTS_URL = `${BASE_URL}/contacts`
const CUSTOMER_CONTACTS_URL = `${BASE_URL}/customer-contacts`
const TASKS_URL = `${BASE_URL}/tasks`
const EMAIL_URL = `${BASE_URL}/email`
const WHATSAPP_URL = `${BASE_URL}/whatsapp`
const PHONE_URL = `${BASE_URL}/phone`
const VOIP_URL = `${BASE_URL}/voip`
const MESSAGES_URL = `${BASE_URL}/messages`
const SETTINGS_URL = `${BASE_URL}/settings`
const WHATSAPP_CONNECT_URL = `${BASE_URL_COMMUNICATION}/whatsapp/account/connect`

export { BASE_URL, AUTH_URL, USERS_URL, CUSTOMERS_URL, CUSTOMER_SETTINGS_URL, CONTACTS_URL, CUSTOMER_CONTACTS_URL, TASKS_URL, EMAIL_URL, WHATSAPP_URL, PHONE_URL, VOIP_URL, MESSAGES_URL, SETTINGS_URL, WHATSAPP_CONNECT_URL }
