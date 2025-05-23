'use client';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { analyzeTechStack, fetchGitHubRepos, fetchGitHubUser, fetchTotalCommits, TechStackItem } from './api/datas/route';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;


type GitHubStats = {
  totalCommits: number;
  totalRepos: number;
  techStack: TechStackItem[];
  createdAt: string | null;
  loading: boolean;
};
export default function Home() {
  const router = useRouter();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    totalCommits: 0,
    totalRepos: 0,
    techStack: [],
    createdAt: null,
    loading: true
  });
  
  
  
  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        const [userInfo, repos, totalCommits, techStack] = await Promise.all([
          fetchGitHubUser(),
          fetchGitHubRepos(),
          fetchTotalCommits(),
          analyzeTechStack()
        ]);

        setGithubStats({
          totalCommits,
          totalRepos: repos.length,
          techStack,
          createdAt: userInfo?.created_at ?? null,
          loading: false
        });
      } catch (error) {
        console.error('GitHub 데이터 로딩 실패:', error);
        setGithubStats(prev => ({ ...prev, loading: false }));
      }
    };

    loadGitHubData();
  }, []);
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

  const menuItems = [
    { 
      id: 1, 
      title: "About Me", 
      path: "/about", 
      description: "저를 소개합니다",
      icon: "👨‍💻",
      color: "#4F46E5"
    },
    { 
      id: 2, 
      title: "Skills", 
      path: "/skills", 
      description: "React, Next.js, TypeScript 등 프론트엔드 개발에 필요한 기술 스택들을 소개합니다",
      icon: "🛠️",
      color: "#10B981"
    },
    { 
      id: 3, 
      title: "OhMovie", 
      path: "/ohmovie", 
      description: "영화 정보 검색 및 추천 서비스. React와 영화 API를 활용한 반응형 웹 애플리케이션",
      icon: "🎬",
      color: "#F59E0B"
    },
    { 
      id: 4, 
      title: "AppleNote", 
      path: "/applenote", 
      description: "애플 스타일의 메모 웹앱. React와 LocalStorage를 활용한 SPA",
      icon: "📝",
      color: "#EC4899"
    },
    { 
      id: 5, 
      title: "GoodBuyUs", 
      path: "/goodbuyus", 
      description: "소셜 플랫폼 서비스. 사용자 간의 소통과 연결을 돕는 커뮤니티 기반 웹 애플리케이션",
      icon: "👥",
      color: "#10B981",
      category: "Project",
      tech: ["React", "Next.js", "Node.js"]
    },
    { 
      id: 6, 
      title: "Contact", 
      path: "/contact", 
      description: "함께 일하고 싶으시다면 연락주세요!",
      icon: "📬",
      color: "#3B82F6",
      category: "Contact"
    }
  ];
  const dynamicStats = [
    { 
      label: "완성된 프로젝트", 
      value: githubStats.loading ? "..." : `${githubStats.totalRepos}+`, 
      icon: "🚀" 
    },
    { 
      label: "사용 기술", 
      value: githubStats.loading ? "..." : `${githubStats.techStack.length}+`, 
      icon: "⚡" 
    },
    { 
      label: "개발 경험", 
      value: githubStats.loading 
        ? "..." 
        : githubStats.createdAt 
          ? `${new Date().getFullYear() - new Date(githubStats.createdAt).getFullYear()}년` 
          : "2년", 
      icon: "📅" 
    },
    { 
      label: "커밋 수", 
      value: githubStats.loading ? "..." : `${githubStats.totalCommits}+`, 
      icon: "💻" 
    }
  ];
  const defaultTechStack = [
    { name: "React", level: 90, color: "#61DAFB" },
    { name: "Next.js", level: 85, color: "#000000" },
    { name: "TypeScript", level: 80, color: "#3178C6" },
    { name: "JavaScript", level: 95, color: "#F7DF1E" },
    { name: "HTML/CSS", level: 90, color: "#E34F26" },
    { name: "Node.js", level: 75, color: "#339933" }
  ];

  // 사용할 기술 스택 (GitHub 데이터 우선, 없으면 기본값 사용)
  const displayTechStack = githubStats.techStack.length > 0 ? githubStats.techStack : defaultTechStack;


  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Hero>
          <HeroContent>
            <HeroTitle
              style={{ transform: `translateY(${scrollPosition * 0.5}px)` }}
            >
              프론트엔드 개발자 <HeroHighlight>최윤성</HeroHighlight>입니다
            </HeroTitle>
            <HeroSubtitle
              style={{ transform: `translateY(${scrollPosition * 0.3}px)` }}
            >
              사용자 경험을 중요시하는 웹 개발자
            </HeroSubtitle>
             <StatsContainer>
              {dynamicStats.map((stat, index) => (
                <StatItem key={index}>
                  <StatIcon>{stat.icon}</StatIcon>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </StatItem>
              ))}
            </StatsContainer>
            <HeroButtons>
              <PrimaryButton onClick={() => {
                const mainSection = document.getElementById('main-content');
                if (mainSection) {
                  mainSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}>
                작업물 보기
              </PrimaryButton>
              <SecondaryButton onClick={() => router.push('/contact')}>
                연락하기
              </SecondaryButton>
            </HeroButtons>
          </HeroContent>
          <ScrollIndicator />
        </Hero>

        <Header style={{ 
          opacity: scrollPosition > 300 ? 1 : 0,
          pointerEvents: scrollPosition > 300 ? 'all' : 'none'
        }}>
          <Nav>
            <Logo onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>Portfolio</Logo>
            <MenuList>
              {menuItems.map((item) => (
                <li key={item.id}>
                  <MenuButton onClick={() => router.push(item.path)}>
                    {item.title}
                  </MenuButton>
                </li>
              ))}
            </MenuList>
            <ThemeToggle>
              <span role="img" aria-label="light mode">🌞</span>
            </ThemeToggle>
          </Nav>
        </Header>
        <TechSection>
          <SectionTitle>
            기술 <SectionTitleHighlight>스택</SectionTitleHighlight>
          </SectionTitle>
          <TechGrid>
            {displayTechStack.map((tech, index) => (
              <TechItem key={index}>
                <TechHeader>
                  <TechName>{tech.name}</TechName>
                  <TechPercent>{tech.level}%</TechPercent>
                </TechHeader>
                <TechBar>
                  <TechProgress 
                    style={{ 
                      width: `${tech.level}%`, 
                      backgroundColor: tech.color 
                    }} 
                  />
                </TechBar>
              </TechItem>
            ))}
          </TechGrid>
        </TechSection>

        <Main id="main-content">
          <SectionTitle>
            <SectionTitleHighlight>Projects</SectionTitleHighlight> & Skills
          </SectionTitle>
          <Grid>
            {menuItems.map((item) => (
              <Card 
                key={item.id} 
                onClick={() => router.push(item.path)}
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
                style={{ 
                  borderColor: activeCard === item.id ? item.color : 'transparent',
                  transform: activeCard === item.id ? 'translateY(-1rem) scale(1.03)' : 'translateY(0) scale(1)'
                }}
              >
                <CardIcon style={{ background: item.color }}>{item.icon}</CardIcon>
                <CardTitle>{item.title}</CardTitle>
                <CardDesc>{item.description}</CardDesc>
                <CardLink style={{ color: item.color }}>
                  자세히 보기 
                  <ArrowIcon>→</ArrowIcon>
                </CardLink>
              </Card>
            ))}
          </Grid>
        </Main>

        <Timeline>
          <SectionTitle>개발 여정</SectionTitle>
          <TimelineContainer>
            <TimelineItem>
              <TimelineDot />
              <TimelineContent>
                <TimelineDate>2022</TimelineDate>
                <TimelineTitle>웹 개발 시작</TimelineTitle>
                <TimelineDesc>HTML, CSS, JavaScript 기초 학습</TimelineDesc>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineDot />
              <TimelineContent>
                <TimelineDate>2023</TimelineDate>
                <TimelineTitle>React 마스터</TimelineTitle>
                <TimelineDesc>리액트를 활용한 첫 개인 프로젝트 완성</TimelineDesc>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineDot />
              <TimelineContent>
                <TimelineDate>2024</TimelineDate>
                <TimelineTitle>Next.js & TypeScript</TimelineTitle>
                <TimelineDesc>서버 사이드 렌더링과 타입 안전성 학습</TimelineDesc>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineDot />
              <TimelineContent>
                <TimelineDate>현재</TimelineDate>
                <TimelineTitle>포트폴리오 완성</TimelineTitle>
                <TimelineDesc>새로운 도전을 찾는 중</TimelineDesc>
              </TimelineContent>
            </TimelineItem>
          </TimelineContainer>
        </Timeline>

        <Footer>
          <FooterInner>
            <FooterGrid>
              <FooterCol>
                <FooterTitle>Portfolio</FooterTitle>
                <FooterText>
                  프론트엔드 개발자 최윤성의 포트폴리오입니다.
                  창의적인 웹 경험을 만들어내는 것을 좋아합니다.
                </FooterText>
              </FooterCol>
              <FooterCol>
                <FooterTitle>Links</FooterTitle>
                <FooterLinks>
                  <FooterLink>GitHub</FooterLink>
                  <FooterLink>LinkedIn</FooterLink>
                  <FooterLink>Twitter</FooterLink>
                </FooterLinks>
              </FooterCol>
              <FooterCol>
                <FooterTitle>Contact</FooterTitle>
                <FooterContact>
                  <FooterContactItem>email@example.com</FooterContactItem>
                  <FooterContactItem>Seoul, South Korea</FooterContactItem>
                </FooterContact>
              </FooterCol>
            </FooterGrid>
            <FooterDivider />
            <FooterCopyright>
              © 2024 <FooterStrong>My Portfolio</FooterStrong>. All rights reserved.
            </FooterCopyright>
          </FooterInner>
        </Footer>
      </Wrapper>
    </>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scroll = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(10px); opacity: 0.5; }
  100% { transform: translateY(0); opacity: 1; }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
`;

const Hero = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%);
  padding: 0 2rem;
`;

const HeroContent = styled.div`
  animation: ${fadeIn} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  transition: transform 0.5s ease-out;
  
  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;

const HeroHighlight = styled.span`
  color: #fbbf24;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 10px;
    background-color: rgba(251, 191, 36, 0.3);
    z-index: -1;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  transition: transform 0.5s ease-out;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;
const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 3rem 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`;

const Button = styled.button`
  padding: 0.75rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
`;

const PrimaryButton = styled(Button)`
  background: #fff;
  color: #6366f1;
  border: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    width: 6px;
    height: 6px;
    background: #fff;
    border-radius: 50%;
    transform: translateX(-50%);
    animation: ${scroll} 2s infinite;
  }
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

