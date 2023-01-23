import { isValidElement, useEffect, useState } from "react";


export const ifEmpty= (val: string): boolean => {
    return (val !== undefined && val.length > 0);// return true;
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


export const usernameValidation=(val:string):boolean=>{
     const lowercaseAndNumberOnly = /^[a-z0-9]+$/g;
    return val!==""&& val.length>=6 && val.length<=25 && lowercaseAndNumberOnly.test(val);
}

export default function capitalizeFirstLetter(val:string) {
    return val.charAt(0).toUpperCase() + val.slice(1);
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

