import { NavLink } from "react-router-dom";
import  { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react'
import axios from 'axios';

const Nav = (props) => {

    const {setUser, socket} = useContext(UserContext);
    const navigate = useNavigate()

    const onLogout = () => {
        axios.get("http://localhost:8000/api/logout", {withCredentials:true})
            .then(() => {
                console.log("Logged out!")
                socket.disconnect();
                // window.location.reload(false);
                setUser({
                    id: 0,
                    username: "",
                    room: ""
                })
                navigate("/")
            })
    }

    return (
        <>
            <nav className="customize-row">
                <div className="flex-row align-items-center gap-3">
                    <ul className="navbar-nav flex-row align-items-center gap-3">
                        <li className="nav-item">
                            <span className="nav-link"> <strong>CDIM</strong></span>
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
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                onClick = {() => onLogout()}>
                                        <em><strong> Log Out </strong></em>
                            </NavLink>
                        </li>


                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Nav;