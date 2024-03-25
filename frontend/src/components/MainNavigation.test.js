import { render, screen,} from "@testing-library/react";
import MainNavigation from "./MainNavigation";

describe("Mainavigation Component", () => {
    test('render "Logout" NavLink right after user has logged in', async () => {
        //Arrange
        render(<MainNavigation />);
        //Act
        localStorage.setItem("token", "abc");

        //Assert
        const logoutElement = screen.getByText("Events");
        expect(logoutElement).toBeInTheDocument();
    });
});
