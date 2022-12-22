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

export interface IReLoginForm {
    eventTypeId:number
    email: string
    isCaptchaVerified: number
    eventSubTypeId:number
    evntDate:string
}

export interface IResendFormStatusProps {
    [key: string]: IFormStatus
}