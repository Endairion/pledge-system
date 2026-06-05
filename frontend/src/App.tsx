import { ThemeProvider } from "@/contexts/ThemeContext"
import AppRouter from "@/routes"

export default function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  )
}
