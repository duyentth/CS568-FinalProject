import { Outlet } from "react-router-dom";

import UsersNavigation from "../components/UsersNavigation";

function UsersRootLayout() {
    return (
        <>
            <UsersNavigation />
            <Outlet />
        </>
    );
}

export default UsersRootLayout;
