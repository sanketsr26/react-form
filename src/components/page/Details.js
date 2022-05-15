import { Typography } from "@mui/material"
import React, { useContext } from "react"
import StateContext from "../../context/StateContext"
import Page from "../common/Page"
import { formFields } from "../../utils/validate"

function Details() {
  const appState = useContext(StateContext)
  const renderDetails = () =>
    formFields.map((item, key) => {
      const value = appState[item.field].value
      return (
        <Typography key={item.field} variant="h5">
          {item.field + " :" + (value ? value : " Not provided")}
        </Typography>
      )
    })

  return <Page>{renderDetails()}</Page>
}

export default Details
