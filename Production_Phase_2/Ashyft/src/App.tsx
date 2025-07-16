import { Routes, Route, Navigate } from "react-router-dom"
import Foundation from "./Pages/Foundation"
import Authenticate from "./Pages/Authenticate"
import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute"

function App() {
  return (
    <div className="">
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Authenticate />} />
        <Route 
          path="/foundation/*" 
          element={
            <ProtectedRoute>
              
              <Foundation />
              
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
    </div>
  )
}

export default App