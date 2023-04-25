import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import ErrorPage from "./pages/Error";
import EventsRootLayout from "./pages/EventsRoot";
import EventDetailPage, {
    loader as eventDetailLoader,
    action as deleteEventAction,
} from "./pages/EventDetail";
import EditEventPage from "./pages/EditEvent";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import UsersRootLayout from "./pages/UsersRoot";
import NewEventPage from "./pages/NewEvent";
import UsersPage from "./pages/Users";
import UserDetailPage from "./pages/UserDetail";
import EditUserPage from "./pages/EditUser";
import NewUserPage from "./pages/NewUser";
import LoginPage, { action as authAction } from "./pages/Login";
import { action as logoutAction } from "./pages/Logout";
import { action as manipulateAction } from "./components/EventForm";
import { tokenLoader } from "./util/auth";
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        id: 'root',
        loader: tokenLoader,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "events",
                element: <EventsRootLayout />,
                children: [
                    {
                        index: true,
                        element: <EventsPage />,
                        loader: eventsLoader,
                    },
                    {
                        path: ":eventId",
                        id: "event-detail",
                        loader: eventDetailLoader,
                        children: [
                            {
                                index: true,
                                element: <EventDetailPage />,
                                action: deleteEventAction,
                            },
                            {
                                path: "edit",
                                element: <EditEventPage />,
                                action: manipulateAction,
                            },
                        ],
                    },
                    {
                        path: "new",
                        element: <NewEventPage />,
                        action: manipulateAction,
                    },
                ],
            },
            {
                path: "newsletters",
                element: <NewsletterPage />,
                action: newsletterAction,
            },
            {
                path: "users",
                element: <UsersRootLayout />,
                children: [
                    {
                        index: true,
                        element: <UsersPage />,
                    },
                    {
                        path: ":usersId",
                        children: [
                            { index: true, element: <UserDetailPage /> },
                            { path: "edit", element: <EditUserPage /> },
                        ],
                    },
                    { path: "new", element: <NewUserPage /> },
                ],
            },
            { path: "auth", element: <LoginPage />, action: authAction },
            { path: "logout", action: logoutAction },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
