import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppUser, Permission, Role, User, Company ,ShareEmail, Vessel} from './../../../../model/User';

const localEndPoint="http://localhost:8080";
const buildEndPoint="/apis"
const apiEndPoint='https://laravel.cppatidar.com/energo/backend/api'//detectEnvURL();
var token = localStorage.getItem("access_token");

// export const createUser = createAsyncThunk('Create_user', async (user: User) => {
//     return await fetch(apiEndPoint+'/createUser', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//               'Authorization': `${token}`,
//         },
//         body: JSON.stringify(user)
//     }).then(res => {
//         return res.json()
//     });
// })
export const createUser = createAsyncThunk('Create_user', async (user: any) => {
    return await axios.post(apiEndPoint + '/createUser', user, {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${token}`,
        },
    }).then(res => {
        return res;
    });
})

export const createRole = createAsyncThunk('Create_role', async (role: Role) => {
    return await fetch(apiEndPoint+'/createRole', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
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
              'Authorization': `${token}`,
        },
        body: JSON.stringify(role)
    }).then(res => {
        return res.json()
    });
})

export const shareDocuments = createAsyncThunk('share_Documents', async (ShareEmail: ShareEmail) => {
    return await fetch(apiEndPoint+'/shareDocuments', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(ShareEmail)
    }).then(res => {
        return res.json()
    });
})

export const login = createAsyncThunk('login', async (user: User) => {
    return await fetch(apiEndPoint+'/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(user)
    }).then(res => {
        return res.json()
    });
})

export const createCompany = createAsyncThunk('Create_company', async (company: any) => {
    return await fetch(apiEndPoint+'/createCompany', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(company)
    }).then(res => {
        return res.json()
    });
})

// export const updateCompany = createAsyncThunk('Update_company', async (company: Company) => {
//     return await fetch(apiEndPoint+'/updateCompany', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//               'Authorization': `${token}`,
//         },
//         body: JSON.stringify(company)
//     }).then(res => {
//         return res.json()
//     });
// })
export const updateCompany = createAsyncThunk('Update_company', async (company: any) => {
    return await axios.post(apiEndPoint + '/updateCompany', company, {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${token}`,
        },
    }).then(res => {
        return res;
    });
})
export const createVessel11 = createAsyncThunk('Create_vessel', async (Vessel: Vessel) => {
    return await fetch(apiEndPoint+'/createVessel', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        body: JSON.stringify(Vessel)
    }).then(res => {
        return res.json()
    });
})

export const createVessel = createAsyncThunk('Create_vessel', async (Vessel: any) => {
    return await axios.post(apiEndPoint + '/createVessel', Vessel, {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${token}`,
        },
    }).then(res => {
        return res;
    });
})
export const updateVessel = createAsyncThunk('Update_vessel', async (Vessel: any) => {
    return await axios.post(apiEndPoint + '/updateVessel', Vessel, {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${token}`,
        },
    }).then(res => {
        return res;
    });
})

export const updateUser = createAsyncThunk('Update_user', async (user: User) => {
    
    return await fetch(apiEndPoint+'/updateUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(user)
    }).then(res => {
        return res.json()
    });
})

export const updateUserProfile = createAsyncThunk('Update_user', async (user: User) => {
    
    return await fetch(apiEndPoint+'/updateUserProfile', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
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
              'Authorization': `${token}`,
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
              'Authorization': `${token}`,
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
              'Authorization': `${token}`,
        },
    }).then(res => {
        return res.json()
    });
})

export const getVessels = createAsyncThunk('get_Vessels', async () => {
    return await fetch(apiEndPoint+'/getVessels', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
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
              'Authorization': `${token}`,
        },
        body: JSON.stringify(company)
    }).then(res => {
        return res.json()
    });
})
export const getVessel = createAsyncThunk('get_Company', async (Vessel: Vessel) => {
    return await fetch(apiEndPoint+'/getVessel', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(Vessel)
    }).then(res => {
        return res.json()
    });
})

