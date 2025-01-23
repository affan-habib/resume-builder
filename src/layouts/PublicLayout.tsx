import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const PublicLayout = () => {

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
