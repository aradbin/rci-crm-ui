import { MessageBox } from "../../components/message/MessageBox"

/* eslint-disable jsx-a11y/anchor-is-valid */
const MessagePage = () => (
  <div
    id='kt_drawer_chat'
    className='bg-body'
    data-kt-drawer='true'
    data-kt-drawer-name='chat'
    data-kt-drawer-activate='true'
    data-kt-drawer-overlay='true'
    data-kt-drawer-width="{default:'300px', 'md': '500px'}"
    data-kt-drawer-direction='end'
    data-kt-drawer-toggle='#kt_drawer_chat_toggle'
    data-kt-drawer-close='#kt_drawer_chat_close'
  >
    <div className='card w-100 rounded-0' id='kt_drawer_chat_messenger'>
        <MessageBox />
    </div>
  </div>
)

export {MessagePage}
