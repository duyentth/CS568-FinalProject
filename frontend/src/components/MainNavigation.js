import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";
// import NewsletterSignup from "./NewsletterSignup";

function MainNavigation() {
    const token = useRouteLoaderData("root");

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/events"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Events
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/newsletters"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Newsletter
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/users"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Users
                        </NavLink>
                    </li>
                    <li>
                        <Form action="/search" method="post">
                            <input placeholder="search events"></input>
                        </Form>
                    </li>
                    {!token && (
                        <li>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                }
                            >
                                Login
                            </NavLink>
                        </li>
                    )}

                    {!token && (
                        <li>
                            <NavLink
                                to="/logout"
                                className={({ isActive }) =>
                                    isActive ? classes.active : undefined
                                }
                            >
                                Logout
                            </NavLink>
                        </li>
                    )}
                    {token && (
                        <li>
                            <Form action="/logout" method="post">
                                <button>Logout</button>
                            </Form>
                        </li>
                    )}
                </ul>
            </nav>
            {/* <NewsletterSignup /> */}
        </header>
    );
}

export default MainNavigation;
