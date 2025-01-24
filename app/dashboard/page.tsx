'use client'
import React from 'react'
import styled from 'styled-components'

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  position: relative;
`

const Header = styled.header`
  background: rgba(0, 0, 0, 0.8);
  border-bottom: 1px solid ${props => props.theme.colors.primary}40;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 20px ${props => props.theme.colors.primary}20;
`

const Logo = styled.div`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
`

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
`

const NavLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 0.9rem;
  opacity: 0.8;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
    opacity: 1;
  }
`

const MainContent = styled.div`
  position: relative;
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Dashboard() {
  return (
    <DashboardContainer>
      <Header>
        <Logo>SYNAPTRIX</Logo>
        <Navigation>
          <NavLink href="#">Dashboard</NavLink>
          <NavLink href="#">Neural Interface</NavLink>
          <NavLink href="#">Analytics</NavLink>
          <NavLink href="#">Settings</NavLink>
        </Navigation>
      </Header>
      <MainContent>
        {/* Placeholder for the removed BrainViz component */}
      </MainContent>
    </DashboardContainer>
  )
} 