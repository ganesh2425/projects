export interface IAddEmployerForm {
    qleHomePageDescription: string;
    id: number;
    name: string;
    ein:string;
    address:string;
    status:string;
    url: string
    city: string,
    state: string,
    zipCode: string,
    phoneNo: string;
    phoneType: string,
}


export interface IAddACAForm {
    acaPrimaryContactName: string;
    acaPrimaryContactEmail: string;
    acaPrimaryContactPhoneNo: string;
    acaPrimaryContactPhoneType: string;
  }

  export interface IAddUserProfile{
    firstName:string;
    middleName:string;
    lastName:string
    email:string
  }

  export interface IChangeUserProfile{
    password:string,
    confirmPassword:string
  }

  export interface IFormStatus {
    message: string
    type: string
}
   





