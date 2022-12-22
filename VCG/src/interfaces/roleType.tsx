export interface IAddRoleForm {
    id: number;
    name: string;
    description: string;
    privilegeSet: IPrivileges[];
    //selectedPrev:available[];
}

export interface IPrivileges {
    id: number,
    name: string;
    description: string;
}

export interface Y {
    id: number;
    role?: string;
}

export interface ITempAddRoleForm {
    name: string;
    description: string;
    privilegeSet: string [];
}

