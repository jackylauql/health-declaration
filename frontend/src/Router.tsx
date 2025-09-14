import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './components/AppLayout/AppLayout';
import { HealthDeclareFormPage } from './pages/HealthDeclareFormPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '', element: <HealthDeclareFormPage /> }],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
