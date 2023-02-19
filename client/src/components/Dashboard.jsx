import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import StatusList from './StatusList';

const Dashboard = props => {
    const {user, socket} = useContext(UserContext);
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState([]);
    // const [status, setStatus] = useState("");
    // const [statusList, setStatusList] = useState([]);

    useEffect (() => {
        if (user.id === 0) {
            props.setAuthorized("You have to be logged in to view that page");
            navigate("/")
        }
        socket.on("message_received", (data) => {
            console.log("Emitting to chat")
            setMessages ((prevState) => [...prevState, data])
        })
        return () => socket.off("message_received")
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("Sending message....")
        socket.emit("send_message", {
            user: user.username,
            message: currentMessage
        },
        // console.log(user)
        );
    }

    return (
        <>
        <div className="d-flex p-2">

        <div className="instant-messenger">
            
            <p className = "header">{user.username} - Instant Messenger</p>

            <div className="message-list">
                <span className="nav__warning-level">
                    {user.username}'s Warning Level: 0%
                </span>
            
                <div className="message-list__container" >
                    
                    {messages.map((m, i) => (
                        
                        <p className ="message-item" key={i}>
                            <span className = "message-item__username">
                                {m.user === user.username ? "You" : m.user}:
                            </span>
                            <span>
                                {m.message}
                            </span>
                        </p>
                    ))}
                </div>
            </div>

            <form 
                onSubmit={sendMessage}
                className="message-form">
                <div>
                    <input 
                        type="text" 
                        onChange={(e) => setCurrentMessage(e.target.value)} className="message-form__textarea" />
                </div>
                <div className="message-form__actions">
                    <button className="message-form__submit"/>
                </div>
            </form>

            {/* <Link to={"/statuses"}> Show all users</Link> */}
        </div>

        <StatusList />

        </div>

    </>
    )
}

export default Dashboard;