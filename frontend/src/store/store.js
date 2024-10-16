import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import url from "../helper";
import solutionReducers from "./slices/solutionSlice"
import userReducers from "./slices/userSlice"



export const store = configureStore({
    reducer:{
        solutions:solutionReducers,
        user:userReducers
    }

});

export default store