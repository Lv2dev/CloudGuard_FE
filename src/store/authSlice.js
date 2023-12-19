// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        isLoggedIn: false,
        isLoading: true,
        tree:null,
        // ... 기타 상태 ...
    },
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.isLoading = false; // 로그인 시 로딩 상태 변경
            // ... 기타 로그인 처리 ...
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        logout: state => {
            state.accessToken = null;
            // ... 기타 로그아웃 처리 ...
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setTree: (state, action) => {
            state.tree = action.payload;
        },
        // ... 기타 리듀서 ...
    }
});

export const { login, updateAccessToken, logout , setLoading, setTree} = authSlice.actions;

export default authSlice.reducer;
