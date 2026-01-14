import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const {login} = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e:React.FormEvent) => {
        e.preventDefault()

        if (username === "admin" && password === "admin") {
            login("token_abc")
            navigate("/products")
        } else {
            setErrorMsg("Username atau password salah!!")
        }
    }

    
        return (
        <div className='flex items-center justify-center min-h-screen p-4'>
            <form onSubmit={handleLogin} className='w-full max-w-sm bg-white dark:bg-zinc-900 p-6 rounded shadow space-y-4'>
                <h1 className='text-2xl font-bold'>Login</h1>
                <div className="">
                    <Label htmlFor='username' className='mb-2'>Username</Label>
                    <Input 
                    id="username" 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                </div>
                <div className="">
                    <Label htmlFor='password' className='mb-2'>Password</Label>
                    <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                {errorMsg && (
                    <p>{errorMsg}</p>
                )}
                <Button type='submit' className='w-full'>Login</Button>
            </form>
        </div>
    )
}

export default Login