import "../../../configs/matchMedia";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AuthForm from "../AuthForm";
import MockComponent from "../../tests/Mock";

it("should render register form if authType = REGISTER", async () => {
	render(<MockComponent children={<AuthForm authType="REGISTER" formConfig={{}} />} />);
	const registerForm = screen.getByTestId("register-form");
	expect(registerForm).toBeInTheDocument();
});

it("should render login form if authType = LOGIN", async () => {
	render(<MockComponent children={<AuthForm authType="LOGIN" />} />);
	const loginForm = screen.getByTestId("login-form");
	expect(loginForm).toBeInTheDocument();
});
