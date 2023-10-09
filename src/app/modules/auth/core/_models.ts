export interface AuthModel {
  accessToken: string
  refreshToken?: string
}

export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  id: number
  host: string
  username: string
  password: string
  user_id: number
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

export interface UserModel {
  id: number
  username: string
  password: string | undefined
  email: string
  name?: string
  contact?: string
  avatar?: string
  emailSettings?: UserEmailSettingsModel | undefined
  userSettings?: any
  auth?: AuthModel
}
