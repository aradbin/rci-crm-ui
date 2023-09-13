import { useState } from "react"
import { KTCard, KTCardBody } from "../../../_metronic/helpers"
import { userColumns } from "../../columns/userColumns"
import { TableComponent } from "../../components/common/TableComponent"
import { USERS_URL } from "../../helpers/ApiEndpoints"
import { UserProvider } from "../../providers/UserProvider"
import { UserCreateForm } from "../../components/forms/UserCreateForm"
import { ToolbarComponent } from "../../components/common/ToolbarComponent"

const breadCrumbs = [
    { title: 'User Management', path: '/users', isSeparator: false },
    { isSeparator: true },
]

const UsersPage = () => {
    const [params, setParams] = useState("")
    const [refetch, setRefetch] = useState(0)
    const [showCreate, setShowCreate] = useState(false)

    const toggleShowCreate = (show: boolean) => {
        setShowCreate(show)
    }
    const updateList = () => {
        setRefetch(refetch+1)
    }

    return (
        <UserProvider>
            <ToolbarComponent title="Users" breadCrumbs={breadCrumbs} handleButtonClick={toggleShowCreate}>
            </ToolbarComponent>
            <KTCard className="mb-5 mb-xl-8">
                <KTCardBody className='py-3'>
                    <TableComponent queryKey="users" url={USERS_URL} params={params} columns={userColumns} refetch={refetch} />
                </KTCardBody>
            </KTCard>
            <UserCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={updateList} />
        </UserProvider>
    )
}

export default UsersPage;