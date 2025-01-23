import { createBrowserRouter } from 'react-router-dom';
import Resume from './pages/Resume';
import PublicLayout from './layouts/PublicLayout';
import LandingPage from './pages/PromotionalPage/LandingPage';
import ResumeLayout from './layouts/Resumelayout';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/PromotionalPage/LoginPage';
import ProtectedRoute from './layouts/ProtectedRoute';

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: '/',
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
    path: '/resume',
    element: (
      <ProtectedRoute>
        <ResumeLayout />
      </ProtectedRoute>
    ), 
    children: [
      {
        path: 'preview',
        element: <Resume />,
      }
    ],
  },
]);
