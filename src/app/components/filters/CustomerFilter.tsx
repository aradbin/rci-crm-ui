import { Field, FormikProvider, useFormik } from "formik"
import * as Yup from 'yup'
import { InputField } from "../fields/InputField"

const CustomerFilter = ({submit}: any) => {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            contact: "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string(),
            email: Yup.string(),
            contact: Yup.string(),
        }),
        onSubmit: (values) => {
            submit(values)
        },
    })

    return (
        <div className='menu menu-sub menu-sub-dropdown w-250px w-md-300px' data-kt-menu='true'>
            <FormikProvider value={formik}>
                <form className="form" onSubmit={formik.handleSubmit} noValidate>
                    <div className='px-7 py-5'>
                        <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
                    </div>
                    <div className='separator border-gray-200'></div>
                    <div className='px-7 py-5'>
                        <Field
                            label="Name"
                            name="name"
                            type="text"
                            required="required"
                            component={InputField}
                            size="sm"
                        />
                        <Field
                            label="Email"
                            name="email"
                            type="email"
                            required="required"
                            component={InputField}
                            size="sm"
                        />
                        <Field
                            label="Contact"
                            name="contact"
                            type="text"
                            required="required"
                            component={InputField}
                            size="sm"
                        />
                    </div>
                    <div className='separator border-gray-200'></div>
                    <div className='d-flex justify-content-end px-7 py-5'>
                        <button type='reset' className='btn btn-sm btn-light btn-active-light-primary me-2' data-kt-menu-dismiss='true' onClick={() => {
                            formik.resetForm();
                            submit({});
                        }}>
                            Reset
                        </button>

                        <button type='submit' className='btn btn-sm btn-primary' data-kt-menu-dismiss='true'>
                            Apply
                        </button>
                    </div>
                </form>
            </FormikProvider>
        </div>
    )
}

export {CustomerFilter}