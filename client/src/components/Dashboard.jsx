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
        <h1 className = "header">{user.firstName} - Instant Messenger</h1>

        <div className="instant-messenger">

            <div className="message-list__container" >
                
                {messages.map((m, i) => (
                    
                    <p className ="message-item__other" key={i}>{m.user === user.username ? "You" : m.user}: {m.message}</p>
                ))}
            </div>

            <form 
                onSubmit={sendMessage}
                className="message-form">
                <div>
                    <input 
                        type="text" 
                        onChange={(e) => setCurrentMessage(e.target.value)} className="message-form__textarea" />
                    <button className="message-form__submit"/>
                </div>
            </form>

            {/* <Link to={"/statuses"}> Show all users</Link> */}
        </div>

        <StatusList />
    </>
    )
}

export default Dashboard;