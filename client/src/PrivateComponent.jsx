import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';

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
        <Outlet />
    );
};

export default PrivateComponent;
