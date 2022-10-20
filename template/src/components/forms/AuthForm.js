import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const AuthForm = ({ authType, formConfig }) => {
	switch (authType) {
		case "REGISTER":
			return <RegisterForm formConfig={formConfig} />;

		case "LOGIN":
			return <LoginForm formConfig={formConfig} />;

		case "VERIFICATION":
			return;

		default:
			return;
	}
};

export default AuthForm;
