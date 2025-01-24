import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authUser.js";

const SignupPage = () => {
    const {searchParams}=new URL(document.location);
    const emailValue=searchParams.get('email');
    const [email,setEmail]=useState(emailValue||"");
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const {signup}=useAuthStore();
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        signup({email,userName,password});
    }

  return (
    <div className="h-screen w-full hero-bg">
        <header className="max-w-5xl mx-auto flex items-center justify-between p-4">
            <Link to={'/'}><img src="/netflix-logo.png" alt="logo" className="w-32 md:w-52"></img></Link>
        </header>
        <div className="flex justify-center items-center mt-8 mx-3">
            <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
                <h1 className="text-center text-white text-4xl font-bold mb-4">Sign Up</h1>
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 block">Email</label>
                        <input 
                        value={email}
                        type="email" 
                        onChange={(e)=>(setEmail(e.target.value))}
                        className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring" 
                        placeholder="you@example.com"
                        id="email"/>
                    </div>
                    <div>
                        <label htmlFor="userName" className="text-sm font-medium text-gray-300 block">Username</label>
                        <input 
                        value={userName}
                        onChange={(e)=>(setUserName(e.target.value))}
                        type="text" 
                        className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring" 
                        placeholder="john_doe123"
                        id="userName"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-300 block">Password</label>
                        <input 
                        value={password}
                        onChange={(e)=>(setPassword(e.target.value))}
                        type="password" 
                        className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring" 
                        placeholder="Enter Password"
                        id="password"/>
                    </div>
                    <button type="submit" className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
                        Sign Up
                    </button>
                </form>
                <div className="text-center text-gray-400">
                    Already have an account?{' '}
                    <Link to={'/login'} className="text-red-500 hover:underline font-medium">Sign In</Link>
                </div>
            </div>
        </div>

    </div>
  )
}

export default SignupPage
