import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled, { keyframes } from 'styled-components';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

const SLUGS = [
  '데브코스-3차-프로젝트-AppleNote',
  '데브코스2차-프로젝트-오영화',
  '데브코스-최종-프로젝트-GoodBuyUs',
  'LLM-프로젝트Vicuna',
];

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: SLUGS.map(slug => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

interface VelogPost {
  id: string;
  title: string;
  body: string;
  thumbnail: string | null;
  url: string;
}

export const getStaticProps: GetStaticProps<{ post: VelogPost | null }> = async ({ params }) => {
  const slug = params?.slug as string;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'yschoi0119',
      url_slug: slug,
    }),
  });
  if (!response.ok) return { notFound: true };
  const data = await response.json();
  return {
    props: { post: data.data.post ?? null },
    revalidate: 60 * 60 * 12, // 12시간마다 재생성
  };
};

export default function ProjectPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!post) return <div>포스트를 찾을 수 없습니다.</div>;
  return (
    <Wrapper>
      <Header>
        <HeaderContainer>
          <Logo>{post.title}</Logo>
          <BackButton onClick={() => window.history.back()}>← Back to Home</BackButton>
        </HeaderContainer>
      </Header>
      <ProjectHero $backgroundImage={post.thumbnail || undefined}>
        <ProjectHeroOverlay />
        <ProjectHeroContent>
          <ProjectCategory>Project Showcase</ProjectCategory>
          <ProjectTitle>{post.title}</ProjectTitle>
        </ProjectHeroContent>
      </ProjectHero>
      <ContentContainer>
        <ContentWrapper>
          <MarkdownContainer>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </MarkdownContainer>
        </ContentWrapper>
      </ContentContainer>
      <Footer>
        <FooterInner>
          <FooterText>
            © 2024 <FooterStrong>YunSung</FooterStrong>. All rights reserved.
          </FooterText>
        </FooterInner>
      </Footer>
    </Wrapper>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  background-color: #f9fafb;
  min-height: 100vh;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  z-index: 100;
  transition: opacity 0.3s ease-in-out;
`;

const HeaderContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-weight: 800;
  font-size: 1.5rem;
  color: #4f46e5;
  cursor: pointer;
`;

const BackButton = styled.button`
  color: #4b5563;
  font-weight: 600;
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #4f46e5;
  }
`;

const ProjectHero = styled.section<{ $backgroundImage?: string }>`
  height: 50vh;
  min-height: 400px;
  position: relative;
  background-image: ${props => props.$backgroundImage ? `url(${props.$backgroundImage})` : 'linear-gradient(135deg, #818cf8 0%, #4f46e5 100%)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  transition: background-position 0.1s linear;
`;

const ProjectHeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4));
`;

const ProjectHeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 80rem;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  color: white;
  animation: ${fadeIn} 0.5s ease-out;
`;

const ProjectCategory = styled.div`
  text-transform: uppercase;
  background: rgba(79, 70, 229, 0.8);
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  backdrop-filter: blur(4px);
`;

const ProjectTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContentContainer = styled.main`
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const ContentWrapper = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const MarkdownContainer = styled.div`
  padding: 2rem;
  
  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const Footer = styled.footer`
  background: #1f2937;
  color: white;
  padding: 2rem 0;
`;

const FooterInner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterText = styled.p`
  color: #9ca3af;
`;

const FooterStrong = styled.span`
  font-weight: 600;
  color: #f9fafb;
`; 