import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BugPage from './components/BugPage'
import LoginForm from './components/LoginForm';
import BugDataTable from './components/BugDataTable';

import Register from './components/Register';
import {
  createBrowserRouter, RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />
  },
  {
    path: "/bugs",
    element: <BugPage />
  },
  {
    path: "/register",
    element: <Register />
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
