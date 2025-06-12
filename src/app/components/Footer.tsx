'use client';
import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterOuter>
      <FooterInner>
        <FooterGrid>
          <FooterCol>
            <FooterTitle>YunSung</FooterTitle>
            <FooterText>
              프론트엔드 개발자 최윤성의 포트폴리오입니다.
              <br/>
              창의적인 웹 경험을 만들어내는 것을 좋아합니다.
            </FooterText>
          </FooterCol>
          <FooterCol>
            <FooterTitle>Links</FooterTitle>
            <FooterLinks>
              <FooterLink href='https://github.com/cho1ys'>GitHub</FooterLink>
              <FooterLink href='https://velog.io/@yschoi0119/posts'>Velog</FooterLink>
            </FooterLinks>
          </FooterCol>
          <FooterCol>
            <FooterTitle>Contact</FooterTitle>
            <FooterContact>
              <FooterContactItem>yschoi0119@naver.com</FooterContactItem>
              <FooterContactItem>010-4935-8654</FooterContactItem>
              <FooterContactItem>Seoul, South Korea</FooterContactItem>
            </FooterContact>
          </FooterCol>
        </FooterGrid>
        <FooterDivider />
        <FooterCopyright>
          © 2025 <FooterStrong>My Portfolio</FooterStrong>. All rights reserved.
        </FooterCopyright>
      </FooterInner>
    </FooterOuter>
  );
}

const FooterOuter = styled.footer`
  background: #1f2937;
  color: #fff;
`;
const FooterInner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 4rem 1.5rem 2rem;
  
  @media (max-width: 640px) {
    padding: 3rem 1rem 1.5rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FooterCol = styled.div``;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #f9fafb;
  
  @media (max-width: 640px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

const FooterText = styled.p`
  color: #9ca3af;
  line-height: 1.6;
  
  @media (max-width: 640px) {
    font-size: 0.9rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled.a`
  color: #9ca3af;
  transition: color 0.2s;
  cursor: pointer;
  
  &:hover {
    color: #f9fafb;
  }
`;

const FooterContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterContactItem = styled.div`
  color: #9ca3af;
`;

const FooterDivider = styled.div`
  height: 1px;
  background: #374151;
  margin: 3rem 0 2rem;
`;

const FooterCopyright = styled.div`
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
`;

const FooterStrong = styled.span`
  font-weight: 600;
  color: #f9fafb;
`;