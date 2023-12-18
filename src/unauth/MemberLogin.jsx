import React from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { motion } from 'framer-motion';

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
                        sx={{mb: 2}}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        sx={{mb: 2}}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            mb: 2, // 로그인 버튼과 회원가입 버튼 사이의 마진 추가
                            color: 'white',
                            backgroundColor: '#333',
                            '&:hover': {backgroundColor: '#555'},
                            fontSize: {xs: '0.8rem', sm: '1rem', md: '1.2rem'},
                        }}
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