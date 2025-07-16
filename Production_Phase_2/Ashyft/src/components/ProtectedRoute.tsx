import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// src/components/LoginForm.tsx
import { useState } from "react"
import { GalleryVerticalEnd, Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type LoginFormProps = {
  onSuccess: () => void
} & React.ComponentProps<"div">

export default function LoginForm({
  className,
  onSuccess,
  ...props
}: LoginFormProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (username === "admin" && password === "password123") {
      setError("")
      onSuccess()
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-md bg-blue-100">
            <GalleryVerticalEnd className="size-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold">Welcome to Acme Inc.</h1>
          <p className="text-center text-sm text-gray-600">
            Please enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 text-center bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>

      <div className="text-center text-xs text-gray-500">
        <p>Demo credentials: admin / password123</p>
      </div>
    </div>
  )
}