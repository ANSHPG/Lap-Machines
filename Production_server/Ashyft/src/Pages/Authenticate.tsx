import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import LoginForm from "../components/LoginForm"
import { useEffect } from "react"

export default function Authenticate() {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/foundation", { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleLoginSuccess = () => {
    login()
    navigate("/foundation", { replace: true })
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 text-white">
      <div className="w-full max-w-sm">
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </div>
  )
}