'use client';
import styled from 'styled-components';

import { SectionTitle, SectionTitleHighlight } from '../hooks/ClientHome';



export default function TechStackSection() {
 
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
        name: "Redux", 
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
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
  max-width: 60rem;
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
