import { createSlice } from '@reduxjs/toolkit'

export const headerCounter = createSlice({
    name: "count",
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        }
    }
})

export const {increment , decrement} = headerCounter.actions
export default headerCounter.reducer