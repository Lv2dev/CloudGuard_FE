import React, {useEffect} from 'react';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import MemberLogin from './unauth/MemberLogin';
import MemberSignUp from './unauth/MemberSignUp';
import LoginWrapper from "./wrapper/LoginWrapper";
import ProtectedRoute from './ProtectedRoute';
import DefaultWrapper from "./wrapper/DefaultWrapper";
import FileExplorer from "./main/FileExplorer";
import {useDispatch, useSelector} from "react-redux";
import axiosInstance from "./utils/axios";
import {login, logout, setLoading} from "./store/authSlice";


function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector((state) => state.auth);

    // 로그인 상태 확인 함수
    const checkAuthStatus = async () => {
        try {
            const response = await axiosInstance.get('token/auth/check');
            if (response.status === 200) {
                dispatch(login());
            } else {
                dispatch(logout());
                navigate('/login');
            }
        } catch (error) {
            console.error('Error checking auth status', error);
            dispatch(logout());
            navigate('/login');
        }
    };

    const checkValidToken = async (accessToken) => {
        const response = await axiosInstance.get(`token/validity?token=${accessToken}`);
        return response.data.isValid;
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            // 엑세스 토큰 유효성 검사
            if(checkValidToken(accessToken)){
                console.log("유효한 토큰")
                dispatch(login({ accessToken }));
                // 만약 현재 경로가 /login 또는 /signup이라면 /home으로 이동
                if (location.pathname === '/login' || location.pathname === '/signup') {
                    navigate('/home');
                }
            }else{
                console.log("유효하지 않은 토큰")
                checkAuthStatus(); // 추가적인 유효성 검사
            }
        } else {
            console.log("토큰 없음")
            dispatch(logout());
            navigate('/login');
        }
        dispatch(setLoading(false));
    }, [dispatch]);


    return (
        <Routes>
            <Route path="/login" element={
                <LoginWrapper key={location.pathname}>
                    <MemberLogin />
                </LoginWrapper>
            } />
            <Route path="/signup" element={
                <LoginWrapper key={location.pathname}>
                    <MemberSignUp />
                </LoginWrapper>
            } />
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        {/* 보호된 컴포넌트 또는 페이지 */}
                        <DefaultWrapper key={location.pathname}>
                            <FileExplorer />
                        </DefaultWrapper>
                    </ProtectedRoute>
                }
            />
            {/* 다른 라우트들 */}
        </Routes>
    );
}

export default App;