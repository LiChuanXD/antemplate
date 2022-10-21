import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import VerificationForm from "./VerificationForm";

const AuthForm = ({ authType, formConfig }) => {
	switch (authType) {
		case "REGISTER":
			return <RegisterForm formConfig={formConfig} />;

		case "LOGIN":
			return <LoginForm formConfig={formConfig} />;

		case "VERIFICATION":
			return <VerificationForm formConfig={formConfig} />;

		default:
			return;
	}
};

export default AuthForm;
