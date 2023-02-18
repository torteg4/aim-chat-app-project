import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';

const LoginPage = props => {

    const { setUser } = useContext(UserContext);

    const [state, setState] = useState({
        register: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        login: {
            email: "",
            password: "",
        }
    })
    const {register, login} = state;
    const navigate = useNavigate();

        // HANDLERS BELOW //        

    const handleRegInputs = (e) => {
        props.setAuthorized("");
    
        setState({...state, register: {...state.register,[e.target.name]: e.target.value}})    
    }

    const handleRegistration = (e) => {
        e.preventDefault()
        
        axios.post("http://localhost:8000/api/register", register, {withCredentials: true})
            .then(res => {
                console.log(res.data.user.username)
                setUser({
                    id: res.data.user.id,
                    firstName: res.data.user.firstName,
                    username: res.data.user.username,
                    room: ""
                })
                
                navigate("/dashboard")

            })
            .catch(err => console.log(err))
    }

    const handleLoginInputs = (e) => {
        props.setAuthorized("");
        setState({...state, login: {...state.login, [e.target.name]: e.target.value}})
    }

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", login, {withCredentials:true})
            .then(res => {
                console.log(res)
                setUser({
                    id: res.data.userInfo.id,
                    firstName: res.data.userInfo.firstName,
                    username: res.data.userInfo.username,
                    room: ""
                })
                navigate("/dashboard")
            })
            .catch(err => console.log(err))
    }


    return (
        <>
        {/* <button onClick={() => navigate("/dashboard")}>Dashboard</button> */}
        <h1 className="text-danger" style={{display:"inline"}}>{props.authorized}</h1>

        <div className="container d-flex justify-content-around p-3 ">

            <form onSubmit={handleRegistration} className="col-md-5 p-3 text-start gap-3">
                <h2>Registration</h2>

                <div className="form-group">
                    <label>First Name</label>
                    <input onChange={handleRegInputs} name="firstName" type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input onChange={handleRegInputs} name="lastName" type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input onChange={handleRegInputs} name="username" type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input onChange={handleRegInputs} name="email" type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={handleRegInputs} name="password" type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input onChange={handleRegInputs} name="confirmPassword" type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary">Register</button>
                </div>
            </form>

            <form onSubmit={handleLogin} className="col-md-5 p-3 text-start gap-3">
                <h2>Login</h2>

                <div className="form-group">
                    <label>Email</label>
                    <input onChange={handleLoginInputs} name="email" type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={handleLoginInputs} name="password" type="text" className="form-control" />
                </div>
                
                <div className="form-group">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default LoginPage;