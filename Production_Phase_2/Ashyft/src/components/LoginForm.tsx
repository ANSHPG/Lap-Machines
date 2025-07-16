// src/components/LoginForm.tsx
import { useState } from "react"
import { GalleryVerticalEnd, Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Logo from "../assets/file.svg"

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
          <div className="flex  items-center justify-center rounded-xl bg-[#470e0e] p-3 w-[4.5vw]  ">
            <img src={Logo} alt="" className=""/>
          </div>
          <h1 className="text-[17px] text-gray-200 font-[Formula1]">Welcome to <span className="font-[Formula1-Bold] text-[20px]" id="loginTitle">LAP MACHINES.</span> </h1>
          <p className="text-center text-[11px]   font-[Formula1] text-gray-200">
            Strap in — fire up your home server
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="grid gap-2" id="usernameDiv">
            <Label htmlFor="username" className="text-[12px] font-[Formula1] text-gray-200">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Kindly enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-[25vw] bg-[#151515] border-[#262626] border-2 focus:border-[#3f3f3f] focus:border-[3px]"

            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password"  className="text-[12px] font-[Formula1] text-gray-200">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Kindly enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 bg-[#151515] border-[#262626] border-2 focus:border-[#3f3f3f] focus:border-[3px] "
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
            <div className="text-sm text-[#601515] text-center bg-[#ff4121] p-2 rounded-md font-semibold font-[Formula1]">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full bg-[#470e0e] text-[#ff4121] hover:bg-[#601515] cursor-pointer">
            Login
          </Button>
        </form>
      </div>

    </div>
  )
}
