// write a login page with a form that has two input fields, one for email and the other for password
// and a submit button with the text "Login"
"use client"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import  { createContext, useState, useContext } from 'react';


export default function Login() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState(null);
    
   

    const router = useRouter();

    const handleInputChange = (event) => {
        setEmail(event.target.value);
    }

    const handleLoginButtonClick = () => {
        // get the text of the email and password fields
        // send a request to the server to authenticate the user
        
        sessionStorage.setItem('email', email);
 
        router.replace('/mypage'); // Navigates to the mypage page
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">Welcome to PSLMS</h1>
            </div>
            <div className="mt-8">
                <form>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="border text-slate-500 border-gray-300 px-4 py-2 rounded-md"
                            value={email}
                            onChange={handleInputChange} // Handle input change
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border text-slate-500 border-gray-300 px-4 py-2 rounded-md"
                        />
                        
                        <button onClick={handleLoginButtonClick} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            <Link  href="/mypage" className='flex flex-col space-y-4'> Login</Link>
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}