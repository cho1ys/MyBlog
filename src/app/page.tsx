'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const menuItems = [
    { id: 1, title: "About Me", path: "/about", description: "저를 소개합니다" },
    { id: 2, title: "Skills", path: "/skills", description: "기술 스택" },
    { id: 3, title: "Project 1", path: "/ohmovie", description: "OhMovie" },
    { id: 4, title: "Project 2", path: "/project2", description: "Shopping Mall" },
    { id: 5, title: "Project 3", path: "/ohmovie", description: "OhMovie" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <ul className="flex space-x-6 justify-center">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => router.push(item.path)}
                  className="text-gray-700 hover:text-blue-500 font-semibold text-lg transition-all"
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(item.path)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-6 cursor-pointer transform hover:-translate-y-2 transition-transform"
            >
              <div className="flex flex-col h-full">
                <h2 className="text-2xl font-extrabold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h2>
                <p className="text-gray-600 flex-grow">{item.description}</p>
                <div className="mt-6">
                  <span className="text-blue-500 group-hover:text-blue-700 font-medium text-sm">
                    자세히 보기 →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-700">
            <p className="text-sm">
              © 2024 <span className="font-semibold">My Portfolio</span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
