import RegisterForm from "./RegisterForm";

const AuthForm = ({ authType, formConfig }) => {
	switch (authType) {
		case "REGISTER":
			return <RegisterForm formConfig={formConfig} />;

		case "LOGIN":
			return;

		case "VERIFICATION":
			return;

		default:
			return;
	}
};

export default AuthForm;
