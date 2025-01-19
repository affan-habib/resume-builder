import { createBrowserRouter } from 'react-router-dom';
import Resume from './pages/Resume';
import Layout from './pages/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Resume />,
  },
  {
    path: '/Layout',
    element: <Layout />,
  },
]);
