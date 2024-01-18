import "primereact/resources/themes/lara-dark-pink/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css
import 'primeicons/primeicons.css'; //import icons

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BugPageMP from './components/Bugs/BugPageMP'
import BugPageTST from './components/Bugs/BugPageTST'

import WelcomePage from './components/WelcomePage'
import LoginForm from './components/LoginForm';
import BugDataTable from './components/Bugs/BugDataTable';
import Register from './components/Register';
import ProjectListMP from "./components/ProjectListMP";
import TesterProjectPage from "./components/TesterProjectPage";
import ChoseMembership from "./components/ChoseMembership";
import UserContext from './components/UserContext';
import {
  BrowserRouter as Router,
  createBrowserRouter, RouterProvider,
} from 'react-router-dom';
import ProjectListTST from "./components/ProjectListTST";




const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />
  },
  {
    path: "/mp/bugs/:projectID",
    element: <BugPageMP />
  },
  {
    path: "/tst/bugs/:projectID",
    element: <BugPageTST />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/mp/listProjects",
    element: <ProjectListMP />
  },
  {
    path: "/tst/listProjects",
    element: <ProjectListTST />
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

const RootComponent = () => {
  const [user, setUser] = useState({});

  return (
    <React.StrictMode>
      <RouterProvider router={router}>
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            <App />
          </Router>
        </UserContext.Provider>
      </RouterProvider>
    </React.StrictMode>
  );
};
root.render(<RootComponent />);
