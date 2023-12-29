import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BugList from './components/BugList'
import LoginForm from './components/LoginForm';
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
    element: <BugList />
  },
  {
    path:"/register",
    element:<Register/>
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
