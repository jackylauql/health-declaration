import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './components/AppLayout/AppLayout';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '', element: <HomePage /> }],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
