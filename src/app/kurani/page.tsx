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

export default function ProjectDetail() {
  const [post, setPost] = useState<VelogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
 
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
            url_slug: 'LLM-프로젝트Vicuna',
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
          <LoadingText>Loading research paper...</LoadingText>
        </SpinnerContainer>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorBox>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Document Loading Error</ErrorTitle>
          <ErrorMessage>{error}</ErrorMessage>
          <RetryButton onClick={() => window.location.reload()}>Retry Loading</RetryButton>
        </ErrorBox>
      </ErrorContainer>
    );
  }

  if (post) {
    return (
      <Wrapper>
        <Header style={{ 
          opacity: scrollPosition > 100 ? 1 : 0,
          pointerEvents: scrollPosition > 100 ? 'all' : 'none'
        }}>
          <HeaderContainer>
            <Logo>Research Paper</Logo>
            <BackButton onClick={() => window.history.back()}>← Back to Portfolio</BackButton>
          </HeaderContainer>
        </Header>

        <PaperContainer>
          <PaperHeader>
            <PaperTitle>{post.title}</PaperTitle>
            <AuthorSection>
              <AuthorName>Yunsung Choi</AuthorName>
              <AuthorAffiliation>Computer Science & Software Engineering, Korea University Sejong Campus</AuthorAffiliation>
            </AuthorSection>
            <PaperMeta>
              <MetaItem>
                <MetaLabel>Date:</MetaLabel>
                <MetaValue>October - December , 2024</MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Category:</MetaLabel>
                <MetaValue>Research Project</MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>Keywords:</MetaLabel>
                <MetaValue>LLM, Machine Learning</MetaValue>
              </MetaItem>
            </PaperMeta>
          </PaperHeader>

          <PaperContent>
            <MarkdownContainer>
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ ...props }) => (
                    <ContentImage {...props} />
                  ),
                  h1: ({ ...props }) => (
                    <SectionHeading {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <SubsectionHeading {...props} />
                  ),
                  h3: ({ ...props }) => (
                    <SubsubsectionHeading {...props} />
                  ),
                  p: ({ ...props }) => (
                    <PaperParagraph {...props} />
                  ),
                  a: ({ ...props }) => (
                    <InlineLink {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                  code: ({ ...props }) => (
                    <InlineCode {...props} />
                  ),
                  pre: ({ ...props }) => (
                    <CodeBlock {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <UnorderedList {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <OrderedList {...props} />
                  ),
                  li: ({ ...props }) => (
                    <ListItem {...props} />
                  ),
                  blockquote: ({ ...props }) => (
                    <Quote {...props} />
                  ),
                }}
              >
                {post.body}
              </ReactMarkdown>
            </MarkdownContainer>
          </PaperContent>
        </PaperContainer>

        <NavigationFooter>
          <FooterInner>
            <FooterText>
              © 2024 <FooterStrong>Yeonsu Choi</FooterStrong> - Research Portfolio
            </FooterText>
            <BackToTop onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Back to Top ↑
            </BackToTop>
          </FooterInner>
        </NavigationFooter>
      </Wrapper>
    );
  }

  return null;
}

const spin = keyframes`
  to { transform: rotate(360deg); }
`;


const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  background-color: #f8f9fa;
  min-height: 100vh;
  font-family: 'Times New Roman', serif;
`;

const Header = styled.header.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  z-index: 100;
  transition: opacity 0.3s ease-in-out;
  border-bottom: 1px solid #e9ecef;
`;

const HeaderContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  max-width: 56rem;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-weight: 700;
  font-size: 1.25rem;
  color: #212529;
  font-family: 'Times New Roman', serif;
`;

const BackButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  color: #495057;
  font-weight: 500;
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Times New Roman', serif;
  
  &:hover {
    color: #212529;
  }
`;

const LoadingContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f8f9fa;
`;

const SpinnerContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Spinner = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  animation: ${spin} 1s linear infinite;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  border-top: 2px solid #212529;
  border-bottom: 2px solid #212529;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
`;

const LoadingText = styled.p.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  color: #495057;
  font-family: 'Times New Roman', serif;
`;

const ErrorContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f8f9fa;
`;

const ErrorBox = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  max-width: 32rem;
  text-align: center;
  padding: 2rem;
  background: white;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Times New Roman', serif;
`;

const ErrorIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h2.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #212529;
  font-family: 'Times New Roman', serif;
`;

