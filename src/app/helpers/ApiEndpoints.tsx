const API_URL = process.env.REACT_APP_API_URL
const API_URL_LOCAL = 'http://localhost:8080'

const BASE_URL = API_URL_LOCAL

const USERS_URL = `${BASE_URL}/users`
const SETTINGS_URL = `${BASE_URL}/settings`

export { USERS_URL, SETTINGS_URL }