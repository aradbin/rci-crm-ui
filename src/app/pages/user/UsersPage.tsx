import { useState } from "react"
import { KTCard, KTCardBody, KTIcon } from "../../../_metronic/helpers"
import { userColumns } from "../../columns/userColumns"
import { TableComponent } from "../../components/common/TableComponent"
import { USERS_URL } from "../../helpers/ApiEndpoints"
import { UserProvider } from "../../providers/UserProvider"
import { UserCreateForm } from "../../components/forms/UserCreateForm"

const UserToolbar = ({toggleShow}: any) => {
    return (
        <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bold fs-3 mb-1'>Users List</span>
            </h3>
            <div className='card-toolbar'>
                <button className='btn btn-sm btn-light-primary' onClick={() => toggleShow(true)}>
                    <KTIcon iconName='plus' className='fs-3' /> Create User
                </button>
            </div>
        </div>
    );
}

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
            <KTCard className="mb-5 mb-xl-8">
                <UserToolbar toggleShow={toggleShowCreate} />
                <KTCardBody className='py-3'>
                    <TableComponent queryKey="users" url={USERS_URL} params={params} columns={userColumns} refetch={refetch} />
                </KTCardBody>
            </KTCard>
            <UserCreateForm show={showCreate} toggleShow={toggleShowCreate} updateList={updateList} />
        </UserProvider>
    )
}

export default UsersPage;