'use client';
import React from 'react';
import styled from 'styled-components';
import { SectionTitle, SectionTitleHighlight } from '../hooks/ClientHome';


export default function SimpleProfileSection() {
  const profileData = [
    { 
      title: "토익 845점", 
      desc: "TOEIC 845점 취득 (Listening: 425점, Reading: 420점)",
      category: "certificate"
    },
    { 
      title: "대학교 졸업", 
      desc: ["고려대학교 세종캠퍼스 컴퓨터융합소프트웨어학과 졸업",
        " (학점: 2.89 / 4.5)"],
      category: "education"
    },
    { 
      title: "LLM 연구 경험", 
      desc: ["졸업 작품으로 LLM 연구 경험"],
      category: "project"
    },
    { 
      title: "Programmers 프론트엔드 부트캠프 이수", 
      desc: ["Programmers 프론트엔드 부트캠프 이수"],
      category: "project, education"
    },
  ];

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'education': return '#10b981';
      case 'certificate': return '#f59e0b';
      case 'project': return '#8b5cf6';
      case 'career': return '#ef4444';
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
            <ProfileContent>
              <ProfileTitle>{item.title}</ProfileTitle>
              <ProfileDesc> 
                 {Array.isArray(item.desc)
                  ? item.desc.map((line, idx) => <div key={idx}>{line}</div>)
                  : item.desc}
              </ProfileDesc>
              <CategoryTagContainer>
                {item.category.split(', ').map((cat, idx) => (
                  <CategoryTag key={idx} style={{ 
                    background: getCategoryBg(cat.trim()),
                    color: getCategoryColor(cat.trim())
                  }}>
                    {cat.trim() === 'education' && '🎓 교육'}
                    {cat.trim() === 'certificate' && '📜 자격증'}
                    {cat.trim() === 'project' && '💻 프로젝트'}
                    {cat.trim() === 'career' && '🚀 커리어'}
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

const ProfileSection = styled.section`
  background: #f9fafb;
  padding: 6rem 1.5rem;
`;

const ProfileContainer = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ProfileCard = styled.div`
  position: relative;
`;

const ProfileContent = styled.div`
  background: #fff;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  height: 135px;
  position: relative;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ProfileTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-top: 0.75rem;
  line-height: 1.4;
`;

const ProfileDesc = styled.div`
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const CategoryTagContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const CategoryTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: #f3f4f6;
  color: #6b7280;
`;