export interface AppUser {
    currUser?: User;
}

export interface Role {
    id?: string;
    name?: string;
    guard_name?:string;
    permissions_id?:string[];
    
}

export interface Permission {
    id?:string;
    title?: string;
    url?: string;
    parent?: string;
    guard_name?:string;
}

export interface User {
    id?: string;
    companyName?: string;
    companyId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?:string;
    phone?: string;
    isGlobal?:boolean;
    permission?:string;
    address?: string;
    street?: string;
    country?:string;
    city?:string;
    zip?: string;
     
}

export interface Company {
    id?: string;
    title?: string;
    webiste?:string;
    email?: string;
    phone?: string;
    IsHeadquater?:boolean;
    address?: string;
    logo?:string;  
    street?: string;
    country?:string;
    city?:string;
    zip?: string;
}

export interface ShareDocument {
    name?: string;
    email?:string;
    reason?: string;
    documentId?:string[];
}







