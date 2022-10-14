import { useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { showError } from "../../redux/slices/errorSlice";
import checkInputFormat from "../../utils/misc/verification";
import authApi from "../../services/user/auth";

const RegisterForm = ({ propValues }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const validator = async (rule, value) => {
		const { result, message } = checkInputFormat({ [rule.field]: value });
		if (!result) return Promise.reject(new Error(message));
	};

	const submitForm = useCallback(async values => {
		if (!loading) {
			const sendData = {
				...values
			};
			// add your additional send data below values

			setLoading(true);
			try {
				const res = await authApi.register(sendData);
				setLoading(false);
				// add your success handling here //
			} catch (error) {
				setLoading(false);
				dispatch(showError(error.response.data.error));
			}
		}
	}, []);

	return (
		<Form
			name="register-form"
			id="register-form"
			className="register-form"
			layout="vertical"
			onFinish={submitForm}
			onFinishFailed={e => console.log("submit fail", e.errorFields)}
			disabled={loading}
			initialValues={propValues}
		>
			<Form.Item
				label="Name"
				name="name"
				htmlFor="name"
				rules={[
					{ validator },
					{
						required: true,
						message: "Name is required"
					}
				]}
			>
				<Input type="text" name="name" id="name" required />
			</Form.Item>

			<Form.Item label="Email" name="email" htmlFor="email" rules={[{ validator }]}>
				<Input type="email" id="email" name="email" />
			</Form.Item>

			<Form.Item
				label="Phone Number"
				name="number"
				htmlFor="number"
				rules={[
					{ validator },
					{
						required: true,
						message: "Phone Number is required"
					}
				]}
			>
				<Input type="text" id="number" name="number" required />
			</Form.Item>

			<Form.Item>
				<Button htmlType="submit" block loading={loading}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default RegisterForm;
