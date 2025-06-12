'use client';
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { SectionTitle, SectionTitleHighlight } from '../hooks/ClientHome';


export default function SimpleProfileSection() {
  const router = useRouter();
  
  const profileData = [
    { 
      title: "대학교 졸업", 
      desc: ["고려대학교 세종캠퍼스 컴퓨터융합소프트웨어학과 졸업",
        " (학점: 2.89 / 4.5)"],
      category: "education"
    },
    { 
      title: "LLM 프로젝트 경험", 
      desc: ["졸업 작품으로 LLM 프로젝트 경험"],
      category: "project",
      clickable: true,
      onClick: () => router.push('/kurani')
    },
    { 
      title: "토익 835점", 
      desc: "TOEIC 835점 취득 (Listening: 445점, Reading: 390점)",
      category: "certificate"
    },
    { 
      title: "프로그래머스 프론트엔드 부트캠프 이수", 
      desc: ["프로그래머스 데브코스: 클라우드 기반 프론트엔드 엔지니어링 과정 이수"],
      category: "education"
    },
  ];

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'education': return '#10b981';
      case 'certificate': return '#f59e0b';
      case 'project': return '#8b5cf6';
      default: return '#4f46e5';
    }
  };

  const getCategoryBg = (category: string) => {
    switch(category) {
      case 'education': return '#d1fae5';
      case 'certificate': return '#fef3c7';
      case 'project': return '#ede9fe';
      case 'career': return '#fee2e2';
      default: return '#eef2ff';
    }
  };

  return (
    <ProfileSection>
      <SectionTitle><SectionTitleHighlight>Experience &</SectionTitleHighlight> Education</SectionTitle>
      <ProfileContainer>
        {profileData.map((item, index) => (
          <ProfileCard key={index}>
            <ProfileContent 
              clickable={item.clickable}
              onClick={item.onClick}
            >
              <ProfileTitle>
                {item.title}
                {item.clickable && <LinkIcon>🔗</LinkIcon>}
              </ProfileTitle>
              <ProfileDesc> 
                 {Array.isArray(item.desc)
                  ? item.desc.map((line, idx) => <div key={idx}>{line}</div>)
                  : item.desc}
              </ProfileDesc>
              {item.clickable && <ClickHint>자세히 보기 →</ClickHint>}
              <CategoryTagContainer>
                {item.category.split(', ').map((cat, idx) => (
                  <CategoryTag key={idx} style={{ 
                    background: getCategoryBg(cat.trim()),
                    color: getCategoryColor(cat.trim())
                  }}>
                    {cat.trim() === 'education' && '🎓 교육'}
                    {cat.trim() === 'certificate' && '📜 자격증'}
                    {cat.trim() === 'project' && '💻 프로젝트'}
                  </CategoryTag>
                ))}
              </CategoryTagContainer>
            </ProfileContent>
          </ProfileCard>
        ))}
      </ProfileContainer>
    </ProfileSection>
  );
}

const ProfileSection = styled.section.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  background: #f9fafb;
  padding: 6rem 1.5rem;
`;

const ProfileContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  max-width: 64rem;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ProfileCard = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  position: relative;
`;
const ProfileContent = styled.div.withConfig({
  shouldForwardProp: (prop) => !['clickable', 'backgroundImage'].includes(prop),
})<{ clickable?: boolean }>`
  background: #fff;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  height: 135px;
  position: relative;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    ${props => props.clickable && `
      border-color: #8b5cf6;
      background: #fefbff;
    `}
  }
  
  ${props => props.clickable && `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 0.75rem;
      border: 2px solid transparent;
      background: linear-gradient(45deg, #8b5cf6, #06b6d4) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover::after {
      opacity: 0.3;
    }
  `}
`;

const ProfileTitle = styled.h3.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-top: 0.75rem;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LinkIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  font-size: 0.9rem;
  opacity: 0.7;
`;

const ClickHint = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: #8b5cf6;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  
  ${ProfileContent}:hover & {
    opacity: 1;
  }
`;

const ProfileDesc = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const CategoryTagContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const CategoryTag = styled.span.withConfig({
  shouldForwardProp: (prop) => !['backgroundImage'].includes(prop),
})`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: #f3f4f6;
  color: #6b7280;
`;