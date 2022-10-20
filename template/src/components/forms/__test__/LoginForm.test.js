import "../../../configs/matchMedia";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";
import MockComponent from "../../tests/Mock";
import checkInputFormat from "../../../utils/misc/validation";

it("Should have the default label of 'Phone Number'", async () => {
	render(<MockComponent children={<LoginForm />} />);
	const formLabel = screen.getByText("Phone Number");
	expect(formLabel).toBeInTheDocument();
	expect(formLabel.innerHTML).toBe("Phone Number");
});

it("Should show the correct label value", async () => {
	render(<MockComponent children={<LoginForm formConfig={{ label: "Number" }} />} />);
	const formLabel = screen.getByText("Number");
	expect(formLabel).toBeInTheDocument();
	expect(formLabel.innerHTML).toBe("Number");
});

it("Should show correct placeholder value", async () => {
	render(<MockComponent children={<LoginForm formConfig={{ placeholder: "Phone Number" }} />} />);
	const inputField = screen.getByPlaceholderText("Phone Number");
	expect(inputField).toBeInTheDocument();
	expect(inputField.placeholder).toBe("Phone Number");
});
