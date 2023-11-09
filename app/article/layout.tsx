import {Header} from "@/app/ui/header";

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  )
}