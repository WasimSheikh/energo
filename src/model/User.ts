export interface AppUser {
    currUser?: User;
}

export interface Address {
    full_address?: string;
    address1?: string;
    address2?: string;
    country?:string;
    city?:string;
    zip?: string;
}

export interface User {
    companyName?: string;
    companyId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?:string;
    phone?: string;
    isGlobal?:boolean;
    address?: Address;
    permission?:string;
     
}

export interface Comapny {
    comapnyName?: string;
    webiste?:string;
    email?: string;
    phone?: string;
    IsHeadquater?:boolean;
    address?: Address;
    logo?:string;  
}

export interface ShareDocument {
    name?: string;
    email?:string;
    reason?: string;
    documentId?:string[];
}







