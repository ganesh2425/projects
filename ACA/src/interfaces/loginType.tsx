export interface ILoginForm {
    mobile:  string
    email: string
    isCaptchaVerified: number
}

export interface IFormStatus {
    message: string
    type: string
}

export interface IFormStatusProps {
    [key: string]: IFormStatus
}