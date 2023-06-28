import { Press_Start_2P } from 'next/font/google'
import './globals.css'

const gameFont = Press_Start_2P({ weight: "400" ,subsets: ['latin'] })

export const metadata = {
  title: 'Jogo da Mémoria LG',
  description: 'Author: Robson Ribeiro',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={gameFont.className}>{children}</body>
    </html>
  )
}
