import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const shareDocuments = createAsyncThunk('share_Documents', async (user: User) => {
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

export const login = createAsyncThunk('login', async (user: User) => {
    // User Login info
    const database = [
        {
        username: "shoaib.shaikh@lemosys.com",
        password: "123456"
        } 
    ];
    const userData = database.find((credentials) => credentials.username === user.email);
    let result = {  };
    if (userData) {
        if(userData.password !== user.password) {
            return result = { status: false, message: 'user password is mistmachh.' };
        }else{
            return result = { status: true, message: '' };
        }
    }else{
        return result = { status: false, message: 'user not found' };
    }
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
        { id: 1, companyName: 'Snow 1', firstName: 'Jon1', lastName: 'test1', email: 'Jon1@gmail.com',  phone: '1111111111'},
        { id: 2, companyName: 'Snow 2', firstName: 'Jon2', lastName: 'test2', email: 'Jon2@gmail.com',  phone: '2222222222'},
        { id: 3, companyName: 'Snow 3', firstName: 'Jon3', lastName: 'test3', email: 'Jon3@gmail.com',  phone: '3333333333'},
        { id: 4, companyName: 'Snow 4', firstName: 'Jon4', lastName: 'test4', email: 'Jon4@gmail.com',  phone: '4444444444'},
        { id: 5, companyName: 'Snow 5', firstName: 'Jon5', lastName: 'test5', email: 'Jon5@gmail.com',  phone: '5555555555'},
        { id: 6, companyName: 'Snow 6', firstName: 'Jon6', lastName: 'test6', email: 'Jon6@gmail.com',  phone: '6666666666'},
        { id: 7, companyName: 'Snow 7', firstName: 'Jon7', lastName: 'test7', email: 'Jon7@gmail.com',  phone: '7777777777'},
        { id: 8, companyName: 'Snow 8', firstName: 'Jon8', lastName: 'test8', email: 'Jon8@gmail.com',  phone: '8888888888'},
        { id: 9, companyName: 'Snow 9', firstName: 'Jon9', lastName: 'test9', email: 'Jon9@gmail.com',  phone: '9999999999'},
      ]    
    return rows;
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

export const getCompanies = createAsyncThunk('get_Companies', async () => {
    const rows = [
        { id: 1, companyName: 'Snow 1', email: 'Jon1@gmail.com',  phone: '1111111111', website: 'test1.com'},
        { id: 2, companyName: 'Snow 2', email: 'Jon2@gmail.com',  phone: '2222222222', website: 'test2.com'},
        { id: 3, companyName: 'Snow 3', email: 'Jon3@gmail.com',  phone: '3333333333', website: 'test3.com'},
        { id: 4, companyName: 'Snow 4', email: 'Jon4@gmail.com',  phone: '4444444444', website: 'test4.com'},
        { id: 5, companyName: 'Snow 5', email: 'Jon5@gmail.com',  phone: '5555555555', website: 'test5.com'},
        { id: 6, companyName: 'Snow 6', email: 'Jon6@gmail.com',  phone: '6666666666', website: 'test6.com'},
        { id: 7, companyName: 'Snow 7', email: 'Jon7@gmail.com',  phone: '7777777777', website: 'test7.com'},
        { id: 8, companyName: 'Snow 8', email: 'Jon8@gmail.com',  phone: '8888888888', website: 'test8.com'},
        { id: 9, companyName: 'Snow 9', email: 'Jon9@gmail.com',  phone: '9999999999', website: 'test9.com'},
    ];  
    return rows;
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

export const getCompany = createAsyncThunk('get_Company', async () => {
    const rows = { id: 1, companyName: 'Snow 1', email: 'Jon1@gmail.com',  phone: '1111111111', website: 'test1.com',address1:'anoop nagar' ,address2 :'apartment ',logo:"",isHeadauator:'Yes',city:'indore',country:'usa', postalCode:'452201'}; 
    return rows;
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

export const getUser = createAsyncThunk('get_User', async () => {
    const rows = { id: 1, companyName: 'Snow 1', email: 'Jon1@gmail.com',  phone: '1111111111', website: 'test1.com',address1:'anoop nagar' ,address2 :'apartment ',logo:"",globalUser:'Yes',city:'indore',country:'usa', postalCode:'452201',firstName:'testing',lastName:'last',password:'*********',permission:'Admin'}; 
    return rows;
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