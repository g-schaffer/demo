import { RouteObject } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Order } from '../pages/Order';
import { Layout } from '../layouts/Layout';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'order',
        element: <Order />,
      },
    ],
  },
];