import RegisterForm from "./RegisterForm";

const AuthForm = ({ authType, propValues }) => {
	switch (authType) {
		case "REGISTER":
			return <RegisterForm propValues={propValues} />;

		case "LOGIN":
			return;

		case "VERIFICATION":
			return;

		default:
			return;
	}
};

export default AuthForm;
