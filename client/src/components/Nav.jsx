import { NavLink } from "react-router-dom";
import  { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react'
import axios from 'axios';

const Nav = (props) => {
    
    const {socket} = useContext(UserContext);
    const navigate = useNavigate()

    const onLogout = () => {
        axios.get("http://localhost:8000/api/logout", {withCredentials:true})
            .then(() => {
                console.log("Logged out!")
                socket.disconnect();
                navigate("/")
            })
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav flex-row align-items-center gap-3">
                        <li className="nav-item">
                            <h3 className="text-light navbar-brand">Dojo Chat</h3>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/"}>
                                Login Page
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/dashboard"}>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink>
                                <button onClick = {() => onLogout()}>Logout</button>
                            </NavLink>
                        </li>


                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Nav;