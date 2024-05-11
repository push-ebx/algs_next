import {Inter} from 'next/font/google'
import './global.scss'
import {Header} from "@/app/ui";
import StoreProvider from "@/app/StoreProvider";
import {AntdRegistry} from '@ant-design/nextjs-registry';
import {ConfigProvider} from "antd";

const inter = Inter({subsets: ['latin']})

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <StoreProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#41a0ff',
            colorText: '#343434',
          }
        }}
      >
        <AntdRegistry>
          <body className={inter.className}>
          <Header/>
          {children}
          </body>
        </AntdRegistry>
      </ConfigProvider>
    </StoreProvider>
    </html>
  )
}
