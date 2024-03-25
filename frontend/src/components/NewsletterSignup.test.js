import { render, screen } from "@testing-library/react";
import NewsletterSignup from "./NewsletterSignup";

describe("Mainavigation Component", () => {
    test("should see the signup button", async () => {
        //Arrange
        render(<NewsletterSignup />);

        //Assert
        const signUpBtn = await screen.findByRole("button", { name: "signup" });
        expect(signUpBtn).toBeInTheDocument();
    });
});
