import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import { AuthProvider } from "./context/AuthProvider"
import useAuth from "./hooks/useAuth"
import Login from "./pages/Login"
import PrivateRoute from "./lib/privateRoute"
import ThemeToogle from "./components/themetoogle"

function Header() {
  const {token, logout} = useAuth();
  return (

    <div className="w-full flex gap-4 p-4 justify-center border-b mb-8">
          <Button asChild variant="outline">
            <Link to="/">Home</Link>
          </Button>

          {token && (
            <Button asChild variant="outline">
              <Link to="/products">Products</Link>
            </Button>
          )}
            {token ? (
                <Button onClick={logout} variant="destructive">Logout</Button>
              ) : (
                <Button asChild variant="outline">
                  <Link to="/login">Login</Link>
                </Button>
              )
            }

            <ThemeToogle />
        </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/products" element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
