import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';


const StatusList = (props) => {

    const {user, setUser} = useContext(UserContext);
    const [status, setStatus] = useState("");
    const [statusList, setStatusList] = useState([]);

    // useEffect(()=> {
    //     if (user.id !== 0) {
    //         axios.get("http://localhost:8000/api/users")
    //         .then((res) => {
    //             console.log(res.data)
    //             setStatusList(res.data)
    //         })
    //         .catch((err) => console.log(err))
    //     }
        
    // })

    useEffect(() => {
        axios.get("http://localhost:8000/api/users", {withCredentials:true} )
        .then((res) => {
            console.log(res.data)
            setStatusList(res.data)
        })
        .catch((err) => console.log(err))
    }, [])

    
    
    return (
    <>
    <div className="border p-3 border-dark text-start bg-light h-100">
        <h4>Statuses:</h4>
        <table>
            <tr>
                <th>User</th>
                <th>Status</th>
            </tr>
            {statusList.length > 0 && statusList.map ((status, i) => 
                <tr>
                    <td>{user.username}</td>
                    <td>{user.status}</td>
                </tr>
            )}
        </table>
    </div>
    </>
    )
}

export default StatusList;