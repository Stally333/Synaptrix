'use client'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { darkTheme } from './styles/theme'
import GlobalStyle from './styles/globalStyles'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
} 