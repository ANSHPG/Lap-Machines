import { Routes, Route, Navigate } from "react-router-dom"
import Foundation from "./Pages/Foundation"
import Authenticate from "./Pages/Authenticate"
import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute"

function App() {
  return (
    
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Authenticate />} />
        <Route 
          path="/foundation/*" 
          element={
            <ProtectedRoute>
              <div className="bg-[#212121] w-full h-full p-[20vw]">
              <Foundation />
              </div>
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  )
}

export default App