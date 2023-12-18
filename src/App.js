import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MemberLogin from './unauth/MemberLogin';
import MemberSignUp from './unauth/MemberSignUp';
import LoginWrapper from "./wrapper/LoginWrapper";


function App() {
    const location = useLocation();

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
            {/* 다른 라우트들 */}
        </Routes>
    );
}

export default App;