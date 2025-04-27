import type { ReactNode } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { Brain } from "lucide-react"
import Link from "next/link"
import { UserNav } from "@/components/user-nav"
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between mx-4 w-full">
            <div className="flex items-center gap-2 font-bold">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                <span>VED AI</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        {/* Horizontal navbar below header */}
        <nav className="w-full bg-background border-b mt-6">
          <div className="w-full px-2">
            <div className="flex flex-row gap-4 overflow-x-auto">
              <DashboardNav />
            </div>
          </div>
        </nav>
        {/* Main content below nav bar */}
        <main className="w-full flex-1 px-2 py-6">{children}</main>
      </div>
    </SidebarProvider>
  )
}
