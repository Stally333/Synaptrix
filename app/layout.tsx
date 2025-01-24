import React from 'react'
import type { Metadata } from 'next'
import StyledComponentsRegistry from '../lib/registry'
import { Providers } from './providers'
import { Rajdhani, IBM_Plex_Mono } from 'next/font/google'

const rajdhani = Rajdhani({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
})

export const metadata: Metadata = {
  title: 'Synaptrix - Neuralis 1.0',
  description: 'Advanced EEG-based brain-computer interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="preload" 
          as="fetch" 
          href="https://sketchfab.com/models/7a27c17fd6c0488bb31ab093236a47fb/embed" 
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${rajdhani.variable} ${ibmPlexMono.variable}`}>
        <StyledComponentsRegistry>
          <Providers>
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
} 