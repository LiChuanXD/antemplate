import "../../../configs/matchMedia";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "../RegisterForm";
import MockComponent from "../../tests/Mock";
import checkInputFormat from "../../../utils/misc/validation";

describe("Name Input Field", () => {
	it("Should render input field if show input is true", async () => {
		const formConfig = {
			name: {
				showInput: true
			}
		};
		render(<MockComponent children={<RegisterForm formConfig={formConfig} />} />);
		const nameInputElement = screen.getByTestId("name-input");
		expect(nameInputElement).toBeInTheDocument();
	});

	it("Should show the correct label if string is passed as props", async () => {
		const formConfig = {
			name: {
				showInput: true,
				label: "User Name"
			}
		};
		render(<MockComponent children={<RegisterForm formConfig={formConfig} />} />);
		const labelText = screen.getByText(formConfig.name.label);
		expect(labelText).toBeInTheDocument();
		expect(labelText.innerHTML).toBe(formConfig.name.label);
	});

	it("Should be required if required is true", async () => {
		const formConfig = {
			name: {
				showInput: true,
				label: "User Name",
				required: true
			}
		};
		render(<MockComponent children={<RegisterForm formConfig={formConfig} />} />);
		const nameInputField = screen.getByRole("textbox", { name: formConfig.name.label });
		expect(nameInputField).toBeRequired();
	});

	it("Should have correct placeholder if string is passed as props", async () => {
		const formConfig = {
			name: {
				showInput: true,
				label: "User Name",
				placeholder: "Your Full Name"
			}
		};
		render(<MockComponent children={<RegisterForm formConfig={formConfig} />} />);
		const nameInputField = screen.getByPlaceholderText(formConfig.name.placeholder);
		expect(nameInputField).toBeInTheDocument();
		expect(nameInputField.placeholder).toBe(formConfig.name.placeholder);
	});

	it("Should be disabled if true is being passed as props", async () => {
		const formConfig = {
			name: {
				showInput: true,
				label: "User Name",
				disabled: true
			}
		};
		render(<MockComponent children={<RegisterForm formConfig={formConfig} />} />);
		const nameInputField = screen.getByRole("textbox", { name: formConfig.name.label });
		expect(nameInputField).toBeDisabled();
	});

	it("Should have the correct default/initial value if its being passed as props", async () => {
		const formConfig = {
			name: {
				showInput: true,
				label: "User Name",
				defaultValue: "test user name"
			}
		};
		render(<MockComponent children={<RegisterForm formConfig={formConfig} />} />);
		const nameInputField = screen.getByDisplayValue(formConfig.name.defaultValue);
		expect(nameInputField).toBeInTheDocument();
		expect(nameInputField.value).toBe(formConfig.name.defaultValue);
	});

	it("Should show error message if format is not correct", async () => {
		const formConfig = {
			name: {
				showInput: true,
				label: "User Name"
			}
		};
		render(<MockComponent children={<RegisterForm formConfig={formConfig} />} />);
		const nameInputField = screen.getByRole("textbox", { name: formConfig.name.label });
		await userEvent.type(nameInputField, "12 3");
		const result = checkInputFormat({ name: nameInputField.value });
		const errorMessage = await screen.findByText(result.message);
		expect(errorMessage).toBeInTheDocument();
	});
});
