import { useContext } from "react"
import { KTCard, KTCardBody, KTIcon } from "../../../_metronic/helpers"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { AppContext } from "../../providers/AppProvider"
import EmailList from "../../components/email/EmailList"

const breadCrumbs = [
    { title: 'Email', path: '/email', isSeparator: false },
    { isSeparator: true },
]

const EmailPage = () => {
    const { setShowCreateEmail } = useContext(AppContext)

    const toggleShowCreate = (show: boolean) => {
        setShowCreateEmail(show)
    }

    return (
        <>
            <ToolbarComponent title="Email Inbox" breadCrumbs={breadCrumbs} handleButtonClick={toggleShowCreate} />
            <KTCard className="mb-5 mb-xl-8">
                <KTCardBody className='py-3'>
                    <EmailList />
                </KTCardBody>
            </KTCard>
        </>
    )
}

export default EmailPage;