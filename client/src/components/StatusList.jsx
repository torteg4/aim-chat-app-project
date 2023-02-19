import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate, useParams } from 'react-router-dom';


const StatusList = (props) => {

    const {user, socket} = useContext(UserContext);
    const [status, setStatus] = useState("");
    const [statusList, setStatusList] = useState([]);

    useEffect(() => {
        // console.log(user)
        axios.get("http://localhost:8000/api/users", {withCredentials:true} )
        .then((res) => {
            console.log(res.data)
            setStatusList(res.data)
        })
        .catch((err) => console.log(err))
    }, [])
    
    const updateFromDom = (data) => {
        const {userId, updatedStatus} = data; 
        console.log(statusList);
        setStatusList(prevList => prevList.map((u, i) => {
            if (u._id === userId) {
                u.status = updatedStatus
            }
            return u;
        }
        ))
    }

    useEffect(() => {
        socket.on("status_updated", (data) => {
            console.log("updated status emitting")
            updateFromDom(data)
        })
        return () => socket.off("status_updated")
    }, [updateFromDom])

    

    const onUpdateHandler = (e) => {
        e.preventDefault()

        const newUserStatus = {
            status
        }
        // const userId = user.id
        // console.log("-------------", user.id)
        axios.put("http://localhost:8000/api/update/" + user.id, newUserStatus)
        .then(() => {
            console.log("Successful STATUS update")
            socket.emit("update_status", {
                userId: user.id,
                updatedStatus: status
            })
        })
        .catch((err) => console.log(err))
    }

    return (
    <>
    <div className="instant-messenger">

        <p className="header">Friends List</p>
        
        <form onSubmit = { onUpdateHandler } className="message-form">
            <div>
                <label>Status: </label>
                <input 
                    onChange = {(e)=> setStatus(e.target.value)}
                    type="text"
                    value={status}
                    />
                <button className="status-form__submit">Update</button>
            </div>
        </form>

        <table>
            <tr>
                <th>User</th>
                <th>Status</th>
            </tr>
            {statusList.length > 0 && statusList.map ((user, i) => 
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