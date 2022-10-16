import "../../../configs/matchMedia";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "../RegisterForm";
import MockComponent from "../../tests/Mock";

/*
    conditions for register form component
    1.) check if validation works (number, email and name)
        - number    =   can only contain number digit
                        starts with 01
        - name      =   can only contain alphabet
        - email     
    2.) should show error message if formats are not right
    3.) form should not submit if formats are not right
    4.) form can only be submitted if all formats are right
    5.) can have optional propValues as default values in form
    6.) propValues should same as form name { number, name, email } 
    7.) when form is submitting button and input fields should be disabled
*/

describe("Form Input Validations", () => {
	describe("Phone Number Input Validations", () => {
		test("Phone number input value cannot have space", async () => {
			render(<MockComponent children={<RegisterForm />} />);
			const textbox = screen.getByRole("textbox", { name: "Phone Number" });
			userEvent.type(textbox, "0123456789 {space}");
			const errorMessage = await screen.findByText("You have entered an invalid phone number");
			expect(errorMessage).toBeInTheDocument();
		});
	});
});
