import "../../../configs/matchMedia";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "../RegisterForm";
import MockComponent from "../../tests/Mock";
import checkInputFormat from "../../../utils/misc/validation";

it("should not show anything if no form config prop was passed", async () => {
	render(<MockComponent children={<RegisterForm />} />);
});
