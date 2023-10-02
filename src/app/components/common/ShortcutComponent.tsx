import { useContext, useState } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { AppContext } from "../../providers/AppProvider"

const ShortcutComponent = () => {
    const [show, setShow] = useState(false)

    const { setShowCreateEmail } = useContext(AppContext)

    const toggleShow = () => {
        setShow(!show)
    }

    return (
        <div className="d-flex flex-column gap-2 bg-transparent w-auto" style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
        }}>
            {show && 
            <OverlayTrigger placement="left" trigger="hover" overlay={<Tooltip placement="left">Create Task</Tooltip>}>
                <button className="btn btn-primary btn-icon" style={{
                    borderRadius: '50px',
                    animation: 'animationFadeIn 0.6s ease-in-out'
                }}>
                    <i className="fa-solid fa-check p-0 fs-1"></i>
                </button>
            </OverlayTrigger>
            }

            {show && 
            <OverlayTrigger placement="left" trigger="hover" overlay={<Tooltip placement="left">Send Email</Tooltip>}>
                <button className="btn btn-warning btn-icon" style={{
                    borderRadius: '50px',
                    animation: 'animationFadeIn 0.4s ease-in-out'
                }} onClick={() => setShowCreateEmail(true)}>
                    <i className="fa-solid fa-envelope p-0 fs-1"></i>
                </button>
            </OverlayTrigger>
            }

            {show && 
            <OverlayTrigger placement="left" trigger="hover" overlay={<Tooltip placement="left">Send WhatsApp</Tooltip>}>
                <button className="btn btn-success btn-icon" style={{
                    borderRadius: '50px',
                    animation: 'animationFadeIn 0.2s ease-in-out'
                }}><i className="fa-brands fa-whatsapp p-0 fs-1"></i></button>
            </OverlayTrigger>
            }

            <button className="btn btn-info btn-icon" style={{ borderRadius: '50px' }} onClick={() => toggleShow()}><i className={`fa-solid fa-${show ? 'times' : 'plus'} p-0 fs-1`}></i></button>
        </div>
    )
}

export { ShortcutComponent }