import { createContext, useState } from "react";

const AppContext = createContext({
    idForUpdate: 0, setIdForUpdate: (id: number) => {},
    idForDelete: 0, setIdForDelete: (id: number) => {},

    idForEmail: "", setIdForEmail: (id: string) => {},
    showCreateEmail: false, setShowCreateEmail: (val: boolean) => {},

    idForWhatsApp: "", setIdForWhatsApp: (id: string) => {},
    showCreateWhatsApp: false, setShowCreateWhatsApp: (val: boolean) => {},

    idForTaskRunning: 0, setIdForTaskRunning: (id: number) => {},
    idForTaskUpdate: 0, setIdForTaskUpdate: (id: number) => {},
    idForTaskDelete: 0, setIdForTaskDelete: (id: number) => {},
    showCreateTask: false, setShowCreateTask: (val: boolean) => {},
    refetchTask: 0, setRefetchTask: (id: number) => {},
})

const AppProvider = ({children}: any) => {
    const [idForUpdate, setIdForUpdate] = useState(0)
    const [idForDelete, setIdForDelete] = useState(0)

    const [idForEmail, setIdForEmail] = useState("")
    const [showCreateEmail, setShowCreateEmail] = useState(false)

    const [idForWhatsApp, setIdForWhatsApp] = useState("")
    const [showCreateWhatsApp, setShowCreateWhatsApp] = useState(false)

    const [idForTaskRunning, setIdForTaskRunning] = useState(0)
    const [idForTaskUpdate, setIdForTaskUpdate] = useState(0)
    const [idForTaskDelete, setIdForTaskDelete] = useState(0)
    const [showCreateTask, setShowCreateTask] = useState(false)
    const [refetchTask, setRefetchTask] = useState(0)
    
    return (
        <AppContext.Provider value={{
            idForUpdate, setIdForUpdate,
            idForDelete, setIdForDelete,

            idForEmail, setIdForEmail,
            showCreateEmail, setShowCreateEmail,

            idForWhatsApp, setIdForWhatsApp,
            showCreateWhatsApp, setShowCreateWhatsApp,

            idForTaskRunning, setIdForTaskRunning,
            idForTaskUpdate, setIdForTaskUpdate,
            idForTaskDelete, setIdForTaskDelete,
            showCreateTask, setShowCreateTask,
            refetchTask, setRefetchTask,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }