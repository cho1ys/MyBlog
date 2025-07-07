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
}

export default function E2EExperience() {
  const [post, setPost] = useState<VelogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const postUrl = 'https://velog.io/@yschoi0119/Cypress-%EC%82%AC%EC%9A%A9%EA%B8%B0';
  const sourceUrl = 'https://github.com/cho1ys/GoodBuyUs'
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            url_slug: 'Cypress-사용기',
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

  if (loading) {
    return (
      <LoadingContainer>
        <SpinnerContainer>
          <Spinner />
          <LoadingText>Loading E2E Test Experience...</LoadingText>
        </SpinnerContainer>
      </LoadingContainer>
    );
  }
  if (error) {
    return (
      <ErrorContainer>
        <ErrorBox>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>{error}</ErrorMessage>
          <RetryButton onClick={() => window.location.reload()}>Retry</RetryButton>
        </ErrorBox>
      </ErrorContainer>
    );
  }
  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <Wrapper>
      <Header style={{
        opacity: scrollPosition > 100 ? 1 : 0,
        pointerEvents: scrollPosition > 100 ? 'all' : 'none',
      }}>
        <HeaderContainer>
          <Logo>Cypress E2E</Logo>
          <BackButton onClick={() => window.history.back()}>← Back to Home</BackButton>
        </HeaderContainer>
      </Header>

      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <Category>Test Experience</Category>
          <HeroTitle>{post.title}</HeroTitle>
          <HeroMeta>
            <HeroDate>
              <DateIcon>🧪</DateIcon>
              25. 05 ~ 24. 06
            </HeroDate>
            <HeroSourceLink href={postUrl} target="_blank" rel="noopener noreferrer">
              View Original Post
              <LinkIcon>↗</LinkIcon>
            </HeroSourceLink>
          </HeroMeta>
        </HeroContent>
      </HeroSection>

      <ContentContainer>
        <ContentWrapper>
          <MarkdownContainer>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ ...props }) => <ContentImage {...props} />, 
                h1: ({ ...props }) => <ContentHeading1 {...props} />, 
                h2: ({ ...props }) => <ContentHeading2 {...props} />, 
                h3: ({ ...props }) => <ContentHeading3 {...props} />, 
                p: ({ ...props }) => <ContentParagraph {...props} />, 
                a: ({ ...props }) => <ContentLink {...props} target="_blank" rel="noopener noreferrer" />, 
                code: ({ ...props }) => <ContentCode {...props} />, 
                pre: ({ ...props }) => <ContentPre {...props} />, 
                ul: ({ ...props }) => <ContentList {...props} />, 
                ol: ({ ...props }) => <ContentOrderedList {...props} />, 
                li: ({ ...props }) => <ContentListItem {...props} />, 
                blockquote: ({ ...props }) => <ContentBlockquote {...props} />,
              }}
            >
              {post.body}
            </ReactMarkdown>
          </MarkdownContainer>
        </ContentWrapper>
        <Sidebar>
          <SidebarCard>
            <SidebarCardTitle>Info</SidebarCardTitle>
            <SidebarItem>
              <SidebarItemLabel>Tool</SidebarItemLabel>
              <SidebarItemValue>Cypress</SidebarItemValue>
            </SidebarItem>
            <SidebarItem>
              <SidebarItemLabel>Type</SidebarItemLabel>
              <SidebarItemValue>E2E, Integration</SidebarItemValue>
            </SidebarItem>
            <SidebarItem>
              <SidebarItemLabel>Keywords</SidebarItemLabel>
              <TechStack>
                <TechBadge>자동화</TechBadge>
                <TechBadge>테스트</TechBadge>
                <TechBadge>Cypress</TechBadge>
                <TechBadge>프론트엔드</TechBadge>
              </TechStack>
            </SidebarItem>
            <SidebarButton href={sourceUrl} target="_blank" rel="noopener noreferrer">
            View Source
            </SidebarButton>
          </SidebarCard>
          <SidebarCard>
            <SidebarCardTitle>Related</SidebarCardTitle>
            <RelatedProjectsList>
              <RelatedProject>
                <RelatedProjectLink href="/goodbuyus">
                  <RelatedProjectTitle>GoodBuyUs</RelatedProjectTitle>
                  <RelatedProjectDesc>공동구매 서비스</RelatedProjectDesc>
                </RelatedProjectLink>
              </RelatedProject>
            </RelatedProjectsList>
          </SidebarCard>
        </Sidebar>
      </ContentContainer>

      <Footer>
        <FooterInner>
          <FooterText>
            © {new Date().getFullYear()} <FooterStrong>YunSung</FooterStrong>. All rights reserved.
          </FooterText>
          <BackToTop onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to Top ↑
          </BackToTop>
        </FooterInner>
      </Footer>
    </Wrapper>
  );
}

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  background-color: #f6fefb;
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
  color: #16a34a;
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
    color: #16a34a;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f7ef 0%, #f6fefb 50%, #fff 100%);
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Spinner = styled.div`
  animation: ${spin} 1s linear infinite;
  border-radius: 9999px;
  height: 3rem;
  width: 3rem;
  border-top: 3px solid #16a34a;
  border-bottom: 3px solid #16a34a;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
`;

const LoadingText = styled.p`
  color: #4b5563;
  font-weight: 500;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e0f7ef 0%, #f6fefb 50%, #fff 100%);
`;

const ErrorBox = styled.div`
  max-width: 32rem;
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.5s ease-out;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1f2937;
`;

const ErrorMessage = styled.p`
  color: #4b5563;
  margin-bottom: 2rem;
`;

const RetryButton = styled.button`
  background-color: #16a34a;
  color: white;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #15803d;
  }
`;

const HeroSection = styled.section`
  height: 50vh;
  min-height: 400px;
  position: relative;
  background: linear-gradient(135deg, #bbf7d0 0%, #16a34a 100%);
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  transition: background-position 0.1s linear;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2));
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 80rem;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  color: white;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Category = styled.div`
  text-transform: uppercase;
  background: rgba(22, 163, 74, 0.8);
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  backdrop-filter: blur(4px);
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
`;

const HeroDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
`;

const DateIcon = styled.span`
  font-size: 1rem;
`;

const HeroSourceLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const LinkIcon = styled.span`
  transition: transform 0.2s;
  ${HeroSourceLink}:hover & {
    transform: translateX(2px) translateY(-2px);
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

const ContentImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 0.75rem;
  margin: 2rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
  }
`;

const ContentHeading1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #166534;
  margin: 2rem 0 1.5rem;
  border-bottom: 2px solid #bbf7d0;
  padding-bottom: 0.75rem;
`;

const ContentHeading2 = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #166534;
  margin: 2rem 0 1rem;
`;

const ContentHeading3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #166534;
  margin: 1.5rem 0 1rem;
`;

const ContentParagraph = styled.p`
  color: #334155;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
`;

const ContentLink = styled.a`
  color: #16a34a;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  &:hover {
    color: #15803d;
    text-decoration: underline;
  }
`;

const ContentPre = styled.pre`
  background: #f0fdf4;
  border-radius: 0.5rem;
  padding: 1.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid #bbf7d0;
`;

const ContentCode = styled.code`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  background: #dcfce7;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  white-space: pre-wrap;
`;

const ContentList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
`;

const ContentOrderedList = styled.ol`
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
`;

const ContentListItem = styled.li`
  color: #334155;
  margin-bottom: 0.75rem;
  line-height: 1.7;
`;

const ContentBlockquote = styled.blockquote`
  border-left: 4px solid #16a34a;
  padding-left: 1.5rem;
  margin: 1.5rem 0;
  color: #6ee7b7;
  font-style: italic;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (max-width: 1023px) {
    grid-row: 1;
  }
`;

const SidebarCard = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const SidebarCardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #166534;
  margin-bottom: 1.5rem;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 2rem;
    height: 2px;
    background-color: #16a34a;
  }
`;

const SidebarItem = styled.div`
  margin-bottom: 1.5rem;
`;

const SidebarItemLabel = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #6ee7b7;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const SidebarItemValue = styled.div`
  color: #166534;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechBadge = styled.span`
  background: #bbf7d0;
  color: #166534;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const SidebarButton = styled.a`
  display: inline-block;
  background-color: #16a34a;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
  text-decoration: none;
  margin-top: 0.5rem;
  transition: background-color 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #15803d;
  }
`;

const RelatedProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RelatedProject = styled.div`
  transition: transform 0.2s;
  &:hover {
    transform: translateX(4px);
  }
`;

const RelatedProjectLink = styled.a`
  display: block;
  text-decoration: none;
`;

const RelatedProjectTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #166534;
  margin-bottom: 0.25rem;
  transition: color 0.2s;
  ${RelatedProjectLink}:hover & {
    color: #16a34a;
  }
`;

const RelatedProjectDesc = styled.p`
  font-size: 0.875rem;
  color: #6ee7b7;
`;

const Footer = styled.footer`
  background: #166534;
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
  color: #bbf7d0;
`;

const FooterStrong = styled.span`
  font-weight: 600;
  color: #f6fefb;
`;

const BackToTop = styled.button`
  background: none;
  border: none;
  color: #bbf7d0;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: white;
  }
`; 