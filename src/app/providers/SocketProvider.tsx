import { Socket } from "socket.io-client";
import { createContext, useState } from "react";

interface SocketContextProps {
    socket: Socket | null; setSocket: (instance: Socket | null) => void;
    messages: any[]; setMessages: (arr: any) => void;
    whatsapp: any[]; setWhatsApp: (arr: any) => void;
    voip: any; setVoip: (val: any) => void;
}

const SocketContext = createContext<SocketContextProps>({
    socket: null, setSocket: () => {},
    messages: [], setMessages: () => {},
    whatsapp: [], setWhatsApp: () => {},
    voip: null, setVoip: () => {},
})

const SocketProvider = ({children}: any) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<any>([]);
    const [whatsapp, setWhatsApp] = useState<any>([]);
    const [voip, setVoip] = useState<any>(null);
    
    return (
        <SocketContext.Provider value={{
            socket, setSocket,
            messages, setMessages,
            whatsapp, setWhatsApp,
            voip, setVoip,
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketProvider, SocketContext }