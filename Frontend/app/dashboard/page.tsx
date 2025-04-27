"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/file-uploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ImageIcon, Mic, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [extractedText, setExtractedText] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const handlePdfUpload = async (file: File) => {
    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/pdf", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process PDF")
      }

      const data = await response.json()
      setExtractedText(data.text)
    } catch (error) {
      console.error("Error processing PDF:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/ocr/image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process image")
      }

      const data = await response.json()
      setExtractedText(data.text)
    } catch (error) {
      console.error("Error processing image:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleAudioUpload = async (file: File) => {
    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/audio/transcribe", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to transcribe audio")
      }

      const data = await response.json()
      setExtractedText(data.text)
    } catch (error) {
      console.error("Error transcribing audio:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome to your Knowledge Assistant</h2>
        <p className="text-muted-foreground">Upload files, extract information, and chat with your AI assistant.</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-6 w-full">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Files</CardTitle>
            <CardDescription>Files you've uploaded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40 border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">AI Chats</CardTitle>
            <CardDescription>Conversations with AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">PDFs Analyzed</CardTitle>
            <CardDescription>Documents processed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Images Processed</CardTitle>
            <CardDescription>Images with OCR</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Upload Content</CardTitle>
            <CardDescription>Upload PDFs, images, or voice recordings to extract information</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pdf" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pdf" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>PDF</span>
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>Image</span>
                </TabsTrigger>
                <TabsTrigger value="voice" className="flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  <span>Voice</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pdf" className="space-y-4">
                <FileUploader
                  accept=".pdf"
                  onUpload={handlePdfUpload}
                  isProcessing={isProcessing}
                  icon={<FileText className="h-8 w-8 text-muted-foreground" />}
                  title="Upload PDF"
                  description="Drag and drop a PDF file or click to browse"
                />
              </TabsContent>

              <TabsContent value="image" className="space-y-4">
                <FileUploader
                  accept="image/*"
                  onUpload={handleImageUpload}
                  isProcessing={isProcessing}
                  icon={<ImageIcon className="h-8 w-8 text-muted-foreground" />}
                  title="Upload Image"
                  description="Drag and drop an image file or click to browse"
                />
              </TabsContent>

              <TabsContent value="voice" className="space-y-4">
                <FileUploader
                  accept="audio/*"
                  onUpload={handleAudioUpload}
                  isProcessing={isProcessing}
                  icon={<Mic className="h-8 w-8 text-muted-foreground" />}
                  title="Upload Voice Recording"
                  description="Drag and drop an audio file or click to browse"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {extractedText && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Extracted Content</CardTitle>
              <CardDescription>Content extracted from your uploaded file</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-40 overflow-y-auto whitespace-pre-wrap text-sm text-muted-foreground rounded-md border p-4">
                {extractedText}
              </div>
              <div className="mt-4 flex justify-end">
                <Link href="/dashboard/chat">
                  <Button className="gap-2">
                    Chat with AI about this content
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10">
          <CardHeader>
            <CardTitle>Recent Files</CardTitle>
            <CardDescription>Your recently uploaded files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">quarterly-report.pdf</span>
                </div>
                <span className="text-xs text-muted-foreground">2 days ago</span>
              </div>
              <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">chart-data.png</span>
                </div>
                <span className="text-xs text-muted-foreground">3 days ago</span>
              </div>
              <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-green-500" />
                  <span className="font-medium">meeting-notes.mp3</span>
                </div>
                <span className="text-xs text-muted-foreground">5 days ago</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Link href="/dashboard/files">
                <Button variant="outline" size="sm">
                  View all files
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10">
          <CardHeader>
            <CardTitle>Recent AI Chats</CardTitle>
            <CardDescription>Your recent conversations with AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                <span className="font-medium">Quarterly report analysis</span>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
              <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                <span className="font-medium">Market trends summary</span>
                <span className="text-xs text-muted-foreground">2 days ago</span>
              </div>
              <div className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50">
                <span className="font-medium">Meeting transcript review</span>
                <span className="text-xs text-muted-foreground">4 days ago</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Link href="/dashboard/chat">
                <Button variant="outline" size="sm">
                  Start new chat
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
