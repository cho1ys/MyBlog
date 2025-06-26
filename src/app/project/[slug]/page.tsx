'use client';

import { getProjectPost, VelogPost } from '../../lib/getProjectPost';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';

const SLUGS = [
  '데브코스-3차-프로젝트-AppleNote',
  '데브코스2차-프로젝트-오영화',
  '데브코스-최종-프로젝트-GoodBuyUs',
  'LLM-프로젝트Vicuna',
];

export async function generateStaticParams() {
  return SLUGS.map(slug => ({ slug }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const post: VelogPost | null = await getProjectPost(params.slug);
  if (!post) return notFound();

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>{post.title}</h1>
      {post.thumbnail && (
        <img src={post.thumbnail} alt={post.title} style={{ width: '100%', borderRadius: '1rem', marginBottom: '2rem' }} />
      )}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
    </main>
  );
} 