import { createBrowserRouter } from 'react-router-dom';
import Resume from '@/pages/Resume';
import PublicLayout from '@/layouts/PublicLayout';
import LandingPage from '@/pages/promotional/LandingPage';
import ResumeLayout from '@/layouts/Resumelayout';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/promotional/LoginPage';
import ProtectedRoute from '@/layouts/ProtectedRoute';
import PresentationSlides from './pages/promotional/PresentaionSlides';
import NotFoundPage from './pages/NotFoundPage';
// import PresentationSlides from '@/pages/promotional/PresentationSlides';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
    ],
  },

  {
    path: '/resume',
    element: <ProtectedRoute>
      <ResumeLayout />
    </ProtectedRoute>,
    children: [
      {
        path: 'preview',
        element: <Resume />,
      },
    ],
  },

  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },

  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <PresentationSlides />
      </ProtectedRoute>
    ),
  },
  {
    path: '*', 
    element: <NotFoundPage />,
  },
]);
