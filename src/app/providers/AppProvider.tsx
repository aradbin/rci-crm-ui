import { createContext, useState } from "react";

const AppContext = createContext({
    users: [], setUsers: (arr: []) => {},
    customers: [], setCustomers: (arr: []) => {},
    contacts: [], setContacts: (arr: []) => {},
    settings: [], setSettings: (arr: []) => {},

    idForDetails: 0, setIdForDetails: (id: number) => {},
    idForUpdate: 0, setIdForUpdate: (id: number) => {},
    idForDelete: 0, setIdForDelete: (id: number) => {},

    idForEmail: "", setIdForEmail: (id: string) => {},
    showCreateEmail: false, setShowCreateEmail: (val: boolean) => {},

    idForWhatsApp: "", setIdForWhatsApp: (id: string) => {},
    showCreateWhatsApp: false, setShowCreateWhatsApp: (val: boolean) => {},

    idForVoipDetails: 0, setIdForVoipDetails: (id: number) => {},
    idForVoipUpdate: 0, setIdForVoipUpdate: (id: number) => {},

    idForTaskRunning: 0, setIdForTaskRunning: (id: number) => {},
    idForTaskUpdate: 0, setIdForTaskUpdate: (id: number) => {},
    idForTaskDelete: 0, setIdForTaskDelete: (id: number) => {},
    showCreateTask: false, setShowCreateTask: (val: boolean) => {},
    showCreateSubTask: 0, setShowCreateSubTask: (val: number) => {},
    refetchTask: 0, setRefetchTask: (id: number) => {},

    idForCustomerServiceCreate: 0, setIdForCustomerServiceCreate: (id: number) => {},
    idForCustomerServiceUpdate: 0, setIdForCustomerServiceUpdate: (id: number) => {},

    idForCustomerContactUpdate: 0, setIdForCustomerContactUpdate: (id: number) => {},
})

const AppProvider = ({children}: any) => {
    const [users, setUsers] = useState([])
    const [customers, setCustomers] = useState([])
    const [contacts, setContacts] = useState([])
    const [settings, setSettings] = useState([])

    const [idForDetails, setIdForDetails] = useState(0)
    const [idForUpdate, setIdForUpdate] = useState(0)
    const [idForDelete, setIdForDelete] = useState(0)

    const [idForEmail, setIdForEmail] = useState("")
    const [showCreateEmail, setShowCreateEmail] = useState(false)

    const [idForWhatsApp, setIdForWhatsApp] = useState("")
    const [showCreateWhatsApp, setShowCreateWhatsApp] = useState(false)

    const [idForVoipDetails, setIdForVoipDetails] = useState(0)
    const [idForVoipUpdate, setIdForVoipUpdate] = useState(0)

    const [idForTaskRunning, setIdForTaskRunning] = useState(0)
    const [idForTaskUpdate, setIdForTaskUpdate] = useState(0)
    const [idForTaskDelete, setIdForTaskDelete] = useState(0)
    const [showCreateTask, setShowCreateTask] = useState(false)
    const [showCreateSubTask, setShowCreateSubTask] = useState(0)
    const [refetchTask, setRefetchTask] = useState(0)

    const [idForCustomerServiceCreate, setIdForCustomerServiceCreate] = useState(0)
    const [idForCustomerServiceUpdate, setIdForCustomerServiceUpdate] = useState(0)

    const [idForCustomerContactUpdate, setIdForCustomerContactUpdate] = useState(0)
    
    return (
        <AppContext.Provider value={{
            users, setUsers,
            customers, setCustomers,
            contacts, setContacts,
            settings, setSettings,

            idForDetails, setIdForDetails,
            idForUpdate, setIdForUpdate,
            idForDelete, setIdForDelete,

            idForEmail, setIdForEmail,
            showCreateEmail, setShowCreateEmail,

            idForWhatsApp, setIdForWhatsApp,
            showCreateWhatsApp, setShowCreateWhatsApp,

            idForVoipDetails, setIdForVoipDetails,
            idForVoipUpdate, setIdForVoipUpdate,

            idForTaskRunning, setIdForTaskRunning,
            idForTaskUpdate, setIdForTaskUpdate,
            idForTaskDelete, setIdForTaskDelete,
            showCreateTask, setShowCreateTask,
            showCreateSubTask, setShowCreateSubTask,
            refetchTask, setRefetchTask,

            idForCustomerServiceCreate, setIdForCustomerServiceCreate,
            idForCustomerServiceUpdate, setIdForCustomerServiceUpdate,

            idForCustomerContactUpdate, setIdForCustomerContactUpdate,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }