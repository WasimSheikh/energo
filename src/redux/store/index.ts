import { UserMgmtSlice } from './reducers/slices/UserSlice';
import { configureStore } from "@reduxjs/toolkit";

export const store=configureStore({
    reducer :{
        user: UserMgmtSlice.reducer
    }
})

export type AppState = ReturnType<typeof store.getState>;

