import { useState } from "react"
import { KTCard, KTCardBody } from "../../../_metronic/helpers"
import { TableComponent } from "../../components/common/TableComponent"
import { SETTINGS_URL } from "../../helpers/ApiEndpoints"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"
import { SettingsSidebar } from "../../components/settings/SettingsSidebar"
import { settingsColumns } from "../../columns/settingsColumns"
import { SettingCreateForm } from "../../components/forms/SettingCreateForm"

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
        <>
            <ToolbarComponent title={type.label} breadCrumbs={breadCrumbs} handleButtonClick={toggleShowCreate}>
            </ToolbarComponent>
            <div className='d-flex flex-column flex-lg-row'>
                <SettingsSidebar type={type} setType={setType} />
                <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
                    <KTCard className="mb-5 mb-xl-8">
                        <KTCardBody className='py-3'>
                            <TableComponent queryKey={type.value} url={SETTINGS_URL} params={`type=${type.value}`} columns={settingsColumns} refetch={refetch} />
                        </KTCardBody>
                    </KTCard>
                </div>
            </div>
            <SettingCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={updateList} type={type.value} />
        </>
    )
}

export default SettingsPage;