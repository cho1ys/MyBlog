'use client';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useClientOnly } from '../hooks/useClientOnly';
import { useState } from 'react';

interface NavigationHeaderProps {
  scrollPosition: number;
}

export default function NavigationHeader({ scrollPosition }: NavigationHeaderProps) {
  const router = useRouter();
  const isClient = useClientOnly();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    {
      id: 5,
      title: 'E2E 테스트 경험',
      path: '/e2e-experience',
    },
  ];

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

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
        <MenuList className={isMenuOpen ? 'open' : ''}>
          {menuItems.map((item) => (
            <MenuItem key={item.id}>
              <MenuButton onClick={() => handleMenuItemClick(item.path)}>
                {item.title}
              </MenuButton>
            </MenuItem>
          ))}
        </MenuList>
        <HamburgerButton onClick={handleMenuClick} className={isMenuOpen ? 'open' : ''}>
          <span></span>
          <span></span>
          <span></span>
        </HamburgerButton>
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
  
  @media (max-width: 640px) {
    padding: 0.75rem 1rem;
  }
`;

const Logo = styled.div`
  font-weight: 800;
  font-size: 1.5rem;
  color: #4f46e5;
  cursor: pointer;
  
  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`;

const MenuList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 3rem;
    right: 0;
    bottom: 0;
    width: 70%;
    max-width: 300px;
    background: #bfbde3;
    flex-direction: column;
    padding: 8rem 2rem;
    height: 2rem;
    gap: 1rem;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    
    &.open {
      transform: translateX(0);
    }
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    gap: 1rem;
  }
`;

const MenuItem = styled.li`
  @media (max-width: 768px) {
    width: 100%;
    border-bottom: 1px solid #e5e7eb;  
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
  width: 100%;
  text-align: left;
  
  @media (min-width: 769px) {
    width: auto;
    text-align: center;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 0.9rem;
  }
  
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

const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  span {
    width: 100%;
    height: 3px;
    background-color: #4f46e5;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
  }
  
  &.open {
    span {
      &:first-child {
        transform: translateY(9px) rotate(45deg);
      }
      
      &:nth-child(2) {
        opacity: 0;
      }
      
      &:last-child {
        transform: translateY(-9px) rotate(-45deg);
      }
    }
  }
`;
