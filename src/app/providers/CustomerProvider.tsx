import { createContext, useState } from "react";

const CustomerContext = createContext({
    idForUpdate: 0,
    setIdForUpdate: (id: number) => {},
    idForEmail: "",
    setIdForEmail: (id: string) => {},
    idForDelete: 0,
    setIdForDelete: (id: number) => {},
})

const CustomerProvider = ({children}: any) => {
    const [idForUpdate, setIdForUpdate] = useState(0)
    const [idForEmail, setIdForEmail] = useState("")
    const [idForDelete, setIdForDelete] = useState(0)
    
    return (
        <CustomerContext.Provider value={{
            idForUpdate,
            setIdForUpdate,
            idForEmail,
            setIdForEmail,
            idForDelete,
            setIdForDelete,
        }}>
            {children}
        </CustomerContext.Provider>
    )
}

export { CustomerProvider, CustomerContext }