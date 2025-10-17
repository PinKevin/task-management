import { createBrowserRouter } from 'react-router';
import RootLayout from './pages/root';
import LoginPage from './pages/login';
import { loginAction } from './actions/login.action';
import RegisterPage from './pages/register';
import { registerAction } from './actions/register.action';
import DashboardPage from './pages/dashboard';
import { guestLoader, protectedLoader } from './loader/auth-loader';
import TaskPage from './pages/task/task';
import { getAllTaskLoader } from './loader/tasks/get-all-loader';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    loader: protectedLoader,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: '/task',
        Component: TaskPage,
        loader: getAllTaskLoader,
      },
    ],
  },
  {
    path: '/login',
    Component: LoginPage,
    action: loginAction,
    loader: guestLoader,
  },
  {
    path: '/register',
    Component: RegisterPage,
    action: registerAction,
    loader: guestLoader,
  },
]);
