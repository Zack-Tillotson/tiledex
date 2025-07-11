import React from "react";
import styles from "./input.module.css";

interface InputProps {
  id: string;
  name: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  label?: string;
}

/**
 * Input component for form fields
 * @param id - Unique identifier for the input
 * @param name - Name attribute for the input
 * @param type - Input type (text, email, password, etc.)
 * @param placeholder - Placeholder text
 * @param value - Controlled value
 * @param onChange - Change handler
 * @param onBlur - Blur handler
 * @param error - Error message to display
 * @param disabled - Whether the input is disabled
 * @param required - Whether the input is required
 * @param className - Additional CSS classes
 * @param label - Label text for the input
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    disabled = false,
    required = false,
    className = "",
    label,
  },
  ref
) {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        className={`${styles.input} ${error ? styles.error : ""} ${className}`}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
});
