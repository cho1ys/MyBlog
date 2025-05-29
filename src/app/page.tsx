'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useGitHubData } from './hooks/useGitHubData';
import { useClientOnly } from './hooks/useClientOnly';
import styled from 'styled-components';

// 동적 임포트로 클라이언트에서만 렌더링
const HeroSection = dynamic(() => import('./components/HeroSection'), {
  ssr: false
});

const NavigationHeader = dynamic(() => import('./components/NavigationHeader'), {
  ssr: false
});

const TechStackSection = dynamic(() => import('./components/TechStackSection'), {
  ssr: false
});

const ProjectsSection = dynamic(() => import('./components/ProjectsSection'), {
  ssr: false
});

const TimelineSection = dynamic(() => import('./components/TimelineSection'), {
  ssr: false
});

const Footer = dynamic(() => import('./components/Footer'), {
  ssr: false
});

export default function Home() {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const githubStats = useGitHubData();
  const isClientReady = useClientOnly();

  useEffect(() => {
    if (!isClientReady) return;

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClientReady]);

  const menuItems = [
    // { id: 1, title: "About Me", path: "/about", description: "저를 소개합니다", icon: "👨‍💻", color: "#4F46E5" },
    // { id: 2, title: "Skills", path: "/skills", description: "React, Next.js, TypeScript 등 프론트엔드 개발에 필요한 기술 스택들을 소개합니다", icon: "🛠️", color: "#10B981" },
    { id: 1, title: "OhMovie", path: "/ohmovie", description: "영화 정보 검색 및 추천 서비스. React와 영화 API를 활용한 반응형 웹 애플리케이션", icon: "🎬", color: "#F59E0B" },
    { id: 2, title: "AppleNote", path: "/applenote", description: "애플 스타일의 메모 웹앱. React와 LocalStorage를 활용한 SPA", icon: "📝", color: "#EC4899" },
    { id: 3, title: "GoodBuyUs", path: "/goodbuyus", description: "소셜 플랫폼 서비스. 사용자 간의 소통과 연결을 돕는 커뮤니티 기반 웹 애플리케이션", icon: "👥", color: "#10B981" },
    // { id: 6, title: "Contact", path: "/contact", description: "함께 일하고 싶으시다면 연락주세요!", icon: "📬", color: "#3B82F6" }
  ];

  const handleViewPortfolio = () => {
    if (isClientReady) {
      document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContact = () => {
    router.push('/contact');
  };

  // 클라이언트가 준비되지 않았다면 로딩 표시
  if (!isClientReady) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Poppins, sans-serif'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Wrapper>
      <HeroSection 
        scrollPosition={scrollPosition}
        onViewPortfolio={handleViewPortfolio}
        onContact={handleContact}
        githubStats={githubStats}
      />
      <NavigationHeader 
        scrollPosition={scrollPosition}
        menuItems={menuItems}
      />
      <TechStackSection techStack={githubStats.techStack} />
      <ProjectsSection menuItems={menuItems} />
      <TimelineSection />
      <Footer />
    </Wrapper>
  );
}


const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f2937;
  text-align: center;
  margin-bottom: 3rem;
`;

export const SectionTitleHighlight = styled.span`
  color: #4f46e5;
`;
