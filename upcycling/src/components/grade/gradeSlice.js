import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    gradeList : [
        
    ]
}

const greadeSlice = createSlice({
    name : 'gradeList',
    initialState,
    reducers : {
        showGrade(state, action) {
            
        }
    }
})

export const { showGrade } =greadeSlice.actions
export default greadeSlice.reducer;