const Nav = styled.nav`
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

const MenuList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  color: #374151;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 0.5rem 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #4f46e5;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #4f46e5;
    
    &::after {
      width: 100%;
    }
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const TechSection = styled.section`
  padding: 6rem 1.5rem;
  background: #fff;
`;

const TechGrid = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TechItem = styled.div`
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 1rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const TechHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const TechName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

const TechPercent = styled.div`
  font-weight: 600;
  color: #4f46e5;
`;

const TechBar = styled.div`
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

const TechProgress = styled.div`
  height: 100%;
  border-radius: 4px;
  transition: width 1s ease;
`;
const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitleHighlight = styled.span`
  color: #4f46e5;
`;

const Main = styled.main`
  padding: 8rem 1.5rem;
  max-width: 80rem;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 1rem;
  border: 2px solid transparent;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #4f46e5, #a5b4fc);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
`;

const CardIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
  transition: color 0.2s;
`;

const CardDesc = styled.p`
  color: #4b5563;
  flex-grow: 1;
  font-size: 1rem;
  line-height: 1.6;
`;

const CardLink = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.875rem;
  margin-top: 1.5rem;
  transition: gap 0.3s ease;
`;

const ArrowIcon = styled.span`
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
  
  ${CardLink}:hover & {
    transform: translateX(5px);
  }
