import { useEffect, useState } from "react"
import { QueryUnipile } from "../../helpers/Queries"

const EmailAttachment = ({email, attachment}: any) => {
    const [imgUrl, setImgUrl] = useState("")
    const [audUrl, setAudUrl] = useState("")
    const [vidUrl, setVidUrl] = useState("")
    const [pdfUrl, setPdfUrl] = useState("")
    const [otherUrl, setOtherUrl] = useState("")
    
    const {isLoading, data} = QueryUnipile(`email-attachment-${email}-${attachment}`, `/emails/${email}/attachments/${attachment}`, 'attachment')

    useEffect(() => {
        if(email && attachment && data && imgUrl === "" && audUrl === "" && vidUrl === "" && pdfUrl === "" && otherUrl === "") {
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

    return (<div className="border me-4">
        {isLoading &&
            <div className="d-flex justify-content-center align-items-center" style={{ width: '100px', height: '100px', backgroundColor: '#92929f' }}>
                <span className='spinner-border spinner-border-sm'></span>
            </div>
        }
        {imgUrl !== "" && <a href={imgUrl} target="_blank" rel="noopener noreferrer"><img src={imgUrl} alt="WhatsApp Image" className="img-fluid" style={{ width: '150px', height: '100%' }} /></a>}
        {vidUrl !== "" && <video src={vidUrl} controls className="img-fluid" style={{ width: '150px', height: '100%' }} />}
        {audUrl !== "" && <audio src={audUrl} controls style={{ width: '150px', height: '100%' }} />}
        {pdfUrl !== "" && <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{ width: '150px', height: '100%' }}>{attachment?.file_name}</a>}
        {otherUrl !== "" && <a href={otherUrl} target="_blank" rel="noopener noreferrer" style={{ width: '150px', height: '100%' }}>{attachment?.file_name}</a>}
    </div>)
}

export default EmailAttachment