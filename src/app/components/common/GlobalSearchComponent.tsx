import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../providers/AppProvider"
import { toAbsoluteUrl } from "../../../_metronic/helpers"
import { useNavigate } from "react-router-dom";
import { firstLetterUpperCase } from "../../helpers/Utils";

const GlobalSearchComponent = () => {
  const navigate = useNavigate();
  const [ result, setResult ] = useState([])
  const [ show, setShow ] = useState(false)
  const [ query, setQuery ] = useState("")
  const { users, customers, contacts } =  useContext(AppContext)

  useEffect(() => {
    getResult(query)
  }, [query])

  const getResult = (value: string) => {
    const arr: any = [];

    if(value === ''){
      setShow(false)
      setResult([])
      return
    }

    const filteredUsers = users?.filter((user: any) => user?.name?.toLowerCase()?.includes(value?.toLowerCase()))?.map((user: any) => ({ ...user, type: 'user' }));
    arr.push(...filteredUsers);
  
    const filteredCustomers = customers?.filter((customer: any) => customer?.name?.toLowerCase()?.includes(value?.toLowerCase()))?.map((customer: any) => ({ ...customer, type: 'customer' }));
    arr.push(...filteredCustomers);
  
    const filteredContacts = contacts?.filter((contact: any) => contact?.name?.toLowerCase()?.includes(value?.toLowerCase()))?.map((contact: any) => ({ ...contact, type: 'contact' }));
    arr.push(...filteredContacts);

    if(arr.length > 0){
      setShow(true)
    }
    setResult(arr);
  };

  return (
    <div className="d-flex align-items-center position-relative w-100">
      <span className='fa fa-search fs-6 text-lg-1 text-gray-500 position-absolute top-50 ms-5 translate-middle-y'></span>
      <input
        type='text'
        className='form-control px-15'
        style={show ? { borderBottomLeftRadius: '0', borderBottomRightRadius: '0' } : {}}
        name='search'
        placeholder='Search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <span className='fa fa-times cursor-pointer fs-6 text-lg-1 text-gray-500 position-absolute top-50 me-5 translate-middle-y' style={{ right: 0 }} onClick={() => setQuery('')}></span>
      {show && 
        <div className="card position-absolute" style={{ width: '100%', top: '59px', borderTop: 'none', borderTopLeftRadius: '0', borderTopRightRadius: '0', height: 'auto', maxHeight: '300px', overflowX: 'hidden', overflowY: 'scroll' }}>
          <div className="card-body px-5 py-2">
            <div className='table-responsive'>
              <table className="table table-sm table-hover align-middle gs-0 gy-2 mb-0">
                <thead>
                  <tr>
                    <th className='p-0 w-50px'></th>
                    <th className='p-0 w-200px'></th>
                    <th className='p-0'></th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((item: any) => (
                    <tr className="cursor-pointer" onClick={() => {
                      setQuery('')
                      navigate(`/${item?.type}s/${item?.id}`)
                    }}>
                      <td>
                        <div className="symbol symbol-40px">
                          <img src={item?.avatar || toAbsoluteUrl('/media/avatars/blank.png')} alt="" />
                        </div>
                      </td>
                      <td>
                        <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                          {item?.name}
                        </span>
                        <span className='text-muted fw-semibold d-block fs-7'>{item?.email}</span>
                      </td>
                      <td>
                        <span className="badge badge-light-success">{firstLetterUpperCase(item?.type)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default GlobalSearchComponent