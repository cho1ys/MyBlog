'use client';
import styled from 'styled-components';
import { SectionTitle } from '../page';

export default function ProfileTimelineSection() {
  const profileData = [
    { 
      year: "2022", 
      title: "토익 845점", 
      desc: "TOEIC 845점 취득 (Listening: , Reading: )",
      category: "certificate"
    },
    { 
      year: "2024", 
      title: "대학교 졸업", 
      desc: "고려대학교 세종캠퍼스 컴퓨터융합소프트웨어 학과 졸업 (학점: /4.5)",
      category: "education"
    },
  ];

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'education': return '#10b981'; // 초록색
      case 'certificate': return '#f59e0b'; // 주황색
      case 'project': return '#8b5cf6'; // 보라색
      case 'career': return '#ef4444'; // 빨간색
      default: return '#4f46e5'; // 기본 파란색
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
    <Timeline>
      <SectionTitle>나의 이력</SectionTitle>
      <TimelineContainer>
        {profileData.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineDot style={{ background: getCategoryColor(item.category) }} />
            <TimelineContent>
              <TimelineDate style={{ 
                background: getCategoryBg(item.category),
                color: getCategoryColor(item.category)
              }}>
                {item.year}
              </TimelineDate>
              <TimelineTitle>{item.title}</TimelineTitle>
              <TimelineDesc>{item.desc}</TimelineDesc>
              <CategoryTag style={{ 
                background: getCategoryBg(item.category),
                color: getCategoryColor(item.category)
              }}>
                {item.category === 'education' && '🎓 교육'}
                {item.category === 'certificate' && '📜 자격증'}
                {item.category === 'project' && '💻 프로젝트'}
                {item.category === 'career' && '🚀 커리어'}
              </CategoryTag>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </Timeline>
  );
}

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
    background: linear-gradient(to bottom, #10b981, #f59e0b, #8b5cf6, #ef4444);
    
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
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4f46e5;
  border: 3px solid #fff;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  
  @media (min-width: 768px) {
    left: auto;
    right: -8px;
    
    ${TimelineItem}:nth-child(even) & {
      right: auto;
      left: -8px;
    }
  }
`;

const TimelineContent = styled.div`
  background: #fff;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const TimelineDate = styled.div`
  display: inline-block;
  background: #eef2ff;
  color: #4f46e5;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const TimelineTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
  line-height: 1.4;
`;

const TimelineDesc = styled.p`
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
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