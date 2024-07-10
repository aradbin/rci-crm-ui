import { useContext, useState } from "react"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { ChatBox } from "../../components/whatsapp/ChatBox"
import { AppContext } from "../../providers/AppProvider"

const breadCrumbs = [
    { title: 'WhatsApp', path: '/whatsapp', isSeparator: false },
    { isSeparator: true },
]

const WhatsAppPage = () => {
    const [refetch, setRefetch] = useState(0)

    const { setShowCreateWhatsApp } = useContext(AppContext)

    return (
        <>
            <ChatBox />
        </>
    )
}

export default WhatsAppPage;