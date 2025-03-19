import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Layouts
import MainLayout from '../components/layouts/MainLayout';
import AuthLayout from '../components/layouts/AuthLayout';

// Loading component
import LoadingSpinner from '../components/common/LoadingSpinner';

// Protected route wrapper
import ProtectedRoute from './ProtectedRoute';

// Lazy-loaded pages
const Dashboard = lazy(() => import('../features/dashboard/Dashboard'));
const ProjectsList = lazy(() => import('../features/projects/ProjectsList'));
const ProjectDetails = lazy(() => import('../features/projects/ProjectDetails'));
const Settings = lazy(() => import('../features/settings/Settings'));
const Login = lazy(() => import('../features/auth/Login'));
const Register = lazy(() => import('../features/auth/Register'));
const NotFound = lazy(() => import('../components/common/NotFound'));

const wrapSuspense = (Component: React.LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: wrapSuspense(Dashboard),
      },
      {
        path: 'projects',
        children: [
          {
            index: true,
            element: wrapSuspense(ProjectsList),
          },
          {
            path: ':id',
            element: wrapSuspense(ProjectDetails),
          },
        ],
      },
      {
        path: 'settings',
        element: wrapSuspense(Settings),
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: wrapSuspense(Login),
      },
      {
        path: 'register',
        element: wrapSuspense(Register),
      },
    ],
  },
  {
    path: '*',
    element: wrapSuspense(NotFound),
  },
];

export default routes; 