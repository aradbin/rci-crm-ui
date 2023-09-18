import { createContext, useState } from "react";

const UserContext = createContext({
    idForUpdate: 0,
    setIdForUpdate: (id: number) => {},
    idForEmail: "",
    setIdForEmail: (id: string) => {},
    idForDelete: 0,
    setIdForDelete: (id: number) => {},
})

const UserProvider = ({children}: any) => {
    const [idForUpdate, setIdForUpdate] = useState(0)
    const [idForEmail, setIdForEmail] = useState("")
    const [idForDelete, setIdForDelete] = useState(0)
    
    return (
        <UserContext.Provider value={{
            idForUpdate,
            setIdForUpdate,
            idForEmail,
            setIdForEmail,
            idForDelete,
            setIdForDelete,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }