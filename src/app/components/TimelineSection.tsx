'use client';
import styled from 'styled-components';
import { SectionTitle } from '../page';

export default function TimelineSection() {
  const timelineData = [
    { year: "2022", title: "웹 개발 시작", desc: "HTML, CSS, JavaScript 기초 학습" },
    { year: "2023", title: "React 마스터", desc: "리액트를 활용한 첫 개인 프로젝트 완성" },
    { year: "2024", title: "Next.js & TypeScript", desc: "서버 사이드 렌더링과 타입 안전성 학습" },
    { year: "현재", title: "포트폴리오 완성", desc: "새로운 도전을 찾는 중" }
  ];

  return (
    <Timeline>
      <SectionTitle>개발 여정</SectionTitle>
      <TimelineContainer>
        {timelineData.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineDot />
            <TimelineContent>
              <TimelineDate>{item.year}</TimelineDate>
              <TimelineTitle>{item.title}</TimelineTitle>
              <TimelineDesc>{item.desc}</TimelineDesc>
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
