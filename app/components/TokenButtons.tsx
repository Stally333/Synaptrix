'use client'
import styled, { keyframes } from 'styled-components'

const glow = keyframes`
  0% { box-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00; }
  50% { box-shadow: 0 0 10px #00ff00, 0 0 15px #00ff00, 0 0 20px #00ff00; }
  100% { box-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00; }
`

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1.5rem;
  z-index: 10;
`

const TokenButton = styled.button`
  background: linear-gradient(
    180deg, 
    rgba(0, 255, 0, 0.15) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border: 1px solid #00ff00;
  color: #00ff00;
  padding: 0.8rem 1.5rem;
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${glow} 2s infinite;
  text-transform: uppercase;
  backdrop-filter: blur(5px);

  &:hover {
    background: linear-gradient(
      180deg, 
      rgba(0, 255, 0, 0.2) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    transform: translateY(-2px);
    animation: ${glow} 1s infinite;
  }

  &:active {
    transform: translateY(0);
    background: linear-gradient(
      180deg, 
      rgba(0, 255, 0, 0.15) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
  }
`

export const TokenButtons = () => {
  return (
    <ButtonContainer>
      <TokenButton>Buy $SYNA</TokenButton>
      <TokenButton>Trade $SYNA</TokenButton>
      <TokenButton>Stake $SYNA</TokenButton>
      <TokenButton>Invest $SYNA</TokenButton>
    </ButtonContainer>
  )
} 