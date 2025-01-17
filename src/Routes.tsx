import { createBrowserRouter } from 'react-router-dom';
import Resume from './pages/Resume';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Resume />,
  },
]);
