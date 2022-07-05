import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "./components/Review/searchSlice";
import gradeReducer from './components/grade/gradeSlice'

export const store = configureStore({
    reducer : {
        search : searchReducer,
        grade : gradeReducer,
    }
})