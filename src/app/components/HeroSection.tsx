'use client';
import styled, { keyframes } from 'styled-components';
import { useClientOnly } from '../hooks/useClientOnly';
import { GitHubStats } from '../types';

interface HeroSectionProps {
  scrollPosition: number;
  onViewPortfolio: () => void;
  onContact: () => void;
  githubStats: GitHubStats;
}

export default function HeroSection({ 
  scrollPosition, 
  onViewPortfolio, 
  onContact, 
  githubStats 
}: HeroSectionProps) {
  const isClient = useClientOnly();

  const getDynamicStats = () => {
    if (!isClient) {
      // 서버 사이드에서는 기본값 반환
      return [
        { label: "완성된 프로젝트", value: "5+", icon: "🚀" },
        { label: "사용 기술", value: "10+", icon: "⚡" },
        { label: "개발 경험", value: "2년", icon: "📅" },
        { label: "커밋 수", value: "500+", icon: "💻" }
      ];
    }

    // 클라이언트에서는 실제 데이터 사용
    return [
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
  };

  const dynamicStats = getDynamicStats();

  return (
    <Hero>
      <HeroContent>
        <HeroTitle 
          style={{ 
            transform: isClient ? `translateY(${scrollPosition * 0.5}px)` : 'translateY(0px)' 
          }}
        >
          프론트엔드 개발자 <HeroHighlight>최윤성</HeroHighlight>입니다
        </HeroTitle>
        <HeroSubtitle 
          style={{ 
            transform: isClient ? `translateY(${scrollPosition * 0.3}px)` : 'translateY(0px)' 
          }}
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
          <PrimaryButton onClick={onViewPortfolio}>작업물 보기</PrimaryButton>
          <SecondaryButton onClick={onContact}>연락하기</SecondaryButton>
        </HeroButtons>
      </HeroContent>
      <ScrollIndicator />
    </Hero>
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

const Button = styled.button`
  padding: 0.75rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
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