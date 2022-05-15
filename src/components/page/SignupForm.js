import React, { useContext, useRef } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import DispatchContext from "../../context/DispatchContext"
import StateContext from "../../context/StateContext"
import TextFieldMessage from "../common/TextFieldMessage"
import Page from "../common/Page"

export default function SignUp() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const formRef = useRef(null)

  const constructFormData = data => {
    const formData = {}
    for (var key of data.keys()) {
      formData[key] = data.get(key)
    }
    return formData
  }

  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    appDispatch({ type: "performValidation", payload: constructFormData(data) })
  }

  const handleReset = () => {
    formRef.current.reset()
    appDispatch({ type: "resetForm" })
  }

  return (
    <Page>
      <Typography variant="h5">Sign up Form</Typography>
      <Box ref={formRef} component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField name="firstname" required fullWidth id="firstname" label="First Name" autoFocus />
            {appState.firstname.hasErrors && <TextFieldMessage alert="danger" message={appState.firstname.errMsg} />}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required fullWidth id="lastname" label="Last Name" name="lastname" />
            {appState.lastname.hasErrors && <TextFieldMessage alert="danger" message={appState.lastname.errMsg} />}
          </Grid>
          <Grid item xs={12}>
            <TextField required fullWidth id="email" label="Email Address" name="email" />
            {appState.email.hasErrors && <TextFieldMessage alert="danger" message={appState.email.errMsg} />}
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField type="number" name="age" fullWidth id="age" label="Age(Yrs)" />
            {appState.age.hasErrors && <TextFieldMessage alert="danger" message={appState.age.errMsg} />}
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField required fullWidth id="phone" label="Phone Number" name="phone" />
            {appState.phone.hasErrors && <TextFieldMessage alert="danger" message={appState.phone.errMsg} />}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button type="button" onClick={handleReset} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Page>
  )
}
