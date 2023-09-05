import clsx from "clsx";

export const SelectField = ({
    label,
    field,
    options,
    required,
    form: { touched, errors },
    size,
    formStyle
}: any) => {
    return (
        <div className={`mb-4 ${formStyle==='inline' && 'form-group row'}`}>
            <label className={`${required} fw-bold mb-2 ${size==='sm' ? 'fs-7' : 'fs-6'} ${formStyle==='inline' && 'col-sm-3 col-form-label'} ${(size==='sm' && formStyle==='inline') && 'pt-3'}`}>{label}</label>

            {formStyle==='inline' ? 
                <div className="col-sm-9">
                    <select
                        {...field}
                        className={clsx(
                            'form-select mb-3 mb-lg-0',
                            {'w-300px': !size},
                            {'form-select-sm': size==='sm'},
                            {'w-200px': size==='sm'},
                            {'is-invalid': touched[field.name] && errors[field.name]},
                            // {'is-valid': touched[field.name] && !errors[field.name]},
                        )}
                        aria-label="Select example"
                    >
                        <option value="">Select</option>
                        {options.map((item: any) => (
                            <option value={item.id} key={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
            :
                <select
                    {...field}
                    className={clsx(
                        'form-select mb-3 mb-lg-0',
                        {'w-300px': !size},
                        {'form-select-sm': size==='sm'},
                        {'w-200px': size==='sm'},
                        {'is-invalid': touched[field.name] && errors[field.name]},
                        // {'is-valid': touched[field.name] && !errors[field.name]},
                    )}
                    aria-label="Select example"
                >
                    <option value="">Select</option>
                    {options.map((item: any) => (
                        <option value={item.id} key={item.id}>{item.name}</option>
                    ))}
                </select>
            }
            
            {touched[field.name] && errors[field.name] && (
                <div className={`fv-plugins-message-container ${formStyle==='inline' ? "row" : ""}`}>
                    {formStyle==='inline' && <div className="col-sm-3"></div>}
                    <div className={`fv-help-block ${formStyle==='inline' ? "col-sm-9" : ""}`}>
                        <span role='alert' className="ps-2">{errors[field.name]}</span>
                    </div>
                </div>
            )}
        </div>
    );
}