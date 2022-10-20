import "../../../configs/matchMedia";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AuthForm from "../AuthForm";
import MockComponent from "../../tests/Mock";

describe("Auth Form Props", () => {
	it("should render register form if REGISTER value is passed as props authType", async () => {
		render(<MockComponent children={<AuthForm authType="REGISTER" formConfig={{}} />} />);
		const registerForm = screen.getByRole("form");
		expect(registerForm).toBeInTheDocument();
	});
});