const ErrorMessage = styled.p.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  color: #495057;
  margin-bottom: 1.5rem;
  font-family: 'Times New Roman', serif;
`;

const RetryButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  background-color: #212529;
  color: white;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: 1px solid #212529;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Times New Roman', serif;
  
  &:hover {
    background-color: #495057;
    border-color: #495057;
  }
`;

const PaperContainer = styled.main.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  max-width: 56rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 4rem);
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const PaperHeader = styled.header.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  text-align: center;
  padding: 2rem 0 3rem;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 3rem;
`;

const PaperTitle = styled.h1.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-size: 2.5rem;
  font-weight: bold;
  color: #212529;
  margin-bottom: 2rem;
  line-height: 1.2;
  font-family: 'Times New Roman', serif;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AuthorSection = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  margin-bottom: 2rem;
`;

const AuthorName = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 0.5rem;
  font-family: 'Times New Roman', serif;
`;

const AuthorAffiliation = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-size: 1rem;
  color: #495057;
  font-style: italic;
  font-family: 'Times New Roman', serif;
`;

const PaperMeta = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  margin-bottom: 2rem;
  text-align: left;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
`;

const MetaItem = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  display: flex;
  margin-bottom: 0.5rem;
  font-family: 'Times New Roman', serif;
`;

const MetaLabel = styled.span.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-weight: 600;
  color: #212529;
  min-width: 5rem;
  font-family: 'Times New Roman', serif;
`;

const MetaValue = styled.span.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  color: #495057;
  font-family: 'Times New Roman', serif;
`;

const PaperContent = styled.section.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  line-height: 1.8;
  color: #212529;
`;

const MarkdownContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-family: 'Times New Roman', serif;
`;

const ContentImage = styled.img.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  max-width: 100%;
  height: auto;
  margin: 2rem auto;
  display: block;
  border: 1px solid #dee2e6;
`;

const SectionHeading = styled.h2.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-size: 1.75rem;
  font-weight: bold;
  color: #212529;
  margin: 3rem 0 1.5rem;
  text-align: center;
  font-family: 'Times New Roman', serif;
`;

const SubsectionHeading = styled.h3.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-size: 1.5rem;
  font-weight: bold;
  color: #212529;
  margin: 2.5rem 0 1rem;
  font-family: 'Times New Roman', serif;
`;

const SubsubsectionHeading = styled.h4.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
  margin: 2rem 0 0.75rem;
  font-family: 'Times New Roman', serif;
`;

const PaperParagraph = styled.p.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  color: #212529;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  text-align: justify;
  text-indent: 1.5rem;
  font-size: 1rem;
  font-family: 'Times New Roman', serif;
`;

const InlineLink = styled.a.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  color: #0066cc;
  text-decoration: underline;
  font-family: 'Times New Roman', serif;
  
  &:hover {
    color: #004499;
  }
`;

const CodeBlock = styled.pre.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  padding: 1rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
`;

const InlineCode = styled.code.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-family: 'Courier New', monospace;
  background: #f8f9fa;
  padding: 0.125rem 0.25rem;
  border: 1px solid #dee2e6;
  font-size: 0.875rem;
`;

const UnorderedList = styled.ul.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  margin: 1.5rem 0;
  padding-left: 2rem;
  font-family: 'Times New Roman', serif;
`;

const OrderedList = styled.ol.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  margin: 1.5rem 0;
  padding-left: 2rem;
  font-family: 'Times New Roman', serif;
`;

const ListItem = styled.li.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  color: #212529;
  margin-bottom: 0.5rem;
  line-height: 1.8;
  font-family: 'Times New Roman', serif;
`;

const Quote = styled.blockquote.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  border-left: 3px solid #dee2e6;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #495057;
  font-style: italic;
  font-family: 'Times New Roman', serif;
`;

const NavigationFooter = styled.footer.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  background: #212529;
  color: white;
  padding: 1.5rem 0;
`;

const FooterInner = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  max-width: 56rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Times New Roman', serif;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterText = styled.p.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  color: #adb5bd;
  font-family: 'Times New Roman', serif;
`;

const FooterStrong = styled.span.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-weight: 600;
  color: #f8f9fa;
  font-family: 'Times New Roman', serif;
`;

const BackToTop = styled.button.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  background: none;
  border: none;
  color: #adb5bd;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
  font-family: 'Times New Roman', serif;
  
  &:hover {
    color: white;
  }
`;