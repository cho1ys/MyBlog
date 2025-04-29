'use client';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();

  const menuItems = [
    { id: 1, title: "About Me", path: "/about", description: "저를 소개합니다" },
    { id: 2, title: "Skills", path: "/skills", description: "기술 스택" },
    { id: 3, title: "Project 1", path: "/ohmovie", description: "OhMovie" },
    { id: 4, title: "Project 2", path: "/applenote", description: "AppleNote" },
    { id: 5, title: "Project 3", path: "/ohmovie", description: "OhMovie" }
  ];

  return (
    <Wrapper>
      {/* Header */}
      <Header>
        <Nav>
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

      {/* Main Content */}
      <Main>
        <Grid>
          {menuItems.map((item) => (
            <Card key={item.id} onClick={() => router.push(item.path)}>
              <CardTitle>{item.title}</CardTitle>
              <CardDesc>{item.description}</CardDesc>
              <div style={{ marginTop: "1.5rem" }}>
                <CardMore>자세히 보기 →</CardMore>
              </div>
            </Card>
          ))}
        </Grid>
      </Main>

      {/* Footer */}
      <Footer>
        <FooterInner>
          <FooterText>
            <FooterP>
              © 2024 <FooterStrong>My Portfolio</FooterStrong>. All rights reserved.
            </FooterP>
          </FooterText>
        </FooterInner>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f3f4f6 0%, #f9fafb 50%, #fff 100%);
`;

const Header = styled.header`
  position: fixed;
  top: 0; left: 0; right: 0;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  z-index: 10;
`;

const Nav = styled.nav`
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;
`;

const MenuList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const MenuButton = styled.button`
  color: #374151;
  font-weight: 600;
  font-size: 1.125rem;
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: #3b82f6;
  }
`;

const Main = styled.main`
  padding-top: 7rem;
  padding-bottom: 4rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Grid = styled.div`
  max-width: 80rem;
  margin: 0 auto;
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
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  transition: box-shadow 0.2s, transform 0.2s;
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  &:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    transform: translateY(-0.5rem);
  }
`;

const CardTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 0.75rem;
  transition: color 0.2s;
  ${Card}:hover & {
    color: #2563eb;
  }
`;

const CardDesc = styled.p`
  color: #4b5563;
  flex-grow: 1;
`;

const CardMore = styled.span`
  color: #3b82f6;
  font-weight: 500;
  font-size: 0.875rem;
  transition: color 0.2s;
  ${Card}:hover & {
    color: #1d4ed8;
  }
`;

const Footer = styled.footer`
  background: #f3f4f6;
  border-top: 1px solid #e5e7eb;
`;

const FooterInner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const FooterText = styled.div`
  text-align: center;
  color: #374151;
`;

const FooterP = styled.p`
  font-size: 0.875rem;
`;

const FooterStrong = styled.span`
  font-weight: 600;
`;
