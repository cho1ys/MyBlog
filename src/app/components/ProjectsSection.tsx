'use client';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SectionTitle, SectionTitleHighlight } from '../page';
import { MenuItem } from '../types';

interface ProjectsSectionProps {
  menuItems: MenuItem[];
}

export default function ProjectsSection({ menuItems }: ProjectsSectionProps) {
  const router = useRouter();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <Main id="main-content">
      <SectionTitle>
        <SectionTitleHighlight>Projects</SectionTitleHighlight>
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
  );
}

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