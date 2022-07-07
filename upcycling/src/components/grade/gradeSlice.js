import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    userId : '',
    postingAmount : 0,
    commentsAmount : 0
}

const greadeSlice = createSlice({
    name : 'gradeList',
    initialState,
    reducers : {
        getAmounts(state, action) {
            state.userId = action.payload.userId;
            state.postingAmount = action.payload.postingAmount;
            state.commentsAmount = action.payload.commentsAmount;
        }
    }
})

export const { getAmounts } =greadeSlice.actions
export default greadeSlice.reducer;