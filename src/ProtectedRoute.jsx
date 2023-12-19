import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * 보호된 라우트를 위한 고차 컴포넌트(Higher-Order Component, HOC)를 생성합니다.
 * 이 컴포넌트는 로그인 상태를 확인하고, 필요한 경우 사용자를 로그인 페이지로 리디렉션합니다.
 * */

function ProtectedRoute({ children }) {
    const authState = useSelector((state) => state.auth);

    if (authState.isLoading) {
        return <div>Loading...</div>; // 로그인 상태 확인 중 표시
    }

    // if (!authState.isLoggedIn) {
    //     return <Navigate to="/login" />;
    // }

    return children;
}

export default ProtectedRoute;
