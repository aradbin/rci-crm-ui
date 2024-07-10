import { useContext, useEffect } from "react"
import { SocketContext } from "../../providers/SocketProvider"
import { io } from "socket.io-client";
import { BASE_URL } from "../../helpers/ApiEndpoints";
import { useAuth } from "../../modules/auth";

const SocketComponent = () => {
    const { setSocket, setMessages, setWhatsApp, setVoip } = useContext(SocketContext)
    const { currentUser } = useAuth()

    useEffect(() => {
        const socketInstance = io(BASE_URL, {
          query: {
            userId: currentUser?.id
          }
        })
    
        socketInstance.on('connect', () => {
          console.log('Connected to server');
        })
    
        socketInstance.on('message', (response: any) => {
          setMessages(prevMessages => {
            const currentMessages = [...prevMessages]
            currentMessages.unshift(response)
            return currentMessages
          })
        })

        socketInstance.on('whatsapp', (response: any) => {
          setWhatsApp(prevMessages => {
            const currentMessages = [...prevMessages]
            currentMessages.unshift(response)
            return currentMessages
          })
        })

        socketInstance.on('voip', (response: any) => {
            setVoip(response)
        })
    
        setSocket(socketInstance)
    
        return () => {
          socketInstance.disconnect();
          console.log('Disconnected from server')
        };
    },[])

    return null;
}

export default SocketComponent