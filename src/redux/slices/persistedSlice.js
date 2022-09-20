import { createSlice } from '@reduxjs/toolkit'

export const INITIAL_PERSISTED_STATE = {
    templates: []
}

export const persistedSlice = createSlice({
    name: 'persistedSlice',
    initialState: INITIAL_PERSISTED_STATE,
    reducers: {
        setTemplateData: (state, action) => { state.templates = action.payload },
    }
})

// Action creators are generated for each case reducer function
export const {
    setTemplateData } =
    persistedSlice.actions

export default persistedSlice.reducer