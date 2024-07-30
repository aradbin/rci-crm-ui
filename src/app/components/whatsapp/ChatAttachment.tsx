import { useEffect, useState } from "react"
import { getRequest, getRequestBlob } from "../../helpers/Requests"
import { WHATSAPP_URL } from "../../helpers/ApiEndpoints"
import axios from "axios"

const ChatAttachment = ({message, attachment}: any) => {
    const [imgUrl, setImgUrl] = useState("")
    const [audUrl, setAudUrl] = useState("")
    const [vidUrl, setVidUrl] = useState("")
    const [pdfUrl, setPdfUrl] = useState("")
    const [otherUrl, setOtherUrl] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(message?.id && attachment && imgUrl === "" && audUrl === "" && vidUrl === "" && pdfUrl === "" && otherUrl === "") {
            getImageUrl()
        }
    },[message])

    const getImageUrl = async () => {
        const options = {
            method: 'GET',
            headers: {accept: '*/*', 'X-API-KEY': 'wFwfk/cP.ccLHavfhlifHp25s9DEHK/51sQRJl2mUu15Wxy/j0Nc='}
          };
          
          await fetch(`https://api6.unipile.com:13614/api/v1/messages/${message?.id}/attachments/${attachment?.id}`, options)
            .then(async (response: any) => {
                const data = await response.blob()
                const url = URL.createObjectURL(data)
                if (response.headers.get('Content-Type').startsWith('image/')) {
                    setImgUrl(url)
                } else if (response.headers.get('Content-Type').startsWith('audio/')) {
                    setAudUrl(url)
                } else if (response.headers.get('Content-Type').startsWith('video/')) {
                    setVidUrl(url)
                } else if (response.headers.get('Content-Type').startsWith('application/pdf')) {
                    setPdfUrl(url)
                } else {
                    setOtherUrl(url)
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    return (<div className="mw-100">
        {loading &&
            <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100px', backgroundColor: '#92929f' }}>
                <span className='spinner-border spinner-border-sm'></span>
            </div>
        }
        {imgUrl !== "" && <a href={imgUrl} target="_blank" rel="noopener noreferrer"><img src={imgUrl} alt="WhatsApp Image" className="img-fluid" /></a>}
        {vidUrl !== "" && <video src={vidUrl} controls className="img-fluid" />}
        {audUrl !== "" && <audio src={audUrl} controls />}
        {pdfUrl !== "" && <a href={pdfUrl} target="_blank" rel="noopener noreferrer">{attachment?.file_name}</a>}
        {otherUrl !== "" && <a href={otherUrl} target="_blank" rel="noopener noreferrer">{attachment?.file_name}</a>}
    </div>)
}

export default ChatAttachment