type IdentityType = {
    connection?: string;
    user_id?: string;
    provider?: string;
    isSocial: boolean;
}

export type SkillType = {
    id: number;
    name: string;
    value: string;
    image:string;
}

export type User = {
    user_id?: string;
    sub?:string;
    email?: string;
    email_verified?: boolean;
    username?:string;
    phone_number?:string;
    phone_verified?:boolean;
    created_at?:string;
    updated_at?:string;
    identities?: IdentityType[];
    app_metadata?: any;
    user_metadata?:any;
    picture?: string;
    name?: string;
    nickname?: string;
    multifactor?:any[];
    last_ip?:string;
    last_login?: string;
    logins_count?: number;
    blocked?: boolean;
    given_name?:string;
    family_name?:string;
}

export type UserAddress = {
    street?: string;
    line1?: string;
    line2?: string;
    city?:string;
}

export type TechType = {
    _id?:string;
    id: Number;
    name:string;
    image:string;
}

type ProjectBlockType = {
    frontend:TechType;
    backend:TechType[];
    databases: TechType[];
}

export type Project = {
    _id:string;
    name:string;
    description?:string;
    status?:string;
    version:string;
    assignedUsers:string[];
    stackUsed: ProjectBlockType;
    createdBy:string;
    deadline:string;
    createdAt:string;
    updatedAt:string;
}