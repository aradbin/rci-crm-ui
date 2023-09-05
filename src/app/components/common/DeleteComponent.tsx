import { Modal } from "react-bootstrap"
import { useState } from "react"
import { deleteRequest } from "../../helpers/Requests"
import { toast } from "react-toastify"

const DeleteComponent = ({show, toggleShow, item, type, url, updateList }: any) => {
    const [loading, setLoading] = useState(false)

    const closeModal = () => {
        toggleShow(false)
    }

    const deleteHandle = () => {
        setLoading(true)
        deleteRequest(`${url}/${item?.id}`).then((response) => {
            if(response?.status===200){
                toast.success(`${type} deleted successfully`)
                updateList()
                toggleShow(false)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Modal className="fade pt-20" show={show}>
            <div className="modal-content rounded-0">
                <div className="modal-header bg-danger rounded-0 px-8 py-4">
                    <h5 className="modal-title text-white">Delete {type}</h5>
                    <div
                        className="btn btn-icon btn-sm btn-danger btn-active-light-danger"
                        aria-label="Close"
                        onClick={closeModal}
                    >
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <div className="modal-body px-12">
                    <div className='d-flex flex-column'>
                        <div>
                            <h2 className="text-danger mt-6 mb-10">{item?.name}</h2>
                            <h5 className="text-danger mb-2">Do you want to delete this {type.toLowerCase()}?</h5>
                            <p className="fs-7 fw-bold"><span className="text-danger">**</span>Once you delete this {type.toLowerCase()} it's unable to restore</p>
                        </div>
                        <div className="my-8">
                            <button type="button" className="btn btn-sm btn-danger w-150px me-3" disabled={loading} onClick={deleteHandle}>
                                {loading ? (
                                    <span>
                                        Please wait...{' '}
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                ) : (
                                    <span>Delete {type}</span>
                                )}
                            </button>
                            <button type="button" className='btn btn-sm btn-outline btn-light w-150px' aria-disabled={loading} onClick={closeModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export { DeleteComponent }