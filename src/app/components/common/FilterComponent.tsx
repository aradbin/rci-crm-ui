import { Field, FormikProvider, useFormik } from "formik"
import { InputField } from "../fields/InputField"
import { SelectField } from "../fields/SelectField"
import { KTIcon } from "../../../_metronic/helpers"
import { SearchableSelectField } from "../fields/SearchableSelectField"

const FilterComponent = ({filter, submit}: any) => {
    const formik = useFormik({
        initialValues: filter.initialValues,
        onSubmit: (values) => {
            submit(values)
        },
    })

    const getComponent = (type: string) => {
        switch (type) {
            case 'select':
                return SelectField
            case 'searchableSelect':
                return SearchableSelectField
            default:
                return InputField
        }
    }

    return (
        <div className='m-0'>
            <button className='btn btn-sm btn-flex fw-bold btn-outline btn-outline-dashed btn-outline-primary' data-kt-menu-trigger='click' data-kt-menu-placement='bottom-end'>
                <KTIcon iconName='filter' className='fs-6 text-primary me-1' /> Filter
            </button>
            <div className='menu menu-sub menu-sub-dropdown w-250px w-md-300px' data-kt-menu='true'>
                <FormikProvider value={formik}>
                    <form className="form" onSubmit={formik.handleSubmit} noValidate>
                        <div className='px-7 py-5'>
                            <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
                        </div>
                        <div className='separator border-gray-200'></div>
                        <div className='px-7 py-5'>
                            {filter?.fields?.map((item: any, index: number) =>
                                <Field
                                    key={index}
                                    label={item?.label}
                                    name={item?.name}
                                    type={item?.type || "text"}
                                    required={item?.required || ""}
                                    component={getComponent(item?.type)}
                                    options={item?.options}
                                    size={item?.size || "sm"}
                                />
                            )}
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
        </div>
    )
}

export {FilterComponent}