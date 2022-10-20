import "../../../configs/matchMedia";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "../RegisterForm";
import MockComponent from "../../tests/Mock";
import checkInputFormat from "../../../utils/misc/validation";

/*
    conditions
*/

// describe("Form Input Validations", () => {
// 	describe("Phone Number Input Validations", () => {
// 		it("should be able to type", async () => {
// 			render(<MockComponent children={<RegisterForm />} />);
// 			const phoneInput = screen.getByRole("textbox", { name: /number/i });
// 			await userEvent.type(phoneInput, "0123456789");
// 			expect(phoneInput.value).toBe("0123456789");
// 		});

// 		it("should be required input field", async () => {
// 			render(<MockComponent children={<RegisterForm />} />);
// 			const phoneInput = screen.getByRole("textbox", { name: /number/i });
// 			expect(phoneInput).toBeRequired();
// 		});

// 		it("should show error message if format is not correct", async () => {
// 			render(<MockComponent children={<RegisterForm />} />);
// 			const phoneInput = screen.getByRole("textbox", { name: /number/i });
// 			await userEvent.type(phoneInput, "012 3456789 ");
// 			const { result, message } = checkInputFormat({ number: phoneInput.value });
// 			if (!result) {
// 				const errorMessage = await screen.findByText(message);
// 				expect(errorMessage).toBeInTheDocument();
// 			}
// 		});

// 		it("should have default value if props was passed in", async () => {
// 			render(<MockComponent children={<RegisterForm formConfig={{ number: "0123456789" }} />} />);
// 			const phoneInput = screen.getByRole("textbox", { name: /number/i });
// 			expect(phoneInput.value).toBe("0123456789");
// 		});
// 	});

// 	describe("Email Address Input Validations", () => {
// 		it("should be able to type", async () => {
// 			render(<MockComponent children={<RegisterForm />} />);
// 			const emailInput = screen.getByRole("textbox", { name: /email/i });
// 			await userEvent.type(emailInput, "test@email.com");
// 			expect(emailInput.value).toBe("test@email.com");
// 		});

// 		it("should be optional input field", async () => {
// 			render(<MockComponent children={<RegisterForm />} />);
// 			const emailInput = screen.getByRole("textbox", { name: /email/i });
// 			expect(emailInput).not.toBeRequired();
// 		});

// 		it("should show error message if format is not correct", async () => {
// 			render(<MockComponent children={<RegisterForm />} />);
// 			const emailInput = screen.getByRole("textbox", { name: /email/i });
// 			await userEvent.type(emailInput, "te stem ail.com");
// 			const { result, message } = checkInputFormat({ email: emailInput.value });
// 			if (!result) {
// 				const errorMessage = await screen.findByText(message);
// 				expect(errorMessage).toBeInTheDocument();
// 			}
// 		});

// 		it("should have default value if props was passed in", async () => {
// 			render(<MockComponent children={<RegisterForm formConfig={{ email: "test@email.com" }} />} />);
// 			const emailInput = screen.getByRole("textbox", { name: /email/i });
// 			expect(emailInput.value).toBe("test@email.com");
// 		});
// 	});

// 	describe("User Name Input Validations", () => {
// 		it("should be able to type", async () => {
// 			render(<MockComponent children={<RegisterForm />} />);
// 			const nameInput = screen.getByRole("textbox", { name: /name/i });
// 			await userEvent.type(nameInput, "abcde");
// 			expect(nameInput.value).toBe("abcde");
// 		});

// 		it("should be required input field", async () => {
// 			render(<MockComponent children={<RegisterForm />} />);
// 			const nameInput = screen.getByRole("textbox", { name: /name/i });
// 			expect(nameInput).toBeRequired();
// 		});

// 		it("should show error message if format is not correct", async () => {
// 			render(<MockComponent children={<RegisterForm />} />);
// 			const nameInput = screen.getByRole("textbox", { name: /name/i });
// 			await userEvent.type(nameInput, "123!");
// 			const { result, message } = checkInputFormat({ name: nameInput.value });
// 			if (!result) {
// 				const errorMessage = await screen.findByText(message);
// 				expect(errorMessage).toBeInTheDocument();
// 			}
// 		});

// 		it("should have default value if props was passed in", async () => {
// 			render(<MockComponent children={<RegisterForm formConfig={{ name: "user name" }} />} />);
// 			const nameInput = screen.getByRole("textbox", { name: /name/i });
// 			expect(nameInput.value).toBe("user name");
// 		});
// 	});
// });
