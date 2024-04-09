'use client'
import { useRouter } from 'next/navigation'
import { AuthProvider } from './userContext';

export default function Home() {
  const router = useRouter();

  const handleLoginButtonClick = () => {
    router.push('/login'); // Navigates to the login page
  };

  return (
    // a welcome page with two option one is login, and the other is register

    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to PSLMS</h1>
        <div className="flex space-x-4">
          <button onClick={handleLoginButtonClick} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Login
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Register
          </button>
        </div>
      </div>
      <div className="mt-8">
        {/* logo maybe */}
      </div>
    </div>

  );
}
