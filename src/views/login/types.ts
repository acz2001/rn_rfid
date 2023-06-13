export type LoginParams = {
  username: string;
  password: string;
  rememberUser?: boolean
}

export type LoginErrorMessage = {
  usernameError?: string;
  passwordError?: string
}
