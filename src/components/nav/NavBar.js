import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { Login } from "../auth/Login"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/programs">Programs</Link>
            </li>
            {
                localStorage.getItem("user")
                ?
                    <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="/login" onClick={() => {
                            localStorage.removeItem("user")
                            
                        }}>Logout</Link>
                    </li>
                : <li className="navbar__item navbar__logout"><Link className="navbar__link" to="/login">Login</Link></li>
            }
        </ul>
    )
}