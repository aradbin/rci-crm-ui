import { createContext, useState } from "react";

const SettingsContext = createContext({
    idForUpdate: 0,
    setIdForUpdate: (id: number) => {},
    idForDelete: 0,
    setIdForDelete: (id: number) => {},
})

const SettingsProvider = ({children}: any) => {
    const [idForUpdate, setIdForUpdate] = useState(0)
    const [idForDelete, setIdForDelete] = useState(0)
    
    return (
        <SettingsContext.Provider value={{
            idForUpdate,
            setIdForUpdate,
            idForDelete,
            setIdForDelete,
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

export { SettingsProvider, SettingsContext }