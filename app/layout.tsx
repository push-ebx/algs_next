import { Inter } from 'next/font/google'
import './global.scss'
import {Header, Katex} from "@/app/ui";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // @ts-ignore
  return (
    <html lang="en">

      <body className={inter.className}>
        <Header />
        <Katex />
        {children}
      </body>
    </html>
  )
}
