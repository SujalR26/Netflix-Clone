import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const AuthScreen = () => {
    const [email,setEmail]=useState("");
    const navigate=useNavigate();
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        navigate('/signup?email='+email);
    };
    
  return (
    <div className="hero-bg relative">
        <header className="max-w-5xl mx-auto flex items-center justify-between p-4 pb-10">
            <Link to={'/'}><img src="/netflix-logo.png" alt="logo" className="w-32 md:w-52"></img></Link>
            <Link to={'/login'} className="text-white bg-red-600 py-1 px-3 rounded">Sign In</Link>
        </header>
        {/*hero section*/}
        <div className="flex flex-col items-center justify-center text-center pt-10 pb-20 text-white max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Unlimited movies,<span className="block">TV shows and more</span></h1>
            <p className="text-lg mb-4 font-semibold">Starts at ₹149. Cancel at any time.</p>
            <p className="mb-4 mt-4">Ready to watch? Enter your email to create or restart your membership.</p>
            <form className="flex flex-col md:flex-row gap-4 w-3/5" onSubmit={handleFormSubmit}>
            <input 
                value={email}
                type="email" 
                onChange={(e)=>(setEmail(e.target.value))}
                className="p-4 rounded flex-1 bg-black/80 border border-gray-700 text-lg" 
                placeholder="Email address"
                id="email"/>
                <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center font-medium">
                    Get Started
                    <ChevronRight className="size-8 md:size-10"/>
                </button>
            </form>
        </div>

        {/*separator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden='true'/>

        {/* 1st section*/ }
        <div className="py-10 bg-black text-white">
            <div className="flex max-w-5xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
                {/*left side*/}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Enjoy on your TV</h2>
                    <p className="text-lg md:text-xl">
                        Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more. 
                    </p>
                </div>
                {/*right side*/}
                <div className="flex-1 relative">
                    <img src="/tv.png" alt="TV image" className="mt-4 z-20 relative"></img>
                    <video 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
                    playsInline
                    autoPlay={true}
                    muted
                    loop>
                        <source src="/hero-vid.m4v" type="video/mp4"></source>
                    </video>
                </div>
            </div>
        </div>

        {/*separator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden='true'/>

        {/*2nd section */}
        <div className="py-10 bg-black text-white">
            <div className="flex max-w-5xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
                {/*left side*/}
                <div className="flex-1 ">
                    <div className="relative">
                        <img src="/stranger-things-lg.png" alt="Stranger Things image" className="mt-4"></img>
                        <div className="flex items-center gap-2 absolute lg:bottom-5 bottom-1 left-1/2 -translate-x-1/2 bg-black w-2/3 lg:w-1/2 lg:h-24 h-16 border border-slate-500 rounded-md px-2">
                            <img src="/stranger-things-sm.png" alt="image" className="h-full"></img>
                            <div className="flex justify-between items-center w-full ">
                                <div className="flex flex-col gap-0">
                                    <span className="text-base lg:text-lg font-bold">Stranger Things</span>
                                    <span className="text-sm text-blue-500">Downloading...</span>
                                </div>
                                <img src="/download-icon.gif" alt="" className="h-12"></img>
                            </div>
                        </div>
                    </div>
                </div>
                {/*right side*/}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 ">Download your shows to watch offline</h2>
                    <p className="text-lg md:text-xl">
                        Save your favorites easily and always have something to watch. 
                    </p>
                </div>
            </div>
        </div>

        {/*separator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden='true'/>

        {/*3rd section */}
        <div className="py-10 bg-black text-white">
            <div className="flex max-w-5xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
                {/*left side*/}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Watch everywhere</h2>
                    <p className="text-lg md:text-xl">
                        Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV. 
                    </p>
                </div>
                {/*right side*/}
                <div className="flex-1 relative overflow-hidden">
                    <img src="/device-pile.png" alt="Device image" className="mt-4 z-20 relative"></img>
                    <video 
                    className="absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10 max-w-[63%]"
                    playsInline
                    autoPlay={true}
                    muted
                    loop>
                        <source src="/video-devices.m4v" type="video/mp4"></source>
                    </video>
                </div>
            </div>
        </div>

        {/*separator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden='true'/>

        {/*4th section */}
        <div className="py-10 bg-black text-white">
            <div className="flex max-w-5xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2">
                {/*left side*/}
                <div className="flex-1 relative">
                    <img src="/kids.png" alt="Kids" className="mt-4"></img>
                </div>
                {/*right side*/}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 ">Create profile for kids</h2>
                    <p className="text-lg md:text-xl">
                        Send kids on adventures with their favorite characters in a space made just for them-free with your membership.
                    </p>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default AuthScreen