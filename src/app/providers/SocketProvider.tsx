import { Socket } from "socket.io-client";
import { createContext, useState } from "react";

interface SocketContextProps {
    socket: Socket | null;
    setSocket: (instance: Socket | null) => void;
    messages: any[];
    setMessages: (arr: any) => void;
}

const SocketContext = createContext<SocketContextProps>({
    socket: null, setSocket: () => {},
    messages: [], setMessages: () => {},
})

const SocketProvider = ({children}: any) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<any>([]);
    
    return (
        <SocketContext.Provider value={{
            socket, setSocket,
            messages, setMessages,
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketProvider, SocketContext }