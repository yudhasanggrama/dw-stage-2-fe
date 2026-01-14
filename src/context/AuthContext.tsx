import { createContext } from 'react'

export type AuthContextType = {
    token : string | null
    login :(token : string) => void
    logout : () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export default AuthContext