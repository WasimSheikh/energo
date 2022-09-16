import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
//import { objectTraps } from 'immer/dist/internal';
//import {detectEnvURL, detectStrapiEnvURL} from './../../../components/utils/UserMgmtSlice';
//import { buildEmailAuthRequest } from './../../../components/utils/ModelMapper';
import { AppUser, User } from './../../../../model/User';

const localEndPoint="http://localhost:8080";
const buildEndPoint="/apis"
const apiEndPoint='http://localhost:8080'//detectEnvURL();


export const syncWM = createAsyncThunk('wealthManagement', async (req: any) => {
    console.log("syncWM",req);
    return await fetch(apiEndPoint.replace('/apis','') +'/wealthManagement/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
        body: JSON.stringify(req)
    }).then(res => {
        return res.json()
    });
})

export const createUser = createAsyncThunk('Create_user', async (user: User) => {
    
    return await fetch(apiEndPoint+'/user/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
        body: JSON.stringify(user)
    }).then(res => {
        return res.json()
    });
})

export const getVisitorApi = createAsyncThunk('getVisitorApi', async (req: any) => {
    
    return await fetch(apiEndPoint+'/user/get/visitor', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        
        },
        body: JSON.stringify(req)
    }).then(res => {
        return res.json()
    });
})

export const getContactInfo = createAsyncThunk('getContactInfo', async (req: any) => {
    
    return await fetch(apiEndPoint+'/user/validateContact', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        
        },
        body: JSON.stringify(req)
    }).then(res => {
        return res.json()
    });
})

export const createDoc = createAsyncThunk('createDoc', async (req: any) => {
      
    return await fetch(apiEndPoint+'/user/create-document', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        
        },
        body: JSON.stringify(req)
    }).then(res => {
        return res.json()
    });
})


export const sendOtp = createAsyncThunk('send_otp', async (phoneNum: String) => {
    const reqData = {
        "phoneNumber": "1" + phoneNum
    }
    return await fetch(apiEndPoint+'/user/sendOtp', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis',
        
        },
        body: JSON.stringify(reqData)
    }).then(res => {
        return res.json()
    });;
})

export const createAccount = createAsyncThunk('create_account', async (user: User) => {
  const reqObject={userName:user.email,password:user.password};
  console.log(reqObject);
    return await fetch(apiEndPoint+'/user/createAccount', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        
        },
        body: JSON.stringify(reqObject)
    }).then(res => {
        return res.json()
    });;
})


const INIT_STATE: AppUser = {
    currUser: {
        companyName: '',
        companyId: '',
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        phone: '',
        isGlobal:false,
        permission:'',
        address: {
            full_address: '',
            address1: '',
            address2: '',
            country: '',
            city: '',
            zip: '',
        }
    }
}

export const UserMgmtSlice = createSlice({
    name: 'UserMgmtSlice',
    initialState: INIT_STATE,
    reducers: {
        setAppUser(state, action: PayloadAction<User>) {
            // console.log(state.currUser)
            return {
                ...state,
                currUser: Object.assign(action.payload)
            }
        },
        resetAppUser(state) {
            Object.assign(state,INIT_STATE)
        },
       

        setUserProp(state, action: PayloadAction<any>) {
            const tmpUser = state.currUser;
            return {
                ...state,
                currUser: Object.assign({
                    ...tmpUser,
                    [action.payload.id]: action.payload.value
                })
            }
        },

        setUserTC(state, action: PayloadAction<any>) {
            const tmpUser = state.currUser;
            ///console.log('payload',action.payload)
            return {
                ...state,
                currUser: Object.assign({
                    ...tmpUser,
                    [action.payload.text]: {
                        "version": action.payload.value.version,
                        "text": action.payload.value.text_content
                    }
                })
            }
        },
        setUserAddress(state, action: PayloadAction<any>) {
            // console.log(state.currUser);
            const tmpUser = state.currUser;
            return {
                ...state,
                currUser: Object.assign({
                    ...tmpUser,
                    address: Object.assign(action.payload)
                })
            }
        },
        setUserDeepProp(state, action: PayloadAction<any>) {
            const tmpUser = state.currUser;
            const deepProp = action.payload.parent;
            return {
                ...state,
                currUser: Object.assign({
                    ...tmpUser,
                    [action.payload.parentName]: Object.assign({
                        ...deepProp,
                        [action.payload.id]: action.payload.value
                    })
                })
            }
        }
    },
    extraReducers: (builder) => {

        builder.addCase(createUser.fulfilled, (state, response) => {
            if(response.payload.status !== "FAILED" && response.payload.msg && state.currUser){
                //state.currUser.customerId=response.payload.msg;
            }
            console.log('createUser success' + response.payload)
        })
        builder.addCase(createUser.rejected, (state, response) => {
            console.log('createUser failed' + response)
        })
        
        builder.addCase(getVisitorApi.fulfilled, (state, response) => {

            if(response && response.payload && response.payload.status !== "FAILED" && response.payload.status!==500){
                state.currUser=Object.assign(response.payload);
                console.log('Current user'+state.currUser)
                //state.currUser=Object.assign(response.payload.data);
            }
        })

        

    }
})