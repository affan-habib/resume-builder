import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import Resume from './pages/Resume';
import PublicLayout from './layouts/PublicLayout';
import LandingPage from './pages/PromotionalPage/LandingPage';
import ResumeLayout from './layouts/Resumelayout';

export const router = createBrowserRouter([
  // Public routes
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
    element: <ResumeLayout />,
    children: [
      {
        path: 'preview',
        element: <Resume />, 
      },
      {
        path: 'layout',
        element: <Layout />,
      },
    ],
  },
]);
