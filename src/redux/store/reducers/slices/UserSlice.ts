import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
//import { objectTraps } from 'immer/dist/internal';
//import {detectEnvURL, detectStrapiEnvURL} from './../../../components/utils/UserMgmtSlice';
//import { buildEmailAuthRequest } from './../../../components/utils/ModelMapper';
import { AppUser, User } from './../../../../model/User';

const localEndPoint="http://localhost:8080";
const buildEndPoint="/apis"
const apiEndPoint='http://localhost:8080'//detectEnvURL();

export const createUser = createAsyncThunk('Create_user', async (user: User) => {
    console.log(user);
    
    // return await fetch(apiEndPoint+'/user/create', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
    //     },
    //     body: JSON.stringify(user)
    // }).then(res => {
    //     return res.json()
    // });
})

export const createCompany = createAsyncThunk('Create_company', async (comapny: User) => {
    console.log(comapny);
    
    // return await fetch(apiEndPoint+'/user/create', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
    //     },
    //     body: JSON.stringify(user)
    // }).then(res => {
    //     return res.json()
    // });
})

export const getUsers = createAsyncThunk('get_Users', async () => {
    const rows = [
        { id: 1, companyName: 'Snow 1', firstName: 'Jon1', lastName: 'test1', email: 'Jon1@gmail.com',  phone: '1111111111',  country: 'country1', action: 'Edit/View'  },
        { id: 2, companyName: 'Snow 2', firstName: 'Jon2', lastName: 'test2', email: 'Jon2@gmail.com',  phone: '2222222222',  country: 'country2', action: 'Edit/View'  },
        { id: 3, companyName: 'Snow 3', firstName: 'Jon3', lastName: 'test3', email: 'Jon3@gmail.com',  phone: '3333333333',  country: 'country3', action: 'Edit/View'  },
        { id: 4, companyName: 'Snow 4', firstName: 'Jon4', lastName: 'test4', email: 'Jon4@gmail.com',  phone: '4444444444',  country: 'country4', action: 'Edit/View'  },
        { id: 5, companyName: 'Snow 5', firstName: 'Jon5', lastName: 'test5', email: 'Jon5@gmail.com',  phone: '5555555555',  country: 'country5', action: 'Edit/View'  },
        { id: 6, companyName: 'Snow 6', firstName: 'Jon6', lastName: 'test6', email: 'Jon6@gmail.com',  phone: '6666666666',  country: 'country6', action: 'Edit/View'  },
        { id: 7, companyName: 'Snow 7', firstName: 'Jon7', lastName: 'test7', email: 'Jon7@gmail.com',  phone: '7777777777',  country: 'country7', action: 'Edit/View'  },
        { id: 8, companyName: 'Snow 8', firstName: 'Jon8', lastName: 'test8', email: 'Jon8@gmail.com',  phone: '8888888888',  country: 'country8', action: 'Edit/View'  },
        { id: 9, companyName: 'Snow 9', firstName: 'Jon9', lastName: 'test9', email: 'Jon9@gmail.com',  phone: '9999999999',  country: 'country9', action: 'Edit/View'  },
      ]    
    return JSON.stringify(rows)
    // return await fetch(apiEndPoint+'/user/create', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
    //     },
    //     body: JSON.stringify(user)
    // }).then(res => {
    //     return res.json()
    // });
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
            // if(response.payload.status !== "FAILED" && response.payload.msg && state.currUser){
            //     //state.currUser.customerId=response.payload.msg;
            // }
            console.log('createUser success' + response.payload)
        })
        builder.addCase(createUser.rejected, (state, response) => {
            console.log('createUser failed' + response)
        })

    }
})