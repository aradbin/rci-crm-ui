import { useState } from "react"
import { KTCard, KTCardBody } from "../../../_metronic/helpers"
import { userColumns } from "../../columns/userColumns"
import { TableComponent } from "../../components/common/TableComponent"
import { SETTINGS_URL } from "../../helpers/ApiEndpoints"
import { UserCreateForm } from "../../components/forms/UserCreateForm"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { SettingsProvider } from "../../providers/SettingsProvider"
import { SettingsSidebar } from "../../components/settings/SettingsSidebar"

const breadCrumbs = [
    { title: 'Settings', path: '/apps/chat/private-chat', isSeparator: false },
    { isSeparator: true },
]

const SettingsPage = () => {
    const [params, setParams] = useState("")
    const [refetch, setRefetch] = useState(0)
    const [showCreate, setShowCreate] = useState(false)
    const [type, setType] = useState({ label: 'Departments', value: 'department' })

    const toggleShowCreate = (show: boolean) => {
        setShowCreate(show)
    }
    const updateList = () => {
        setRefetch(refetch+1)
    }

    return (
        <SettingsProvider>
            <ToolbarComponent title={type.label} breadCrumbs={breadCrumbs} handleButtonClick={toggleShowCreate}>
            </ToolbarComponent>

            <div className='d-flex flex-column flex-lg-row'>
                <SettingsSidebar type={type} setType={setType} />
                <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
                    <KTCard className="mb-5 mb-xl-8">
                        <KTCardBody className='py-3'>
                            <TableComponent queryKey={type.value} url={SETTINGS_URL} params={`${params}&type=${type.value}`} columns={userColumns} refetch={refetch} />
                        </KTCardBody>
                    </KTCard>
                </div>
            </div>

            <UserCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={updateList} />
        </SettingsProvider>
    )
}

export default SettingsPage;