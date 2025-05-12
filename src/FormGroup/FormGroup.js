import React from "react";
import "../admin layout/Project/Project Form/projectform.css";
import "./formgroup.css";

const FormGroup = ({
  label,
  type,
  id,
  name,
  required,
  options,
  className,
  sharedName,
  value,
  disabled,
  onChange,
  rows,
  multiple,
  placeholder,
  min,
}) => {
  console.log(required, name);
  return (
    <div className={`form-group ${sharedName}`}>
      {label && type !== "checkbox" ? (
        <label htmlFor={id}>
          {label}
          {required ? <sup className="text-danger">*</sup> : ""}
        </label>
      ) : null}

      {type === "textarea" ? (
        <textarea
          className={`form-control ${className}`}
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      ) : type === "select" ? (
        <select
          id={id}
          name={name}
          required={required}
          className={`form-control ${className}`}
          value={value}
          onChange={onChange}
        >
          {options.map((option, index) => (
            <option
              key={option.id ? option.id : option.value || index}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "file" ? (
        <input
          type="file"
          id={id}
          name={name}
          multiple={multiple}
          required={required}
        />
      ) : type === "text" ||
        type === "number" ||
        type === "date" ||
        type === "email" ||
        type === "password" ? (
        <input
          className={`form-control ${className}`}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
        />
      ) : type === "checkbox" ? (
        <div className="checkbox-container">
          <input
            type={type}
            name={name}
            id={id}
            value={value}
            disabled={disabled}
          />
          <label htmlFor={id}>
            {label}
            {required ? <sup className="text-danger">*</sup> : ""}
          </label>
        </div>
      ) : null}
    </div>
  );
};

export default FormGroup;
