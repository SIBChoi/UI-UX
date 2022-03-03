const Input = ({ id, label, onChange, type, help }) => {
  const inputClass = help ? 'form-control is-invalid' : 'form-control';

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        className={inputClass}
        id={id}
        onChange={onChange}
        type={type || 'text'}
      ></input>
      {help && <span className="invalid-feedback">{help}</span>}
    </div>
  );
};

export default Input;
