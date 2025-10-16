import { createBrowserRouter } from 'react-router';
import RootLayout from './routes/root';
import LoginPage from './routes/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/login',
        Component: LoginPage,
      },
    ],
  },
]);
