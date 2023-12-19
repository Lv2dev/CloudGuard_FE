import React, {useEffect, useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { motion } from 'framer-motion';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {login, logout, setLoading} from "../store/authSlice";
import axiosInstance from "../utils/axios";


const pageVariants = {
    initial: {
        x: "-100vw",
        opacity: 0
    },
    in: {
        x: 0,
        opacity: 1
    },
    out: {
        x: "100vw",
        opacity: 0
    }
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
};
function MemberLogin(props) {
    // navigate
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await axiosInstance.post('token/login', { email, password });
            localStorage.setItem('accessToken', response.data.accessToken); // 로컬 스토리지에 저장
            dispatch(login({
                accessToken: response.data.accessToken
            }));
            console.log('로그인 성공')
            dispatch(setLoading(false));

            navigate('/home'); // 로그인 성공 후 리디렉션
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed');
        }
    };



    return (

            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: {xs: 2, sm: 3, md: 4},
                    boxSizing: 'border-box',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#fff',
                            mb: 4,
                            fontFamily: 'Arial, sans-serif',
                            fontSize: {xs: '1.5rem', sm: '2rem', md: '2.5rem'},
                        }}
                    >
                        Login
                    </Typography>
                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            mb: 2,
                            color: 'white',
                            backgroundColor: '#333',
                            '&:hover': {backgroundColor: '#555'},
                            fontSize: {xs: '0.8rem', sm: '1rem', md: '1.2rem'},
                        }}
                        onClick={handleLogin} // 로그인 함수 연결
                    >
                        Login
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                            mt: 2,
                            color: '#333',
                            borderColor: '#333',
                            '&:hover': {
                                backgroundColor: '#efefef', // 호버 시 배경색 변경
                            },
                            fontSize: {xs: '0.8rem', sm: '1rem', md: '1.2rem'},
                        }}
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
    );
}

export default MemberLogin;