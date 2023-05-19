import { current } from "@reduxjs/toolkit";

//Error Messages
const MESSAGES ={
    USERS: {
        fullName:{
            error_empty: "Please enter your full name",
            error_special_char:"Please enter a valid full name"
        },
        city: {
            error_empty: "Please enter a valid city",
        },
        state: {
            error_empty: "Please enter a valid state",
        },
        address1: {
            error_empty: "Fair does not accept P.O. Boxes and special characters",
        },
        pinCode: {
            error_empty: "Please enter a valid ZIP code",
        },
        address: {
            error_empty: "Fair cannot accept PO boxes as an address. Please enter a different address and continue",
        },
        contactinfo: {
            error_email_empty: "Please enter a valid email address. For example, yourname@gmail.com",
            error_email_exists: "An account with this email address already exists",
            error_mobile_empty: "Please enter a valid mobile number. For example, 111-222-3333",
            error_mobile_exists: "An account with this mobile number already exists"
        } 
    },
    PAYMENT:{
        cardName:{
            error_empty: "Please enter a cardholder name",
            error_special_char:"Please enter a valid cardholder name"
        },
        cardNumber: {
            error_empty: "Please enter a card number",
            error_special_char: "Please enter a valid card number" 
        },
        expiryDate: {
            error_empty: "Expiration date required",
            error_special_char: "Date is past" 
        },
        cvv: {
            error_empty: "CVV required",
        },
        address: {
            error_empty: "No address found",
        },
        paymentFailed:{
             error_failed: "We couldn’t verify your card, please review your payment information",
        }
    }
}
export const HTTPS_STATUS ={
    SUCCESS:"SUCCESS",
    FAILED: "FAILED",
    TIMEOUT:"TIMEOUT"
}
export default MESSAGES;