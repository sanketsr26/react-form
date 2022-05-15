import React from "react"

function TextFieldMessage({ alert, message }) {
  return <small className={`text-${alert}`}>{message}</small>
}

export default TextFieldMessage
