import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import "./App.css";

import ErrorPopup from "./components/modals/ErrorPopup";

/* 
	update your not found route path to your root path
	put any of your routes above of not found route
*/
const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<h1>Your Landing Page</h1>} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>

			<ErrorPopup />
		</div>
	);
};

export default App;
