import { useEffect, useState } from "react"
import { getRequest, getRequestBlob } from "../../helpers/Requests"
import { WHATSAPP_URL } from "../../helpers/ApiEndpoints"
import axios from "axios"

const ChatImage = ({id, attachment}: any) => {
    const [imgUrl, setImgUrl] = useState("")
    const [audUrl, setAudUrl] = useState("")
    const [vidUrl, setVidUrl] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(id && attachment && imgUrl === "" && audUrl === "" && vidUrl === "") {
            getImageUrl()
        }
    },[id])

    const getImageUrl = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'X-API-KEY': 'wFwfk/cP.ccLHavfhlifHp25s9DEHK/51sQRJl2mUu15Wxy/j0Nc='}
          };
          
          await fetch(`https://api2.unipile.com:13214/api/v1/messages/${id}/attachments/${attachment?.id}`, options)
            .then(async (response: any) => {
                if (response.headers.get('Content-Type').startsWith('image/')) {
                    const imageData = await response.blob()
                    const imageUrl = URL.createObjectURL(imageData)
                    setImgUrl(imageUrl)
                } else if (response.headers.get('Content-Type').startsWith('audio/')) {
                    const audioData = await response.blob()
                    const audioUrl = URL.createObjectURL(audioData)
                    setAudUrl(audioUrl)
                } else if (response.headers.get('Content-Type').startsWith('video/')) {
                    const videoData = await response.blob()
                    const videoUrl = URL.createObjectURL(videoData)
                    setVidUrl(videoUrl)
                } else {
                    console.log('Non-image/audio/video attachment:', response.headers.get('Content-Type'));
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    return (<>
        {loading &&
            <div className="d-flex justify-content-center align-items-center" style={{ width: '50%', height: '100px', backgroundColor: '#92929f' }}>
                <span className='spinner-border spinner-border-sm'></span>
            </div>
        }
        {imgUrl !== "" && <img src={imgUrl} alt="WhatsApp Image" className="img-fluid mw-50" />}
        {vidUrl !== "" && <video src={vidUrl} controls className="img-fluid mw-50" />}
        {audUrl !== "" && <audio src={audUrl} controls />}
    </>)
}

export default ChatImage