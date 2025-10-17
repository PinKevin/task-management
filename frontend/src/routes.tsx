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
import CreateTaskPage from './pages/task/create-task';
import { getAllUserLoader } from './loader/users/get-all-loader';
import { createTaskAction } from './actions/tasks/create-task.action';
import ViewTaskPage from './pages/task/view-task';
import { getOneLoader } from './loader/tasks/get-one-loader';
import NotFoundTask from './pages/task/not-found-task';
import EditTaskPage from './pages/task/edit-task';
import { getOneAndUsersLoader } from './loader/tasks/get-one-and-users-loader';
import { updateTaskAction } from './actions/tasks/update-task.action';
import { deleteTaskAction } from './actions/tasks/delete-tas.action';

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
        path: '/tasks',
        Component: TaskPage,
        loader: getAllTaskLoader,
      },
      {
        path: '/tasks/create',
        Component: CreateTaskPage,
        loader: getAllUserLoader,
        action: createTaskAction,
      },
      {
        path: '/tasks/:taskId',
        Component: ViewTaskPage,
        loader: getOneLoader,
        ErrorBoundary: NotFoundTask,
      },
      {
        path: '/tasks/:taskId/edit',
        Component: EditTaskPage,
        loader: getOneAndUsersLoader,
        action: updateTaskAction,
        ErrorBoundary: NotFoundTask,
      },
      {
        path: '/tasks/:taskId/delete',
        action: deleteTaskAction,
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
