import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
	token: null,
	user: null,
	isLoading: false,
	error: null
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: builder => {}
});

export const {} = userSlice.actions;
export default userSlice.reducer;
