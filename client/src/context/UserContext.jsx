import { useState, createContext } from 'react';
import io from 'socket.io-client';

const socket = io(":8000")
const UserContext = createContext();

const UserProvider = ({ children }) => {
    
    const [user, setUser] = useState({
        id: 0,
        username: "",
        room: ""
    });
    
    return (
        <UserContext.Provider value={{ user, setUser, socket }}>
            {children}
        </UserContext.Provider>
    );
}

export  { UserProvider, UserContext }
