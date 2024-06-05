import RightSidebar from '@/components/Sidebar/RightSidebar'
import Sidebar from '@/components/Sidebar/Sidebar'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full h-full">
      <Sidebar />
      <div className="flex-1">{children}</div>
      <RightSidebar />
    </main>
  )
}
