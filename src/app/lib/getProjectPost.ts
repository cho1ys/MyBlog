export interface VelogPost {
  id: string;
  title: string;
  body: string;
  thumbnail: string | null;
  url: string;
  createdAt?: string;
}

export async function getProjectPost(slug: string): Promise<VelogPost | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'yschoi0119',
      url_slug: slug,
    }),
    // SSG/SSR 캐싱 옵션
    next: { revalidate: 60 * 60 * 12 },
  });
  if (!response.ok) return null;
  const data = await response.json();
  return data.data.post ?? null;
} 