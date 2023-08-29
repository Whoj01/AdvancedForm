import { InputHTMLAttributes, forwardRef, useId } from "react";

import './Input.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string,
  helperText?: string,
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>
        {props.label}
      </label>
      
      <input ref={ref} data-error={props.error} {...props} id={id}  type={props.type}/>
      {props.error && (
        <small>
          { props.helperText }
        </small>
      )}
    </div>
  )
})