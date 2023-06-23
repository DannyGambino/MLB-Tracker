import { Route, Routes } from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./App.css"
import { ApplicationViews } from "./Views/ApplicationViews"


export const App = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={

			<>
				<NavBar />
				<ApplicationViews/>
			</>
		} />
	</Routes>
}

