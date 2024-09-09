import { useEffect, useState } from "react"
import { EMAIL_UNIPILE_URL } from "../../helpers/ApiEndpoints"
import { firstLetterUpperCase, getSettingsFromUserSettings, stringifyRequestQuery } from "../../helpers/Utils"
import { useAuth } from "../../modules/auth"
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
        return getSettingsFromUserSettings(currentUser?.userSettings, 'email')?.unipile_account_id
    }

    // const foldersQuery = QueryUnipile(`all-folders-${getEmailAccount()}`, `${UNIPILE_BASE_URL}/folders?account=${getEmailAccount()}`)

    useEffect(() => {
        const formData: any = {
            account_id: getEmailAccount(),
            limit: 20,
            role: role
        }
        if(filterParams?.any_email){
            formData.any_email = filterParams?.any_email
        }
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
            {params?.account_id && <EmailTable queryKey={`all-email-${getEmailAccount()}`} url={EMAIL_UNIPILE_URL} params={stringifyRequestQuery(params)} columns={emailColumns} refetch={1} />}
        </div>
        <ShowEmail />
    </>)
}

export default EmailList