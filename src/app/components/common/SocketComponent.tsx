import { useContext, useEffect } from "react"
import { SocketContext } from "../../providers/SocketProvider"
import { io } from "socket.io-client";
import { BASE_URL } from "../../helpers/ApiEndpoints";
import { useAuth } from "../../modules/auth";

const SocketComponent = () => {
    const { setSocket, messages, setMessages } = useContext(SocketContext)
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
            const currentMessages = messages
            const conversationIndex = currentMessages.findIndex(item => item?.id === response?.conversation_id)
            if(conversationIndex !== -1){
                currentMessages[conversationIndex] = {
                    ...currentMessages[conversationIndex],
                    messages: [...currentMessages[conversationIndex].messages, response]
                }
            }else{
                currentMessages.push({
                    id: response?.conversation_id,
                    messages: [{...response}]
                })
            }
            setMessages(currentMessages)
            // setMessages(prevMessages => {
            //     const currentMessages = { ...prevMessages };
            //     const conversationId = response?.conversation_id;
            //     currentMessages[conversationId] = [
            //         ...(currentMessages[conversationId] || []),
            //         { ...response }
            //     ];
            //     return currentMessages;
            // });
        });
    
        setSocket(socketInstance)
    
        return () => {
          socketInstance.disconnect();
          console.log('Disconnected from server')
        };
    },[])

    return null;
}

export default SocketComponent