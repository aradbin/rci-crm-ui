import { useEffect, useState } from "react"
import { getRequest } from "../../helpers/Requests"
import { WHATSAPP_URL } from "../../helpers/ApiEndpoints"

const ChatImage = ({id}: any) => {
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(id && url === ""){
            getImageUrl(id)
        }
    },[id])

    const getImageUrl = async (id: any) => {
        await getRequest(`${WHATSAPP_URL}/media/${id}`).then((response) => {
            setUrl(response);
        }).finally(() => {
            setLoading(false)
        })
    }

    return (<>
        {loading &&
            <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100px', backgroundColor: '#92929f' }}>
                <span className='spinner-border spinner-border-sm'></span>
            </div>
        }
        {url !== "" && <img src={url} alt="WhatsApp Image" className="img-fluid" />}
    </>)
}

export default ChatImage