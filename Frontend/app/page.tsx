import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, FileText, ImageIcon, Mic } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Brain className="h-6 w-6" />
            <span>VED AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-24 md:py-32">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Your Multimodal Knowledge Assistant
                </h1>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Upload PDFs, images, or voice recordings and get AI-powered insights instantly. Ask questions and
                  receive answers in text or speech.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 shadow-sm">
                  <FileText className="h-12 w-12 text-primary" />
                  <h3 className="text-lg font-semibold">PDF Analysis</h3>
                  <p className="text-center text-sm text-muted-foreground">Extract insights from your documents</p>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 shadow-sm">
                  <ImageIcon className="h-12 w-12 text-primary" />
                  <h3 className="text-lg font-semibold">Image OCR</h3>
                  <p className="text-center text-sm text-muted-foreground">Convert images to searchable text</p>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 shadow-sm">
                  <Mic className="h-12 w-12 text-primary" />
                  <h3 className="text-lg font-semibold">Voice Input</h3>
                  <p className="text-center text-sm text-muted-foreground">Transcribe and analyze speech</p>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 shadow-sm">
                  <Brain className="h-12 w-12 text-primary" />
                  <h3 className="text-lg font-semibold">AI Chat</h3>
                  <p className="text-center text-sm text-muted-foreground">Ask questions about your content</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} VED AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
