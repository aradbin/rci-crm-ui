import { useContext, useEffect } from "react"
import { SocketContext } from "../../providers/SocketProvider"
import { io } from "socket.io-client";
import { BASE_URL } from "../../helpers/ApiEndpoints";
import { useAuth } from "../../modules/auth";
import { useQueryClient } from "react-query";

const SocketComponent = () => {
    const { setSocket, setMessages, setWhatsApp, setVoip } = useContext(SocketContext)
    const queryClient = useQueryClient()
    const { currentUser } = useAuth()

    useEffect(() => {
      // socket to server
      const socketInstance = io(BASE_URL, {
        query: {
          userId: currentUser?.id
        }
      })

      socketInstance.on('connect', () => {
        console.log('Connected to server');
      })

      setSocket(socketInstance)

      socketInstance.on('message', (response: any) => {
        setMessages(prevMessages => {
          const currentMessages = [...prevMessages]
          currentMessages.unshift(response)
          return currentMessages
        })
      })

      socketInstance.on('voip', (response: any) => {
        setVoip(response)
      })

      socketInstance.on('whatsapp', (response: any) => {
        queryClient.invalidateQueries({ queryKey: [`all-whatsapp-${response?.account_id}`] })
        queryClient.invalidateQueries({ queryKey: [`whatsapp-${response?.chat_id}`] })
      })
        
      return () => {
        socketInstance.disconnect();
        console.log('Disconnected from server')
      };
    },[])

    return null;
}

export default SocketComponent