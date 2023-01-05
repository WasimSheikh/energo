import { isValidElement, useEffect, useState } from "react";


export const ifEmpty= (val: string): boolean => {
    return (val !== undefined && val.length > 0);// return true;
}

export const maskSSN=(val: string): string=>{
    if (val!==undefined && val!==""){
        const regex = /-/ig; //remove - dashes
        let ssnNoDash= val.replace(regex, '');
        return  ssnNoDash.replace(/\d(?=\d{4})/g, "*");
    }else{
        return "-";
    }
} 

export const removeMaskSSN=(val: string): string=>{
    if (val!==undefined && val!==""){
        let ssn=val.replaceAll('_','').replaceAll('-','');
        if(ssn!==''){
            return ssn;
        }else{
            return "";
        }
    }else{
        return "";
    }
} 

export const isEmailValid=(val: string): boolean=>{
    if (typeof val !== "undefined") {  
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,5}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(val); //if valid return true, else false.
      }
      return false;
}

export const isPhoneValid=(val: string): boolean=>{
    if (typeof val !== "undefined") {  
        //var pattern = new RegExp(/^[0-9\b]+$/);
        var pattern = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
        return pattern.test(val); //must be all number and legnt 10.
      }
      return false;
}

export const unformattedPhoneNumber = (val:string): any => {
    if (val !== null) {
      return "+1"+ (val).match(/\d/g)?.join("");
    }
    return "";
}

export const address1Validation=(val:string,fieldType:string):boolean=>{
    let isValid:boolean=true; 
    if(val!==undefined && val!==''){
        let value =val.toUpperCase();
        switch (fieldType){
           case 'address2':
                //isSpecialChar.test(val)==true
                let isSpecialChar=/[^a-zA-Z0-9 ,.]+/g
                let errorpo = /^P.O./.test(value);
                let errorpo1 = /^_PO_/.test(value); 
                //const pattern1 = new RegExp('[PO.]*\\s?B(ox)?.*\\d+', 'i');
                if(errorpo==true || errorpo1==true || (isSpecialChar.test(val))){
                    return false;
                }else{
                    return true;
                }
            
            break
            
            default:
                isValid= true;
            break;
        }
        
    }
    return isValid;
}

export const addressValidation=(val:string,fieldType:string):boolean=>{
    let isValid:boolean=false; 
    if(val!==undefined){
        switch (fieldType){
            case 'address1':
                const pattern = new RegExp('[PO.]*\\s?B(ox)?.*\\d+', 'i');
                if(val.match(pattern)){
                    return false;
                }else{
                    return true;
                }
            break;
            case 'address2':
                return false;
                const pattern1 = new RegExp('[PO.]*\\s?B(ox)?.*\\d+', 'i');
                if(val.match(pattern1)){
                    return false;
                }else{
                    return true;
                }
            break
            case 'city':
                const isSpecialChar=/[^A-Za-z ']+/g
                let name =val.split(" ");
                //if((name.length) >=1 && !isSpecialChar.test(val) && (val.trim())!==''){
                if((name.length) >=1 && (val.trim())!==''){
                    return true;
                }
            break;
            case 'state':
                const usStates=[ "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY" ];
                return usStates.includes(val.toUpperCase());
            break;
            case 'postalCode':
                const lowercaseAndNumberOnly = /^[0-9]+$/g;
                return val!=="" && lowercaseAndNumberOnly.test(val);
            break;
            default:
                isValid= true;
            break;
        }
        
    }
    return isValid;
}

export const detectEnvURL=():string=>{
    const developmentEndPoint="http://localhost:8001";
    const buildEndPoint="/apis"
    if (window.location.host.toLowerCase().includes("localhost")==true) {
        return developmentEndPoint;
    } else {
        return buildEndPoint
    }
}

export const detectLiveEnv=():boolean=>{ 
    if (window.location.host.toLowerCase().includes("signup.bankwithfair.com")==true) {
        console.log('Detected live environment',window.location.host.toLowerCase().includes("signup.bankwithfair.com"));
        return true;
    } else {
        return false
    }
}
export const getApiKeys=():string=>{

    if (window.location.host.toLowerCase().includes("signup.bankwithfair.com")==true) {
        console.log('Api Detected live environment',window.location.host.toLowerCase().includes("signup.bankwithfair.com"));
        return  '15fb3632-dd58-430b-ab04-048bcacbad43';
    } else {
        return  '414d3ae2-0e42-4f2f-8004-6b1a308c6836';
    }
}

export const usernameValidation=(val:string):boolean=>{
     const lowercaseAndNumberOnly = /^[a-z0-9]+$/g;
    return val!==""&& val.length>=6 && val.length<=25 && lowercaseAndNumberOnly.test(val);
}

export const isAllowedFormat=(val:string,type?:string):boolean=>{
    const regNotSepcialChar=/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    
    if (type==='optional') {
        if (val==="" || val===undefined){
            console.log("Undefined or blank "+ val)
            return true;
        }else{
            console.log("Special Optional = "+ regNotSepcialChar.test(val))
            return val!=="" && val.length>=2 && val.length<=25 && !regNotSepcialChar.test(val); 
        }
    } else {
        console.log("Special = "+val + ' = ' + regNotSepcialChar.test(val))
        let isSpecialFound:boolean = regNotSepcialChar.test(val)
        let notEmpty:boolean=(val!=="" && val.length>=2 && val.length<=25);
        let cond:boolean= notEmpty && (!(isSpecialFound));
        return cond;
    }
    
    
}

