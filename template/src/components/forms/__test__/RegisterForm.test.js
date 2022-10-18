import "../../../configs/matchMedia";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "../RegisterForm";
import MockComponent from "../../tests/Mock";

/*
    conditions
    1.) Phone number input field is required
    2.) Email address input field is optional
    3.) Name input field is required
    4.) If phone number format does not meet criteria will have error message (alphabets, spaces, symbols, length, starts with 01)
    5.) If email address format does not meet criteria will have error message (.@something.com)
    6.) If name format does not meet criteria will have error message (number, symbols)
    7.) Can submit form when everything is correct
    8.) After form submit success should 
    9.) After form submit failed should popup error message
*/

describe("Form Input Validations", () => {
	describe("Phone Number Input Validations", () => {
		it("should be required input field", async () => {
			render(<MockComponent children={<RegisterForm />} />);
			const phoneInput = screen.getByRole("textbox", { name: /number/i });
			expect(phoneInput).toBeRequired();
		});

		it("should show error message if format is not correct", async () => {
			render(<MockComponent children={<RegisterForm />} />);
			const phoneInput = screen.getByRole("textbox", { name: /number/i });
			await userEvent.type(phoneInput, "012 3456789 ");
			const numberRegex = /^(01)[0-46-9]([0-9]){7,8}$/;
			if (!numberRegex.test(phoneInput.value)) {
				const errorMessage = await screen.findByText("You have entered an invalid phone number");
				expect(errorMessage).toBeInTheDocument();
			}
		});
	});

	describe("Email Address Input Validations", () => {
		it("should be optional input field", async () => {
			render(<MockComponent children={<RegisterForm />} />);
			const emailInput = screen.getByRole("textbox", { name: /email/i });
			expect(emailInput).not.toBeRequired();
		});

		it("should show error message if format is not correct", async () => {
			render(<MockComponent children={<RegisterForm />} />);
			const emailInput = screen.getByRole("textbox", { name: /email/i });
			await userEvent.type(emailInput, "te stem ail.com");
			const emailRegex = /.@[a-z]+\.[a-z]{2,}$/;
			if (!emailRegex.test(emailInput.value)) {
				const errorMessage = await screen.findByText("You have entered an invalid email address");
				expect(errorMessage).toBeInTheDocument();
			}
		});
	});

	describe("User Name Input Validations", () => {
		it("should be required input field", async () => {
			render(<MockComponent children={<RegisterForm />} />);
			const nameInput = screen.getByRole("textbox", { name: /name/i });
			expect(nameInput).toBeRequired();
		});

		it("should show error message if format is not correct", async () => {
			render(<MockComponent children={<RegisterForm />} />);
			const nameInput = screen.getByRole("textbox", { name: /name/i });
			await userEvent.type(nameInput, "123!");
			const nameRegex = /^[a-zA-Z ]+$/;
			if (!nameRegex.test(nameInput.value)) {
				const errorMessage = await screen.findByText('Please avoid using special characters in "Name" input field');
				expect(errorMessage).toBeInTheDocument();
			}
		});
	});
});

// describe("Form Submissions", () => {
// 	test("if ", async () => {});
// });
