import { Inter } from 'next/font/google'
import './global.scss'
import {Header, Katex} from "@/app/ui";
import StoreProvider from "@/app/StoreProvider";
import { AntdRegistry } from '@ant-design/nextjs-registry';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <StoreProvider>
      <AntdRegistry>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </AntdRegistry>
    </StoreProvider>
    </html>
  )
}
