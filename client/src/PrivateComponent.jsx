import { Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './AuthContext';

const PrivateComponent = ({ allowedRoles }) => {
    const token = sessionStorage.getItem('token');

    if (!token) return <Navigate to="/login" />;

    let decoded = null;
    try {
        decoded = jwtDecode(token);
    } catch (err) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(decoded.role)) {
        return <Navigate to="/login" />;
    }

    return (
        <AuthContext.Provider value={{ role: decoded.role }}>
            <Outlet />
        </AuthContext.Provider>
    );
};

export default PrivateComponent;
