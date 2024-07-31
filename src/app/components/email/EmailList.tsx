import { useEffect, useState } from "react"
import { EMAIL_URL } from "../../helpers/ApiEndpoints"
import { firstLetterUpperCase, getSettingsFromUserSettings, stringifyRequestQuery } from "../../helpers/Utils"
import { useAuth } from "../../modules/auth"
// import { Query } from "../../helpers/Queries"
import { emailColumns } from "../../columns/emailColumns"
import { folders } from "../../helpers/Variables"
import { ShowEmail } from "./ShowEmail"
import { EmailTable } from "./EmailTable"

const EmailList = ({ filterParams }: any) => {
    const { currentUser } = useAuth()
    const [params, setParams] = useState<any>({...filterParams})
    // const [folder, setFolder] = useState('')
    const [role, setRole] = useState('inbox')

    const getEmailAccount = () => {
        const email = getSettingsFromUserSettings(currentUser?.userSettings, 'email')
        if(email){
            return email?.username
        }

        return ''
    }

    // const foldersQuery = Query(`all-folders-${getEmailAccount()}`, `${EMAIL_URL}/folders?account=${getEmailAccount()}`)

    useEffect(() => {
        const formData = { ...filterParams }
        formData.role = role
        formData.account = getEmailAccount()
        setParams(formData)
    },[filterParams, role])

    return (<>
        <div className="card-header justify-content-end align-items-center gap-2 pb-2">
            {folders?.map((item: any, index: number) => (
                <button key={index} className={`btn btn-sm btn-outline ${item?.value === role ? `btn-${item?.color}` : `btn-outline-${item?.color}`}`} onClick={() => setRole(item?.value)}>
                    {firstLetterUpperCase(item?.label)}
                </button>
            ))}
        </div>
        <div className='card-body py-3'>
            <EmailTable queryKey="email" url={EMAIL_URL} params={stringifyRequestQuery(params)} columns={emailColumns} refetch={1} />
        </div>
        <ShowEmail />
    </>)
}

export default EmailList