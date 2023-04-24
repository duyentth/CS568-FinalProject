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
import NewsletterPage from "./pages/Newsletter";
import UsersRootLayout from "./pages/UsersRoot";
import NewEventPage, { action as newEventAction } from "./pages/NewEvent";
import UsersPage from "./pages/Users";
import UserDetailPage from "./pages/UserDetail";
import EditUserPage from "./pages/EditUser";
import NewUserPage from "./pages/NewUser";
import LoginPage from "./pages/Login";
import LogoutPage from "./pages/Logout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
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
                            { path: "edit", element: <EditEventPage /> },
                        ],
                    },
                    {
                        path: "new",
                        element: <NewEventPage />,
                        action: newEventAction,
                    },
                ],
            },
            { path: "newsletters", element: <NewsletterPage /> },
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
            { path: "login", element: <LoginPage /> },
            { path: "logout", element: <LogoutPage /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
