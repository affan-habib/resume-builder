import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '@/store';

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const user = useSelector((state: RootState) => state.user);
    const location = useLocation();

    if (!user || !user.uid) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
    return children;
};

export default ProtectedRoute;
