export interface ILoginForm {
    username:  string
    password: string
    isCaptchaVerified: number
}

export interface IFormStatus {
    message: string
    type: string
}

export interface IFormStatusProps {
    [key: string]: IFormStatus
}

export interface ITempLoginForm {
    username: string;
    password: string;
}