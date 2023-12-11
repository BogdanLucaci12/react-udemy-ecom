import './form-input.styles.scss'
const FormInput = ({ label, ...otherProps }) => {
    const valueLength = otherProps.value ? otherProps.value.length : 0;
    return (
        <div className="group">
            <input className="form-input" {...otherProps} />
            {label && (
                <label className={`${valueLength ? 'shrink' : ''} form-input-label`}>
                    {label}
                </label>
            )}
        </div>
    );
};

export default FormInput;