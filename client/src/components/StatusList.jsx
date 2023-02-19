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
    <div className="buddy-list">

        <p className="header">Friends List</p>
        <form onSubmit = { onUpdateHandler } className="status-form">
            <div className="status-form__container">
                <label>Status: </label>
                <input 
                    onChange = {(e)=> setStatus(e.target.value)}
                    type="text"
                    value={status}
                    />
                <button className="status-form__submitButton">Update</button>
            </div>
        </form>

        <div className="status-list">

        <div className="status-list__container">

            {statusList.length > 0 && statusList.map ((user, i) => 
            <div className="statuses">
                    <p className="status-username">{user.username}</p>
                    <p>{user.status}</p>
            </div>
            )}
            </div>
        </div>
    </div>
    </>
    )
}

export default StatusList;