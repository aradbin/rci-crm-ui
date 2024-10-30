import { useEffect, useState } from "react"
import { QueryUnipile } from "../../helpers/Queries"
import { MESSAGES_UNIPILE_URL } from "../../helpers/ApiEndpoints"

const ChatAttachment = ({message, attachment}: any) => {
    const [imgUrl, setImgUrl] = useState("")
    const [audUrl, setAudUrl] = useState("")
    const [vidUrl, setVidUrl] = useState("")
    const [pdfUrl, setPdfUrl] = useState("")
    const [otherUrl, setOtherUrl] = useState("")
    
    const {isLoading, data} = QueryUnipile(`whatsapp-attachment-${message}-${attachment?.id}`, `${MESSAGES_UNIPILE_URL}/${message}/attachments/${attachment?.id}`, {}, true)

    useEffect(() => {
        if(message && attachment && data && imgUrl === "" && audUrl === "" && vidUrl === "" && pdfUrl === "" && otherUrl === "") {
            getImageUrl()
        }
    },[data])

    const getImageUrl = async () => {
        const url = URL.createObjectURL(data)
        if (data?.type?.startsWith('image/')) {
            setImgUrl(url)
        } else if (data?.type?.startsWith('audio/')) {
            setAudUrl(url)
        } else if (data?.type?.startsWith('video/')) {
            setVidUrl(url)
        } else if (data?.type?.startsWith('application/pdf')) {
            setPdfUrl(url)
        } else {
            setOtherUrl(url)
        }
    }

    return (
        <div className="mw-100">
            {isLoading &&
                <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100px', backgroundColor: '#92929f' }}>
                    <span className='spinner-border spinner-border-sm'></span>
                </div>
            }
            {imgUrl !== "" && <a href={imgUrl} target="_blank" rel="noopener noreferrer"><img src={imgUrl} alt="WhatsApp Image" className="img-fluid" /></a>}
            {vidUrl !== "" && <video src={vidUrl} controls className="img-fluid" />}
            {audUrl !== "" && <audio src={audUrl} controls />}
            {pdfUrl !== "" && <iframe src={pdfUrl} width="100%" height="auto" title={attachment?.file_name} />}
            {pdfUrl !== "" && <a href={pdfUrl} target="_blank" rel="noopener noreferrer">{attachment?.file_name}</a>}
            {otherUrl !== "" && <a href={otherUrl} target="_blank" rel="noopener noreferrer">{attachment?.file_name}</a>}
        </div>
    )
}

export default ChatAttachment