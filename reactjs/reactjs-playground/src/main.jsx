import { createRoot } from 'react-dom/client';
import './index.css'; // Importing the css file
import App from "./App.jsx";
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import LogInPage from './pages/LogInPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

let rootContainer = document.getElementById('root');

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "profile",
                element: <ProfilePage />
            }
        ]
    },
    {
        path: "/login",
        element: <LogInPage />
    }
])

createRoot(rootContainer).render(<RouterProvider router={router} />);