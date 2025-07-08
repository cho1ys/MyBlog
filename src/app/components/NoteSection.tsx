'use client';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const blogPosts = [
  {
    id: 1,
    title: 'E2E 테스트 경험: Cypress',
    description: 'Cypress를 활용한 프론트엔드 E2E 테스트 자동화 경험을 정리한 글',
    path: '/e2e-experience',
    tags: ['Cypress', 'E2E', '테스트', '자동화'],
    thumbnail: '/cypress.svg',
  },
  {
    id: 2,
    title: 'Next.js 로딩 속도 개선 경험',
    description: 'Next.js에서 페이지 로딩 속도를 최적화한 실전 경험을 정리한 글',
    path: '/nextjs-loading-optimize-experience',
    tags: ['Next.js', '성능', '로딩속도', '최적화'],
    thumbnail: '/next.svg',
  },
];

export default function BlogPostsSection() {
  const router = useRouter();

  return (
     <Main id="main-content">
     <SectionTitle>
        <SectionTitleHighlight>Notes</SectionTitleHighlight>
      </SectionTitle>
      <Grid>
        {blogPosts.map(post => (
          <Card key={post.id} onClick={() => router.push(post.path)}>
            <CardHeader>
              {post.thumbnail && <Thumbnail src={post.thumbnail} alt={post.title} />}
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardDesc>{post.description}</CardDesc>
            <TagList>
              {post.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagList>
          </Card>
        ))}
      </Grid>
    </Main>
  );
}

const Main = styled.main`
  padding: 8rem 1.5rem;
  margin: 0 auto;
  background: #f5f3ff;
  @media (max-width: 640px) {
    padding: 4rem 1rem;
  }
  
  @media (min-width: 641px) and (max-width: 1024px) {
    padding: 6rem 1.5rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  text-align: center;
  margin-bottom: 5rem;
  margin-top: -3rem;
`;

export const SectionTitleHighlight = styled.span`
  color: #3d2861;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 80rem;
  margin: 0 auto;
  
`;

const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  border: 2px solid transparent;
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.08);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 2.5rem 2rem;
  min-width: 340px;
  max-width: 440px;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 90%;
  position: relative;
  overflow: hidden;
  @media (max-width: 640px) {
    padding: 1.5rem;
    min-width: 0;
    max-width: 100%;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #a5b4fc, #7c3aed);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
  &:hover::before {
    transform: scaleX(1);
  }
  &:hover {
    box-shadow: 0 8px 32px rgba(139, 92, 246, 0.15);
    border: 2px solid #a5b4fc;
    transform: translateY(-1rem) scale(1.03);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Thumbnail = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: #ede9fe;
  padding: 6px;
  object-fit: contain;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #3730a3;
  margin: 0;
  transition: color 0.2s;
`;

const CardDesc = styled.p`
  color: #4b5563;
  flex-grow: 1;
  font-size: 1.1rem;
  margin-top : 1.5rem;
  line-height: 1.6;
  @media (max-width: 640px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const TagList = styled.div`
margin-top : 2rem;
  display: flex;
  gap: 1.7rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: #a5b4fc;
  color: #3730a3;
  font-size: 0.85rem;
  padding: 0.2rem 0.9rem;
  border-radius: 9999px;
  font-weight: 600;
`; 