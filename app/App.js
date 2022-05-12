import React, { useEffect } from "react"
import ReactDom from "react-dom"

function App() {
  return <div>Hello there!</div>
}

ReactDom.render(<App />, document.querySelector("#app"))
if (module.hot) {
  module.hot.accept()
}
