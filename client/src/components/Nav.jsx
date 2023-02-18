import { NavLink } from "react-router-dom";

const Nav = (props) => {
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
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Nav;