import { createBrowserRouter } from 'react-router';
import RootLayout from './pages/root';
import LoginPage from './pages/login';
import { loginAction } from './actions/login.action';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [],
  },
  {
    path: '/login',
    Component: LoginPage,
    action: loginAction,
  },
]);
