'use client';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useClientOnly } from '../hooks/useClientOnly';

interface NavigationHeaderProps {
  scrollPosition: number;
}

export default function NavigationHeader({ scrollPosition }: NavigationHeaderProps) {
  const router = useRouter();
  const isClient = useClientOnly();

  const headerStyle = isClient ? {
    opacity: scrollPosition > 300 ? 1 : 0,
    pointerEvents: scrollPosition > 300 ? 'all' as const : 'none' as const
  } : {
    opacity: 0,
    pointerEvents: 'none' as const
  };
  const menuItems = [
    {
      id: 1,
      title: 'OhMovie',
      path: '/ohmovie',
     
    },
    {
      id: 2,
      title: 'AppleNote',
      path: '/applenote',
     
    },
    {
      id: 3,
      title: 'GoodBuyUs',
      path: '/goodbuyus',
     
    },
    {
      id: 4,
      title: 'KUrani',
      path: '/kurani',
     
    },
  ];

  return (
    <Header style={headerStyle}>
      <Nav>
        <Logo onClick={() => {
          if (isClient) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}>
          YunSung
        </Logo>
        <MenuList>
          {menuItems.map((item) => (
            <li key={item.id}>
              <MenuButton onClick={() => router.push(item.path)}>
                {item.title}
              </MenuButton>
            </li>
          ))}
        </MenuList>
      </Nav>
    </Header>
  );
}


const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  z-index: 100;
  transition: opacity 0.3s ease-in-out;
`;

const Nav = styled.nav`
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-weight: 800;
  font-size: 1.5rem;
  color: #4f46e5;
  cursor: pointer;
`;

const MenuList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  color: #374151;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 0.5rem 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #4f46e5;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #4f46e5;
    
    &::after {
      width: 100%;
    }
  }
`;
