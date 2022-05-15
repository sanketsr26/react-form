import React from "react"
import ReactDom from "react-dom"
import { useImmerReducer } from "use-immer"
import StateContext from "../../context/StateContext"
import DispatchContext from "../../context/DispatchContext"
import SignUp from "../page/SignupForm"
import validate, { formFields } from "../../utils/validate"
import Details from "../page/Details"

function App() {
  const initialState = {
    firstname: {
      value: "",
      hasErrors: false,
      errMsg: ""
    },
    lastname: {
      value: "",
      hasErrors: false,
      errMsg: ""
    },
    email: {
      value: "",
      hasErrors: false,
      errMsg: ""
    },
    age: {
      value: "",
      hasErrors: false,
      errMsg: ""
    },
    phone: {
      value: "",
      hasErrors: false,
      errMsg: ""
    },
    isFormSubmitted: false
  }

  const reducerFn = (draft, action) => {
    switch (action.type) {
      case "performValidation":
        const validationErrors = validate(action.payload)
        if (!Object.keys(validationErrors).length) {
          Object.keys(action.payload).map(field => {
            draft[field].value = action.payload[field]
            draft[field].hasErrors = false
            draft[field].errMsg = ""
          })
          draft.isFormSubmitted = true
        } else {
          Object.keys(action.payload).map(field => {
            if (!validationErrors[field]) {
              draft[field].value = action.payload[field]
              if (draft[field].hasErrors) {
                draft[field].hasErrors = false
                draft[field].errMsg = ""
              }
            } else {
              draft[field].hasErrors = true
              draft[field].errMsg = validationErrors[field]
            }
          })
        }
        return
      case "resetForm":
        formFields.map(item => {
          draft[item.field].value = ""
          draft[item.field].hasErrors = false
          draft[item.field].errMsg = ""
        })
    }
  }

  const [state, dispatch] = useImmerReducer(reducerFn, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{state.isFormSubmitted ? <Details /> : <SignUp />}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDom.render(<App />, document.querySelector("#app"))
if (module.hot) {
  module.hot.accept()
}
