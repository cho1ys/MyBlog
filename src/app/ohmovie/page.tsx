'use client';

import styled, { keyframes } from 'styled-components';
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
  const [post, setPost] = useState<VelogPost | null>(null);
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
            username: 'yschoi0119',
            url_slug: '데브코스2차-프로젝트-오영화',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const data = await response.json();
        setPost(data.data.post);
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
      <Centered>
        <Spinner />
      </Centered>
    );
  }

  if (error) {
    return (
      <Centered>
        <ErrorBox>
          <ErrorTitle>Error</ErrorTitle>
          <p>{error}</p>
        </ErrorBox>
      </Centered>
    );
  }

  if (post) {
    return (
      <Main>
        <Title>Project3 - Oh Movie</Title>
        <Article key={post.id}>
          {post.thumbnail ? (
            <ThumbnailWrapper>
              <Thumbnail src={post.thumbnail} alt={post.title} />
              <GradientOverlay />
            </ThumbnailWrapper>
          ) : (
            <NoThumbnail />
          )}
          <ArticleContent>
            <ArticleLink href={post.url} target="_blank" rel="noopener noreferrer">
              <ArticleTitle>{post.title}</ArticleTitle>
              <ArticleBody>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
              </ArticleBody>
              <ArticleFooter>
                <time>{formatDate(post.createdAt)}</time>
              </ArticleFooter>
            </ArticleLink>
          </ArticleContent>
        </Article>
      </Main>
    );
  }

  return null;
}

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  animation: ${spin} 1s linear infinite;
  border-radius: 9999px;
  height: 3rem;
  width: 3rem;
  border-top: 2px solid #3b82f6;
  border-bottom: 2px solid #3b82f6;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
`;

const ErrorBox = styled.div`
  color: #ef4444;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Main = styled.main`
  max-width: 72rem;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 3rem;
  text-align: center;
`;

const Article = styled.article`
  background: #fff;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  transition: box-shadow 0.3s, transform 0.3s;
  &:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    transform: translateY(-0.25rem);
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  height: 12rem;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  ${Article}:hover & {
    transform: scale(1.05);
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
  opacity: 0;
  transition: opacity 0.3s;
  ${Article}:hover & {
    opacity: 1;
  }
`;

const NoThumbnail = styled.div`
  height: 12rem;
  background: linear-gradient(to right, #3b82f6, #a78bfa);
`;

const ArticleContent = styled.div`
  padding: 1.5rem;
`;

const ArticleLink = styled.a`
  display: block;
`;

const ArticleTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  color: #1f2937;
  transition: color 0.2s;
  ${Article}:hover & {
    color: #2563eb;
  }
`;

const ArticleBody = styled.p`
  color: #4b5563;
  margin-bottom: 1rem;
`;

const ArticleFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
`;
