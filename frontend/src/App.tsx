import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import TaskManager from "./components/TaskManager"

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskManager />
    </ThemeProvider>
  )
}

export default App

