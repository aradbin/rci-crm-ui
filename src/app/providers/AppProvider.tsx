import { createContext, useState } from "react";

const AppContext = createContext({
    idForUpdate: 0,
    setIdForUpdate: (id: number) => {},
    idForEmail: "",
    setIdForEmail: (id: string) => {},
    idForDelete: 0,
    setIdForDelete: (id: number) => {},
    showCreateEmail: false,
    setShowCreateEmail: (val: boolean) => {},
})

const AppProvider = ({children}: any) => {
    const [idForUpdate, setIdForUpdate] = useState(0)
    const [idForEmail, setIdForEmail] = useState("")
    const [idForDelete, setIdForDelete] = useState(0)
    const [showCreateEmail, setShowCreateEmail] = useState(false)
    
    return (
        <AppContext.Provider value={{
            idForUpdate,
            setIdForUpdate,
            idForEmail,
            setIdForEmail,
            idForDelete,
            setIdForDelete,
            showCreateEmail,
            setShowCreateEmail,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }