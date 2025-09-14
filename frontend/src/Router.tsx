import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './components/AppLayout/AppLayout';
import { ListDeclarationPage } from './pages/health-declaration/ListDeclarations';
import { NewDeclarationPage } from './pages/health-declaration/NewDeclaration';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '', element: <ListDeclarationPage /> },
      { path: '/new', element: <NewDeclarationPage /> },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
