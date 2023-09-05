import clsx from "clsx";
import Select from "react-select";

export const SearchableSelectField = ({
    label,
    field,
    options,
    required,
    form,
    size,
    formStyle,
    multiple
}: any) => {
    const getValue = () => {
        if(options?.length > 0){
            return multiple
                ? options.filter((option: any) => field.value.indexOf(option.value) >= 0)
                : options.find((option: any) => option.value === field.value);
        } else {
            return multiple ? [] : ('');
        }
    }

    const onChange = (option: any) => {
        multiple ?
        form.setFieldValue(
            field.name,
            option?.map((item: any) => item.value) || [],
        )
        :
        form.setFieldValue(field.name, option.value)
    }

    return (
        <div className={`mb-4 ${formStyle==='inline' && 'form-group row'}`}>
            <label className={`${required} fw-bold mb-2 ${size==='sm' ? 'fs-7' : 'fs-6'} ${formStyle==='inline' && 'col-sm-3 col-form-label'} ${(size==='sm' && formStyle==='inline') && 'pt-3'}`}>{label}</label>

            {formStyle==='inline' ? 
                <div className="col-sm-9">
                    <Select
                        name={field.name}
                        className={clsx(
                            'mb-3 mb-lg-0',
                            {'w-300px': !size},
                            {'w-200px': size==='sm'},
                            {'w-100': size==='lg'},
                            // {'is-invalid': touched[field.name] && errors[field.name]},
                            // {'is-valid': touched[field.name] && !errors[field.name]},
                        )}
                        options={options}
                        value={getValue()}
                        onChange={onChange}
                        isMulti={multiple}
                        closeMenuOnSelect={false}
                    />
                </div>
            : 
                <Select
                    name={field.name}
                    className={clsx(
                        'mb-3 mb-lg-0',
                        {'w-300px': !size},
                        {'w-200px': size==='sm'},
                        {'w-100': size==='lg'},
                        // {'is-invalid': touched[field.name] && errors[field.name]},
                        // {'is-valid': touched[field.name] && !errors[field.name]},
                    )}
                    options={options}
                    value={getValue()}
                    onChange={onChange}
                    isMulti={multiple}
                    closeMenuOnSelect={false}
                />
            }
            
            {/* {touched[field.name] && errors[field.name] && (
                <div className={`fv-plugins-message-container ${formStyle==='inline' ? "row" : ""}`}>
                    {formStyle==='inline' && <div className="col-sm-3"></div>}
                    <div className={`fv-help-block ${formStyle==='inline' ? "col-sm-9" : ""}`}>
                        <span role='alert' className="ps-2">{errors[field.name]}</span>
                    </div>
                </div>
            )} */}
        </div>
    );
}