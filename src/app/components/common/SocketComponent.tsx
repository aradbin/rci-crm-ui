import { useContext, useEffect } from "react"
import { SocketContext } from "../../providers/SocketProvider"
import { io } from "socket.io-client";
import { BASE_URL, BASE_URL_COMMUNICATION } from "../../helpers/ApiEndpoints";
import { useAuth } from "../../modules/auth";

const SocketComponent = () => {
    const { setSocket, setSocketCommunication, setMessages, setWhatsApp, setVoip } = useContext(SocketContext)
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

      // socket to communication server
      const socketCommunicationInstance = io(BASE_URL_COMMUNICATION, {
        query: {
          userId: currentUser?.id
        }
      })

      socketCommunicationInstance.on('connect', () => {
        console.log('Connected to communication');
      })

      setSocketCommunication(socketCommunicationInstance)
      
      socketCommunicationInstance.on('whatsapp', (response: any) => {
        setWhatsApp(prevMessages => {
          const currentMessages = [...prevMessages]
          if(currentMessages[currentMessages.length - 1]?.chat_id === response?.chat_id){
            currentMessages.unshift({
              is_sender: 0,
              text: response?.message,
            }) 
          }
          return currentMessages
        })
      })
        
      return () => {
        socketInstance.disconnect();
        socketCommunicationInstance.disconnect();
        console.log('Disconnected from server')
      };
    },[])

    return null;
}

export default SocketComponent