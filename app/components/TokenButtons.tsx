'use client'
import styled, { keyframes } from 'styled-components'

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3), 0 0 10px rgba(255, 255, 255, 0.2), 0 0 15px rgba(255, 255, 255, 0.1); }
  50% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2); }
  100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.3), 0 0 10px rgba(255, 255, 255, 0.2), 0 0 15px rgba(255, 255, 255, 0.1); }
`

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 100;
`

const TokenButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: white;
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.9rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${glow} 4s infinite;
  text-transform: uppercase;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
  }

  &:active {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
  }
`

export const TokenButtons = () => {
  return (
    <ButtonContainer>
      <TokenButton>BUY $SYNA</TokenButton>
      <TokenButton>TRADE $SYNA</TokenButton>
      <TokenButton>STAKE $SYNA</TokenButton>
      <TokenButton>INVEST $SYNA</TokenButton>
    </ButtonContainer>
  )
} 