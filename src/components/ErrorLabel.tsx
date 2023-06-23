interface props{
    errorString:string | undefined
    fieldTouched: boolean | undefined
    fieldName:string
}

export const ErrorLabel : React.FC<props> = ({errorString, fieldTouched, fieldName}) => {
  return (
    <label
    style={{
    color:
        errorString && fieldTouched
        ? "red"
        : "black",
    }}
    htmlFor={fieldName}
>
    {errorString && fieldTouched
    ? errorString
    : ""}
</label>
  )
}