`;

const Timeline = styled.section`
  background: #f9fafb;
  padding: 6rem 1.5rem;
`;

const TimelineContainer = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 20px;
    width: 2px;
    background: #d1d5db;
    
    @media (min-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const TimelineItem = styled.div`
  margin-bottom: 4rem;
  position: relative;
  padding-left: 3rem;
  
  @media (min-width: 768px) {
    padding-left: 0;
    width: 45%;
    margin-left: auto;
    
    &:nth-child(even) {
      margin-left: 0;
      margin-right: auto;
      text-align: right;
    }
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 16px;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4f46e5;
  border: 2px solid #fff;
  z-index: 1;
  
  @media (min-width: 768px) {
    left: auto;
    right: -6px;
    
    ${TimelineItem}:nth-child(even) & {
      right: auto;
      left: -6px;
    }
  }
`;

const TimelineContent = styled.div`
  background: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const TimelineDate = styled.div`
  display: inline-block;
  background: #eef2ff;
  color: #4f46e5;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const TimelineTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const TimelineDesc = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
`;

const Footer = styled.footer`
  background: #1f2937;
  color: #fff;
`;

const FooterInner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 4rem 1.5rem 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FooterCol = styled.div``;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #f9fafb;
`;

const FooterText = styled.p`
  color: #9ca3af;
  line-height: 1.6;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled.a`
  color: #9ca3af;
  transition: color 0.2s;
  cursor: pointer;
  
  &:hover {
    color: #f9fafb;
  }
`;

const FooterContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterContactItem = styled.div`
  color: #9ca3af;
`;

const FooterDivider = styled.div`
  height: 1px;
  background: #374151;
  margin: 3rem 0 2rem;
`;

const FooterCopyright = styled.div`
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
`;

const FooterStrong = styled.span`
  font-weight: 600;
  color: #f9fafb;
`;