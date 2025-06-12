'use client';
import styled from 'styled-components';
import { useClientOnly } from '../hooks/useClientOnly';

import { TechStackItem } from '../lib/github';
import { SectionTitle, SectionTitleHighlight } from '../hooks/ClientHome';

interface TechStackSectionProps {
  techStack: TechStackItem[];
}

export default function TechStackSection({ techStack }: TechStackSectionProps) {
  const isClient = useClientOnly();
  
  const defaultTechStack = [
    { 
      name: "React", 
      level: 90, 
      color: "#61DAFB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    { 
      name: "TypeScript", 
      level: 85, 
      color: "#3178C6",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
    },
    { 
      name: "JavaScript", 
      level: 88, 
      color: "#F7DF1E",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
    },
    { 
      name: "Styled Components", 
      level: 80, 
      color: "#DB7093",
      logo: "https://styled-components.com/logo.png"
    },
    { 
      name: "React Router", 
      level: 75, 
      color: "#CA4245",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactrouter/reactrouter-original.svg"
    },
    { 
      name: "Axios", 
      level: 85, 
      color: "#5A29E4",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg"
    },
    { 
      name: "MSW", 
      level: 70, 
      color: "#FF6B35",
      logo: "https://mswjs.io/logo.svg"
    },
    { 
      name: "MongoDB", 
      level: 78, 
      color: "#47A248",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
    },
    { 
      name: "Express", 
      level: 82, 
      color: "#000000",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
    },
    { 
      name: "Firebase", 
      level: 70, 
      color: "#FFCA28",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"
    },
    { 
      name: "JWT", 
      level: 75, 
      color: "#000000",
      logo: "https://jwt.io/img/pic_logo.svg"
    },
    { 
      name: "Redux", 
      level: 75, 
      color: "#764ABC",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
    },
    { 
      name: "Vite", 
      level: 80, 
      color: "#646CFF",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
    },
    { 
      name: "React Query", 
      level: 78, 
      color: "#FF4154",
      logo: "https://react-query-v3.tanstack.com/_next/static/images/emblem-light-628080660fddb35787ff6c77e97ca43e.svg"
    },
    { 
      name: "Tailwind CSS", 
      level: 85, 
      color: "#06B6D4",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg"
    }
  ];

  // 서버에서는 기본 스택, 클라이언트에서는 실제 데이터 또는 기본 스택
  const displayTechStack = isClient 
    ? (techStack.length > 0 ? techStack : defaultTechStack)
    : defaultTechStack;

    const TechLogo = [
      { 
        name: "React", 
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
      },
      { 
        name: "TypeScript", 
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
      },
      { 
        name: "JavaScript", 
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
      },
      { 
        name: "Styled Components", 
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/styledcomponents.svg"
      },
      { 
        name: "React Router", 
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactrouter/reactrouter-original.svg"
      },
      { 
        name: "Axios", 
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg"
      },
      { 
        name: "MSW", 
        logo: "https://raw.githubusercontent.com/mswjs/msw/main/media/msw-logo.svg"
      },
      { 
        name: "MongoDB", 
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
      },
      { 
        name: "Express", 
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
      },
      { 
        name: "Firebase", 
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"
      },
      { 
        name: "JWT", 
        logo: "https://jwt.io/img/pic_logo.svg"
      },
      { 
        name: "Redux", 
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
      },
      { 
        name: "Vite", 
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg"
      },
      { 
        name: "React Query", 
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/reactquery.svg"
      },
      { 
        name: "Tailwind CSS", 
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg"
      }
  ];

  return (
    <TechSection>
      <SectionTitle>
        Tech <SectionTitleHighlight>Stack</SectionTitleHighlight>
      </SectionTitle>
      
      {/* 정사각형 로고 그리드 섹션 */}
      <TechGrid>
        {TechLogo.map((tech, index) => (
          <TechItem key={index}>
            <TechLogoImg
              src={tech.logo} 
              alt={tech.name}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <TechName>{tech.name}</TechName>
          </TechItem>
        ))}
      </TechGrid>

      {/* GitHub 스타일 퍼센트 그래프 섹션 */}
      <ProgressSection>
        <ProgressTitle>Most Used Languages in GitHub</ProgressTitle>
        <ProgressGrid>
          {displayTechStack.filter((tech) => tech.level > 0).map((tech, index) => (
            <ProgressItem key={index}>
              <ProgressHeader>
                <ProgressIconWrapper>
                  <ProgressName>{tech.name}</ProgressName>
                </ProgressIconWrapper>
                <ProgressPercent>{tech.level}%</ProgressPercent>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill 
                  style={{ 
                    width: `${tech.level}%`, 
                    backgroundColor: tech.color 
                  }} 
                />
              </ProgressBar>
            </ProgressItem>
          ))}
        </ProgressGrid>
      </ProgressSection>
    </TechSection>
  );
}

const TechSection = styled.section`
  padding: 6rem 1.5rem;
  background: #fff;
  
  @media (max-width: 640px) {
    padding: 4rem 1rem;
  }
  
  @media (min-width: 641px) and (max-width: 1024px) {
    padding: 5rem 1.5rem;
  }
`;

// 정사방형 그리드 스타일
const TechGrid = styled.div`
  max-width: 70rem;
  margin: 0 auto 4rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  
  @media (max-width: 640px) {
    gap: 0.75rem;
    margin-bottom: 3rem;
  }
  
  @media (min-width: 641px) and (max-width: 1024px) {
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
  
  @media (min-width: 1025px) {
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
`;

const TechItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  aspect-ratio: 1;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 640px) {
    padding: 1rem;
    gap: 0.75rem;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    border-color: #d1d5db;
    background: #f9fafb;
  }
`;

const TechLogoImg = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: contain;
  
  @media (max-width: 640px) {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  @media (min-width: 641px) and (max-width: 1024px) {
    width: 3rem;
    height: 3rem;
  }
  
  @media (min-width: 1025px) {
    width: 4rem;
    height: 4rem;
  }
`;

const TechName = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 0.875rem;
  text-align: center;
  line-height: 1.2;
  
  @media (max-width: 640px) {
    font-size: 0.75rem;
  }
  
  @media (min-width: 641px) and (max-width: 1024px) {
    font-size: 0.875rem;
  }
  
  @media (min-width: 1025px) {
    font-size: 1rem;
  }
`;

// 프로그레스 바 스타일
const ProgressSection = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
  
  @media (max-width: 640px) {
    padding-top: 1.5rem;
  }
`;

const ProgressTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
  margin-bottom: 2rem;
  
  @media (max-width: 640px) {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

const ProgressGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProgressItem = styled.div`
  padding: 1.2rem;
  background: #f9fafb;
  border-radius: 1rem;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  
  @media (max-width: 640px) {
    padding: 1rem;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-color: #d1d5db;
  }
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const ProgressIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ProgressName = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 0.95rem;
  
  @media (max-width: 640px) {
    font-size: 0.85rem;
  }
`;

const ProgressPercent = styled.div`
  font-weight: 600;
  color: #4f46e5;
  font-size: 0.9rem;
  
  @media (max-width: 640px) {
    font-size: 0.8rem;
  }
`;

const ProgressBar = styled.div`
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 3px;
  transition: width 1.2s ease-out;
`;