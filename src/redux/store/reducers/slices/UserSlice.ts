import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppUser, Permission, Role, User, Company } from './../../../../model/User';

const localEndPoint="http://localhost:8080";
const buildEndPoint="/apis"
const apiEndPoint='https://laravel.cppatidar.com/energo/backend/api'//detectEnvURL();

export const createUser = createAsyncThunk('Create_user', async (user: User) => {
    return await fetch(apiEndPoint+'/createUser', {
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

export const createRole = createAsyncThunk('Create_role', async (role: Role) => {
    return await fetch(apiEndPoint+'/createRole', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
        body: JSON.stringify(role)
    }).then(res => {
        return res.json()
    });
})

export const updateRole = createAsyncThunk('update_role', async (role: Role) => {
   return await fetch(apiEndPoint+'/updateRole', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
        body: JSON.stringify(role)
    }).then(res => {
        return res.json()
    });
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
    // const database = [
    //     {
    //     username: "shoaib.shaikh@lemosys.com",
    //     password: "123456"
    //     } 
    // ];
    // const userData = database.find((credentials) => credentials.username === user.email);
    // let result = {  };
    // if (userData) {
    //     if(userData.password !== user.password) {
    //         return result = { status: false, message: 'user password is mistmachh.' };
    //     }else{
    //         return result = { status: true, message: '' };
    //     }
    // }else{
    //     return result = { status: false, message: 'user not found' };
    // }
    return await fetch(apiEndPoint+'/auth/login', {
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

export const createCompany = createAsyncThunk('Create_company', async (company: Company) => {
    return await fetch(apiEndPoint+'/createCompany', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
        body: JSON.stringify(company)
    }).then(res => {
        return res.json()
    });
})

export const updateCompany = createAsyncThunk('Update_company', async (company: Company) => {
    return await fetch(apiEndPoint+'/updateCompany', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
        body: JSON.stringify(company)
    }).then(res => {
        return res.json()
    });
})

export const updateUser = createAsyncThunk('Update_user', async (user: User) => {
    
    return await fetch(apiEndPoint+'/updateUser', {
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

export const getRoles = createAsyncThunk('get_Roles', async () => {
    return await fetch(apiEndPoint+'/getRoles', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
    }).then(res => {
        return res.json()
    });
})

export const getUsers = createAsyncThunk('get_Users', async () => {
    return await fetch(apiEndPoint+'/getUsers', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
    }).then(res => {
        return res.json()
    });
})

export const getCompanies = createAsyncThunk('get_Companies', async () => {
    return await fetch(apiEndPoint+'/getCompanies', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
    }).then(res => {
        return res.json()
    });
})

export const getCompany = createAsyncThunk('get_Company', async (company: Company) => {
    return await fetch(apiEndPoint+'/getCompany', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
        body: JSON.stringify(company)
    }).then(res => {
        return res.json()
    });
})

export const deleteCompany = createAsyncThunk('delete_Company', async (company: Company) => {
    return await fetch(apiEndPoint+'/deleteCompany', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
        body: JSON.stringify(company)
    }).then(res => {
        return res.json()
    });
})

export const getUser = createAsyncThunk('get_User', async (user: User) => {
    return await fetch(apiEndPoint+'/getUser', {
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

export const getRole = createAsyncThunk('get_Role', async (role: Role) => {
   return await fetch(apiEndPoint+'/getRole', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
        body: JSON.stringify(role)
    }).then(res => {
        return res.json()
    });
})

export const getPermission = createAsyncThunk('get_Permission', async (permission: Permission) => {
    return await fetch(apiEndPoint+'/getPermission', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
        body: JSON.stringify(permission)
    }).then(res => {
        return res.json()
    });
})

export const getPermissions = createAsyncThunk('get_Permissions', async () => {
    return await fetch(apiEndPoint+'/getPermissions', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
    }).then(res => {
        return res.json()
    });
})

export const getPermissionParent = createAsyncThunk('get_Permissions_parent', async () => {
    return await fetch(apiEndPoint+'/getPermissionParent', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
    }).then(res => {
        return res.json()
    });
})

export const getPermissionParentChlid = createAsyncThunk('get_Permissions_parent', async () => {
    return await fetch(apiEndPoint+'/getPermissionParentChlid', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
    }).then(res => {
        return res.json()
    });
})

export const createPermission = createAsyncThunk('create_Permission', async (permission: Permission) => {
     return await fetch(apiEndPoint+'/createPermission', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
        body: JSON.stringify(permission)
    }).then(res => {
        return res.json()
    });
})

export const createRolehasPermission = createAsyncThunk('create_Role_has_Permission', async (role: Role) => {
    return await fetch(apiEndPoint+'/createRolehasPermission', {
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
       },
       body: JSON.stringify(role)
   }).then(res => {
       return res.json()
   });
})



export const updatePermission = createAsyncThunk('update_Permission', async (permission: Permission) => {
    return await fetch(apiEndPoint+'/updatePermission', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'bwf-secret':'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJCV0YtdWkiLCJpYXQiOjE2MjMxOTE0NjcsInN1YiI6IkJXRl9VSSIsImlzcyI6IkFEIiwiZXhwIjoxNjIzMTkxNDY3fQ.W-uttMeN-lJW9ltRDi6SO0elmow7qWJ5hqd52kvnFis'
        },
        body: JSON.stringify(permission)
    }).then(res => {
        return res.json()
    });
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
        permission:''
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