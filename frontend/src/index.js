import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css
import 'primeicons/primeicons.css'; //import icons

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BugPage from './components/Bugs/BugPage'
import LoginForm from './components/LoginForm';
import BugDataTable from './components/Bugs/BugDataTable';
import Register from './components/Register';
import MemberProjectPage from "./components/MemberProjectPage";
import TesterProjectPage from "./components/TesterProjectPage";
import ChoseMembership from "./components/ChoseMembership";
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
  },
  {
    path: "/projectsMember",
    element: <MemberProjectPage />
  },
  {
    path: "/projectsTester",
    element: <TesterProjectPage />
  },
  {
    path: "/chosemembership",
    element: <ChoseMembership />
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
