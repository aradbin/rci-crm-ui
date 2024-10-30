import { useEffect, useState } from "react"
import { EMAIL_UNIPILE_URL } from "../../helpers/ApiEndpoints"
import { firstLetterUpperCase, getSettingsFromUserSettings } from "../../helpers/Utils"
import { useAuth } from "../../modules/auth"
import { emailColumns } from "../../columns/emailColumns"
import { folders } from "../../helpers/Variables"
import { ShowEmail } from "./ShowEmail"
import { EmailTable } from "./EmailTable"

const EmailList = ({ filterParams }: any) => {
  const { currentUser } = useAuth()
  const [params, setParams] = useState<any>({...filterParams})
  const [role, setRole] = useState('inbox')
  const [account, setAccount] = useState(getSettingsFromUserSettings(currentUser?.userSettings, 'email')[0]?.unipile_account_id)
  // const [folder, setFolder] = useState('')

  // const foldersQuery = QueryUnipile(`all-folders-${getEmailAccount()}`, `${UNIPILE_BASE_URL}/folders?account=${getEmailAccount()}`)

  useEffect(() => {
    const formData: any = {
      account_id: account,
      limit: 20,
      role: role
    }
    if(filterParams?.any_email){
      formData.any_email = filterParams?.any_email
    }
    setParams(formData)
  },[filterParams, role, account])

  return (<>
    <div className="card-header justify-content-between align-items-center gap-2 py-3">
      <div>
        <select className='form-select' value={account} onChange={(e) => setAccount(e.target.value)}>
          <option value='0'>Select</option>
          {getSettingsFromUserSettings(currentUser?.userSettings, 'email')?.map((item: any) => (
            <option value={item.unipile_account_id} key={item.unipile_account_id}>{item.label}</option>
          ))}
        </select>
      </div>
      <div className="d-flex gap-2">
      {folders?.map((item: any, index: number) => (
        <button key={index} className={`btn btn-sm btn-outline ${item?.value === role ? `btn-${item?.color}` : `btn-outline-${item?.color}`}`} onClick={() => setRole(item?.value)}>
          {firstLetterUpperCase(item?.label)}
        </button>
      ))}
      </div>
    </div>
    <div className='card-body py-3'>
      {params?.account_id && <EmailTable queryKey={`all-email-${params?.account_id}`} url={EMAIL_UNIPILE_URL} params={params} columns={emailColumns} refetch={1} />}
    </div>
    <ShowEmail />
  </>)
}

export default EmailList