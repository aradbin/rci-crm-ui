const API_URL = process.env.REACT_APP_API_URL
const API_URL_LOCAL = 'http://localhost:8080'

const BASE_URL = API_URL_LOCAL

const USERS_URL = `${BASE_URL}/users`
const CUSTOMERS_URL = `${BASE_URL}/customers`
const EMAIL_URL = `${BASE_URL}/email`
const SETTINGS_URL = `${BASE_URL}/settings`

export { USERS_URL, CUSTOMERS_URL, EMAIL_URL, SETTINGS_URL }