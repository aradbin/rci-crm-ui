import { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { LoadingComponent } from "../common/LoadingComponent"
import { getRequest, getRequestBlob } from "../../helpers/Requests"
import { WHATSAPP_CONNECT_URL } from "../../helpers/ApiEndpoints"

const WhatsAppQrCode = ({show, toggleShow, updateList, type}: any) => {
  const [loading, setLoading] = useState(false)
  const [qr, setQr] = useState("")

  useEffect(() => {
    if(show){
      setLoading(true)
      getRequest(WHATSAPP_CONNECT_URL).then((response: any) => {
        // const qrUrl = URL.createObjectURL(response.data)
        setQr(response)
      }).catch((error) => {
        closeModal()
      }).finally(() => {
        setLoading(false)
      })
    }
  },[show])

  const closeModal = () => {
    toggleShow(false)
  }

  const updateListHandler = () => {
    updateList()
  }

  return (
    <Modal className="fade" aria-hidden='true' show={show} centered animation>
      <div className="modal-content">
        <div className='modal-header'>
          <h2 className='fw-bolder'>Scan The QR Code</h2>
          <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
            <i className="fa fa-times fs-2"></i>
          </div>
        </div>
        <div className="modal-body d-flex justify-content-center scroll-y mx-2 mx-xl-2 my-2">
          {/* <img src={qr} /> */}
          <a target="_blank" href={qr} className='btn btn-sm btn-outline btn-primary w-125px' aria-disabled={loading} onClick={closeModal}>
            Connect
          </a>
        </div>
        <div className="modal-footer">
          <button type="button" className='btn btn-sm btn-outline btn-light w-125px' aria-disabled={loading} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
      {loading && <LoadingComponent />}
    </Modal>
  )
}

export {WhatsAppQrCode}