export const deleteCompany = createAsyncThunk('delete_Company', async (company: Company) => {
    const requestOptions = {
        id:`${company}`
    };
    return await fetch(apiEndPoint+'/deleteCompany', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },

        
        body: JSON.stringify(requestOptions)

    }).then(res => {
        return res.json()
    });
})
export const deleteVessel = createAsyncThunk('delete_Vessel', async (Vessel: Vessel) => {
    const requestOptions = {
        id:`${Vessel}`
    };
    return await fetch(apiEndPoint+'/deleteVessel', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },

        
        body: JSON.stringify(requestOptions)

    }).then(res => {
        return res.json()
    });
})
export const deleteUser = createAsyncThunk('delete_User', async (user: any) => {
    const requestOptions = {
        id:`${user}`
    };
    return await fetch(apiEndPoint+'/deleteUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },

        
        body: JSON.stringify(requestOptions)

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
              'Authorization': `${token}`,
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
              'Authorization': `${token}`,
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
              'Authorization': `${token}`,
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
              'Authorization': `${token}`,
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
              'Authorization': `${token}`,
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
              'Authorization': `${token}`,
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
              'Authorization': `${token}`,
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
             'Authorization': `${token}`,
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
              'Authorization': `${token}`,
        },
        body: JSON.stringify(permission)
    }).then(res => {
        return res.json()
    });
})
export const deletePermission = createAsyncThunk('deletePermission', async (data:any) => {
    return await fetch(apiEndPoint+'/deletePermission', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const createCompanyFolder = createAsyncThunk('create_Company_Folder', async (company_id:any) => {
    return await fetch(apiEndPoint+'/createCompanyFolder', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(company_id)
    }).then(res => {
        return res.json()
    });
})





export const getCompanyFolder = createAsyncThunk('get_Company_Folders', async (company_id:any) => {
    return await fetch(apiEndPoint+'/getCompanyFolders', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        body: JSON.stringify(company_id)
    }).then(res => {
        return res.json()
    });
})


export const getDocuments = createAsyncThunk('get_Documents', async (data:any) => {
    return await fetch(apiEndPoint+'/getDocuments', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
// export const uploadeImage = createAsyncThunk('uploade_Image', async (data:any) => {
//     return await fetch(apiEndPoint+'/uploadeImage', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//               'Authorization': `${token}`,
//         },
//         body: JSON.stringify(data)
//     }).then(res => {
//         return res.json()
//     });
// })
export const uploadeImage = createAsyncThunk('uploade_Image', async (user: any) => {
    return await axios.post(apiEndPoint + '/uploadeImage', user, {
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `${token}`,
        },
    }).then(res => {
        return res;
    });
})
export const statusUpdate = createAsyncThunk('status_User', async (data:any) => {
    return await fetch(apiEndPoint+'/statusUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})

export const statusCompany = createAsyncThunk('status_Company', async (data:any) => {
    return await fetch(apiEndPoint+'/statusCompany', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const statusVessel = createAsyncThunk('status_Vessel', async (data:any) => {
    return await fetch(apiEndPoint+'/statusVessel', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const getRolehasPermission = createAsyncThunk('getRolehasPermission', async (data:any) => {
    const requestOptions = {
        role_id:`${data}`
    };
    return await fetch(apiEndPoint+'/getRolehasPermission', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(requestOptions)
    }).then(res => {
        return res.json()
    });
})

// add some country api code here
export const createCountry = createAsyncThunk('createCountry', async (data:any) => {
    return await fetch(apiEndPoint+'/createCountry', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const getCountries = createAsyncThunk('getCountries', async () => {
    return await fetch(apiEndPoint+'/getCountries', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
    }).then(res => {
        return res.json()
    });
})

export const getCountry = createAsyncThunk('getCountry', async (data:any) => {
    return await fetch(apiEndPoint+'/getCountry', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const updateCountry = createAsyncThunk('updateCountry', async (data:any) => {
    return await fetch(apiEndPoint+'/updateCountry', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})

export const deleteCountry = createAsyncThunk('deleteCountry', async (data:any) => {
    return await fetch(apiEndPoint+'/deleteCountry', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})

export const StatusCountry = createAsyncThunk('StatusCountry', async (data:any) => {
    return await fetch(apiEndPoint+'/statusCountry', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
// add some city api code here
export const getCities = createAsyncThunk('getCities', async () => {
    return await fetch(apiEndPoint+'/getCities', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
    }).then(res => {
        return res.json()
    });
})

export const getCountryStates = createAsyncThunk('getCountryStates', async (data:any) => {
    return await fetch(apiEndPoint+'/getCountryStates', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const createCity = createAsyncThunk('createCity', async (data:any) => {
    return await fetch(apiEndPoint+'/createCity', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const getCity = createAsyncThunk('getCity', async (data:any) => {
    return await fetch(apiEndPoint+'/getCity', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const updateCity = createAsyncThunk('updateCity', async (data:any) => {
    return await fetch(apiEndPoint+'/updateCity', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const deleteCity = createAsyncThunk('deleteCity', async (data:any) => {
    return await fetch(apiEndPoint+'/deleteCity', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const statusCity = createAsyncThunk('statusCity', async (data:any) => {
    return await fetch(apiEndPoint+'/statusCity', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const createState = createAsyncThunk('createState', async (data:any) => {
    return await fetch(apiEndPoint+'/createState', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const getStates = createAsyncThunk('getStates', async () => {
    return await fetch(apiEndPoint+'/getStates', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
    }).then(res => {
        return res.json()
    });
})
export const getState = createAsyncThunk('getState', async (data:any) => {
    return await fetch(apiEndPoint+'/getState', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})

export const deleteState = createAsyncThunk('deleteState', async (data:any) => {
    return await fetch(apiEndPoint+'/deleteState', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const statusState = createAsyncThunk('statusState', async (data:any) => {
    return await fetch(apiEndPoint+'/statusState', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
export const updateState = createAsyncThunk('updateState', async (data:any) => {
    return await fetch(apiEndPoint+'/updateState', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    });
})
// add some city api code here++
// role permission getRolehasPermissions
export const getRolehasPermissions = createAsyncThunk('getRolehasPermissions', async (data:any) => {
    return await fetch(apiEndPoint+'/getRolehasPermissions', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
              'Authorization': `${token}`,
        },
        body: JSON.stringify(data)
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
        permission:'',
        address:'',
        street: '',
        country:'',
        city:'',
        zip: '',
        profile_picture:'',
    }
}

export const UserMgmtSlice = createSlice({
    name: 'UserMgmtSlice',
    initialState: INIT_STATE,
    reducers: {
        setAppUser(state, action: PayloadAction<User>) {
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

        // setUserTC(state, action: PayloadAction<any>) {
        //     const tmpUser = state.currUser;
            
        //     return {
        //         ...state,
        //         currUser: Object.assign({
        //             ...tmpUser,
        //             [action.payload.text]: {
        //                 "version": action.payload.value.version,
        //                 "text": action.payload.value.text_content
        //             }
        //         })
        //     }
        // },
        setUserAddress(state, action: PayloadAction<any>) {    
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
            console.log('createUser success' + response.payload)
        })
        builder.addCase(createUser.rejected, (state, response) => {
            console.log('createUser failed' + response)
        })

    }
})