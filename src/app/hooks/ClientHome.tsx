'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { useGitHubData } from './useGitHubData';
import { useClientOnly } from './useClientOnly';

// 클라이언트 전용 컴포넌트들을 동적 임포트 (SSR off)
const HeroSection = dynamic(() => import('../components/HeroSection'), { ssr: false });
const NavigationHeader = dynamic(() => import('../components/NavigationHeader'), { ssr: false });
const TechStackSection = dynamic(() => import('../components/TechStackSection'), { ssr: false });
const ProjectsSection = dynamic(() => import('../components/ProjectsSection'), { ssr: false });
const ProfileSection = dynamic(() => import('../components/SimpleProfileSection'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });

export default function ClientHome() {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);
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
    {
      id: 1,
      title: 'OhMovie',
      path: '/ohmovie',
      description: '영화 정보 검색 및 추천 서비스. React와 영화 API를 활용한 반응형 웹 애플리케이션',
      icon: '🎬',
      color: '#F59E0B',
    },
    {
      id: 2,
      title: 'AppleNote',
      path: '/applenote',
      description: '애플 스타일의 메모 웹앱. React와 LocalStorage를 활용한 SPA',
      icon: '📝',
      color: '#EC4899',
    },
    {
      id: 3,
      title: 'GoodBuyUs',
      path: '/goodbuyus',
      description: '소셜 플랫폼 서비스. 사용자 간의 소통과 연결을 돕는 커뮤니티 기반 웹 애플리케이션',
      icon: '👥',
      color: '#10B981',
    },
  ];

  const handleViewPortfolio = () => {
    if (isClientReady) {
      document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContact = () => {
    router.push('/contact');
  };

  if (!isClientReady) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
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
      <NavigationHeader scrollPosition={scrollPosition} menuItems={menuItems} />
      <TechStackSection techStack={githubStats.techStack} />
      <ProjectsSection menuItems={menuItems} />
      <ProfileSection />
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