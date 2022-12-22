export interface IAddUserForm {
    id: number;
    username:string;
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    status:string;
    roleSet: any[];
    //selectedPrev:available[];
}

export interface Irole{
    id: number,
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    status:string;
    roleSet:  [];
}

export interface Y {
    id: number;
    role?: string;
}

export interface ITempAddUserForm {
    name: string;
    email: string;
    roleSet:  [];
}

