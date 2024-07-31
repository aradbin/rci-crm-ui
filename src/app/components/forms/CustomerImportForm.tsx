import { FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { Modal } from "react-bootstrap"
import { useQueryClient } from "react-query"
import * as XLSX from 'xlsx'
import { createRequest } from "../../helpers/Requests"
import { CUSTOMERS_URL } from "../../helpers/ApiEndpoints"
import { toast } from "react-toastify"

const CustomerImportForm = ({show, toggleShow, updateList}: any) => {
    const queryClient = useQueryClient()

    const formik = useFormik({
        initialValues: {
            file: undefined
        },
        validationSchema: Yup.object().shape({
            file: Yup.mixed().required('File is required'),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
                const file = values.file
                if(!file) return
                const reader = new FileReader()
                reader.onload = (e: any) => {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const worksheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[worksheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);
                    if(jsonData?.length > 0){
                        createRequest(`${CUSTOMERS_URL}/import`, jsonData).then(async (response) => {
                            if(response?.status===201){
                                toast.success('Customer imported Successfully')
                                updateListHandler()
                                closeModal()
                            }
                        })
                    }
                };
              
                reader.readAsArrayBuffer(file);
            } catch (error) {
                console.error(error)
            } finally {
                setSubmitting(false)
            }
        },
    })

    const closeModal = () => {
        formik.resetForm()
        toggleShow(false)
    }

    const updateListHandler = () => {
        queryClient.invalidateQueries({ queryKey: ['all-customers'] })
        updateList()
    }

    return (
        <Modal className="fade" aria-hidden='true' show={show} centered animation>
            <div className="modal-content">
                <div className='modal-header'>
                    <h2 className='fw-bolder'>Import Customer</h2>
                    <div className='btn btn-icon btn-sm btn-active-icon-primary' onClick={() => closeModal()}>
                        <i className="fa fa-times fs-2"></i>
                    </div>
                </div>
                <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body scroll-y mx-2 mx-xl-2 my-2">
                            <div className='d-flex flex-column'>
                                <label className="required fw-bold mb-2 fs-6">File</label>
                                <input
                                    placeholder="File"
                                    name="file"
                                    type="file"
                                    className="form-control mb-3 mb-lg-0"
                                    onChange={(e) => { formik.setFieldValue('file', e?.target?.files?.[0]) }}
                                />
                                <div className="d-flex justify-content-end">
                                    <a target="_blank" href="/files/Customer import sample.xlsx" download={"Customer import sample.xlsx"} className="mt-3" style={{ textDecoration: 'underline' }}>Download Sample</a>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-sm btn-primary w-125px me-3" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? (
                                    <span>
                                        Please wait {' '}
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                ) : (
                                    <span>Submit</span>
                                )}
                            </button>
                            <button type="button" className='btn btn-sm btn-outline btn-light w-125px' aria-disabled={formik.isSubmitting} onClick={closeModal}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </FormikProvider>
            </div>
        </Modal>
    )
}

export {CustomerImportForm}