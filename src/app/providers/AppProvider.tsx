import { createContext, useState } from "react";

const AppContext = createContext({
    idForUpdate: 0, setIdForUpdate: (id: number) => {},
    idForDelete: 0, setIdForDelete: (id: number) => {},

    idForEmail: "", setIdForEmail: (id: string) => {},
    showCreateEmail: false, setShowCreateEmail: (val: boolean) => {},

    idForTaskUpdate: 0, setIdForTaskUpdate: (id: number) => {},
    idForTaskDelete: 0, setIdForTaskDelete: (id: number) => {},
    showCreateTask: false, setShowCreateTask: (val: boolean) => {},
})

const AppProvider = ({children}: any) => {
    const [idForUpdate, setIdForUpdate] = useState(0)
    const [idForDelete, setIdForDelete] = useState(0)

    const [idForEmail, setIdForEmail] = useState("")
    const [showCreateEmail, setShowCreateEmail] = useState(false)

    const [idForTaskUpdate, setIdForTaskUpdate] = useState(0)
    const [idForTaskDelete, setIdForTaskDelete] = useState(0)
    const [showCreateTask, setShowCreateTask] = useState(false)
    
    return (
        <AppContext.Provider value={{
            idForUpdate, setIdForUpdate,
            idForDelete, setIdForDelete,

            idForEmail, setIdForEmail,
            showCreateEmail, setShowCreateEmail,

            idForTaskUpdate, setIdForTaskUpdate,
            idForTaskDelete, setIdForTaskDelete,
            showCreateTask, setShowCreateTask,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }