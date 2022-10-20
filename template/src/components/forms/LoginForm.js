import { useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { showError } from "../../redux/slices/errorSlice";
import checkInputFormat from "../../utils/misc/validation";
import authApi from "../../services/user/auth";

const LoginForm = () => {
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
				const res = await authApi.login(sendData);
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
			name="login-form"
			id="login-form"
			className="login-form form"
			layout="vertical"
			onFinish={submitForm}
			onFinishFailed={e => console.log("submit fail", e.errorFields)}
			disabled={loading}
			aria-label="form"
		>
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
				className="form-group"
			>
				<Input type="text" id="number" name="number" className="login-form-input form-input" required />
			</Form.Item>

			<Form.Item className="form-group">
				<Button htmlType="submit" block loading={loading} id="login-form-submit-btn" className="form-submit-btn">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default LoginForm;
