import reducer from "./reducers/anecdoteReducer"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        anecdotes: reducer
    }
})

export default store