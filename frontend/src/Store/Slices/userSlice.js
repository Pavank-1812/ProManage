import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRegister, userLogin, userUpdate } from "../../Apis/authAPI";

const initialState = {
    isAuthenticated: false,
    name: null,
    token: null,
};


const updateLocalStorage = (state) => {
    if (state.name) {
        localStorage.setItem("name", state.name);
    }

    if (state.isAuthenticated) {
        localStorage.setItem("isAuthenticated", state.isAuthenticated);
    }

    if (state.token) {
        localStorage.setItem("token", state.token);
    }
}

export const register = createAsyncThunk('register', async ({ name, email, password }, { rejectWithValue }) => {
    try {
        const response = await userRegister({ name, email, password });
        console.log(response);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

export const login = createAsyncThunk('login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await userLogin({ email, password });
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});


export const updateUser = createAsyncThunk('updateUser', async (updateData, { rejectWithValue }) => {
    try {
        const response = await userUpdate(updateData);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.name = null;
            state.token = null;
            localStorage.clear();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.name = action.payload.name;
                state.token = action.payload.token;
                updateLocalStorage(state);
            }
        })
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.name = action.payload.name;
                state.token = action.payload.token;
                updateLocalStorage(state);
            }
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.name = action.payload.name;
                updateLocalStorage(state);
            }
        })
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;