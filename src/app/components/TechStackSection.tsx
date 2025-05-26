'use client';
import styled from 'styled-components';
import { useClientOnly } from '../hooks/useClientOnly';
import { SectionTitle, SectionTitleHighlight } from '../page';
import { TechStackItem } from '../api/datas/route';

interface TechStackSectionProps {
  techStack: TechStackItem[];
}

export default function TechStackSection({ techStack }: TechStackSectionProps) {
  const isClient = useClientOnly();
  
  const defaultTechStack = [
    { name: "React", level: 90, color: "#61DAFB" },
    { name: "Next.js", level: 85, color: "#000000" },
    { name: "TypeScript", level: 80, color: "#3178C6" },
    { name: "JavaScript", level: 95, color: "#F7DF1E" },
    { name: "HTML/CSS", level: 90, color: "#E34F26" },
    { name: "Node.js", level: 75, color: "#339933" }
  ];

  // 서버에서는 기본 스택, 클라이언트에서는 실제 데이터 또는 기본 스택
  const displayTechStack = isClient 
    ? (techStack.length > 0 ? techStack : defaultTechStack)
    : defaultTechStack;

  return (
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
  );
}

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
