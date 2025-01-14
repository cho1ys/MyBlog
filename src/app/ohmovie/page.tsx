'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface VelogPost {
  id: string;
  title: string;
  body: string;
  thumbnail: string | null;
  url: string;
  createdAt: string;
}

export default function Home() {
  const [post, setPost] = useState<VelogPost | null>(null); // 하나의 post 객체를 상태로 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
         const response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'yschoi0119', // Velog 사용자 이름
            url_slug: '데브코스2차-프로젝트-오영화', // Velog 포스트 URL 슬러그
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
      
        const data = await response.json();
        setPost(data.data.post); // 하나의 포스트만 받아와서 설정
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }


  if (post) {
    return (
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl font-bold mb-12 text-center">Project3 - Oh Movie</h1>
        <article
          key={post.id}
          className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          {post.thumbnail ? (
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          )}
          <div className="p-6">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <time>{formatDate(post.createdAt)}</time>
               
              </div>
            </a>
          </div>
        </article>
      </main>
    );
  }

 
}
