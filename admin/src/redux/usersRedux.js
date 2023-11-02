import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        getUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users = action.payload;
        },
        getUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        deleteUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users = state.users.filter((item) => item !== action.payload);
        },
        deleteUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        updateUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users[
                state.users.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.user;
        },
        updateUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        addUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.users.push(action.payload)
        },
        addUsersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getUsersFailure,
    getUsersStart,
    getUsersSuccess,
    deleteUsersStart,
    deleteUsersSuccess,
    deleteUsersFailure,
    updateUsersStart,
    updateUsersSuccess,
    updateUsersFailure,
    addUsersStart,
    addUsersSuccess,
    addUsersFailure,
} = usersSlice.actions;
export default usersSlice.reducer;
