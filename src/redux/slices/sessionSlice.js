import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isLoading: false,
}

export const sessionReducer = createSlice({
    name: 'sessionReducer',
    initialState,
    reducers: {
        setLoading: (state, action) => { state.isLoading = action.payload },
    },
})

// Action creators are generated for each case reducer function
export const { setLoading } = sessionReducer.actions

export default sessionReducer.reducer