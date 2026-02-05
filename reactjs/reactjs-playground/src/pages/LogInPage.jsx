import { useState } from 'react'
import { setAccessToken } from '../utils/tokes'
import { useNavigate } from 'react-router'

const LogInPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const logInUser = async (event) => {
        try {
            event.preventDefault();
            const options = {
                method: "POST",
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/login`, options)
            const jsonData = await response.json();
            console.log(jsonData);
            setAccessToken(jsonData.accessToken);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen">
        <form className='flex gap-2 flex-col bg-amber-200 p-12 rounded-xl' onSubmit={logInUser}>
            <input className="border-2 border-rose-500 bg-rose-100 rounded-lg" value={username} onChange={(event) => (setUsername(event.target.value))} type="text" required />
            <input className="border-2 border-rose-500 bg-rose-100 rounded-lg" value={password} onChange={(event) => (setPassword(event.target.value))} type="password" required />
            <button className="cursor-pointer px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg" type="submit">Login</button>
        </form>
        </div>
    )
}

export default LogInPage