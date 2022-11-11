import "../../../configs/matchMedia";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import SubmitReceipt from "../SubmitReceipt";
import TwoPagesUploadReceipt from "../TwoPagesUploadReceipt";
import MockComponent from "../../tests/Mock";

// todo
// 1. check all inputs exist
// 2. if click submit button check all data there
// block the double submit when loading

describe("Receipt Upload Submit Button", () => {
  it("Should render correct submit button text", async () => {
    render(
      <MockComponent
        children={<SubmitReceipt receiptConfig={{ btnText: "Submit" }} />}
      />
    );
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.innerHTML).toMatch(/submit/i);
  });

  it("Should show additional element in the form", async () => {
    const receiptConfig = {
      addElement: <h1>Hello</h1>,
    };
    render(
      <MockComponent
        children={<SubmitReceipt receiptConfig={receiptConfig} />}
      />
    );
    const additionalElement = screen.getByRole("heading", { name: "Hello" });
    expect(additionalElement).toBeInTheDocument();
  });
});

it("should call button onClick if being clicked", () => {
  const submitFunc = jest.fn();
  const { queryByText } = render(
    <SubmitReceipt receiptConfig={{}} onFinish={submitFunc} />
  );

  const button = queryByText("Submit");

  fireEvent.click(button);

  expect(submitFunc).toHaveBeenCalledTimes(1);
});
