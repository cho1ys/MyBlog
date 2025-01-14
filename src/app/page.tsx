'use client';
import { useRouter } from 'next/navigation';


export default function Home() {

    const router = useRouter();

    const handleButtonClick = () => {
      router.push('/ohmovie');
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
     
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        >
          OhMovie
        </button>
     
    </div>
  );
}
