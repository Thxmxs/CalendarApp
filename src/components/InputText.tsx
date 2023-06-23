import React from 'react'

interface props{
    value:string,
    name:string,
    placeholder:string,
    onChange:(e: React.ChangeEvent<any>)=>void
    onBlur:(e: React.FocusEvent<any, Element>)=>void
    type?:string
}

export const InputText : React.FC<props> = ({onBlur,onChange,value,name,placeholder,type='text'}) => {
  return (
    <input 
        type={type}
        className="form-control"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
    />
  )
}
