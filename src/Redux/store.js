import {configureStore} from "@reduxjs/toolkit";
import  useReducer, { profileReducer, subscriptionReducer } from "./reducers/userReducer";
import {courseReducer} from "./reducers/courseReducer"; 
import {adminReducer} from "./reducers/adminReducer"
import { otherReducer } from "./reducers/otherReducer";

const store = configureStore({

    reducer: {
        user: useReducer,
        profile: profileReducer,
        course: courseReducer,
        subscription: subscriptionReducer,
        admin: adminReducer,
        other: otherReducer,
    }
});

export default store;

export const server = "https://course-website-b8by.onrender.com/api/v1";
