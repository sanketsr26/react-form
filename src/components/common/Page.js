import React from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

function Page(props) {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {props.children}
      </Box>
    </Container>
  )
}

export default Page
