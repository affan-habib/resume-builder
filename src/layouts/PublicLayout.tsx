import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import { RootState } from '../store';

const PublicLayout = () => {
    const user = useSelector((state: RootState) => state.user);
    const location = useLocation();
    if (user && user.uid && location.pathname === '/') {
        return <Navigate to="/resume/preview" replace />;
    }

    return (
        <div>
            <NavBar />
            <Outlet />
            <footer className="bg-beige-600 py-8">
                <div className="max-w-7xl mx-auto text-center text-white">
                    <p>&copy; 2025 ResumeBuilder. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
