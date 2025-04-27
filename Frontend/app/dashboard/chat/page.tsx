"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Volume2, Loader2, Upload, Bot, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/file-uploader"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your Knowledge Assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [extractedText, setExtractedText] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(input, extractedText),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting response:", error)
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateResponse = (prompt: string, context: string): string => {
    // This is a mock function that would be replaced with actual AI API call
    if (context) {
      return `Based on the content you've uploaded, I can provide this answer: ${prompt} relates to key concepts in your document. The analysis shows important patterns that would be relevant to your query.`
    }

    const responses = [
      "I understand your question about " + prompt + ". Here's what I can tell you...",
      "That's an interesting question about " + prompt + ". From my analysis...",
      "Regarding " + prompt + ", there are several important factors to consider...",
      "Let me analyze " + prompt + " for you. The most important aspects are...",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const speakText = async (text: string) => {
    if (isSpeaking) {
      if (audioRef.current) {
        audioRef.current.pause()
        setIsSpeaking(false)
      }
      return
    }

    setIsSpeaking(true)
    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const audio = new Audio("https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3")
      audio.onended = () => {
        setIsSpeaking(false)
      }
      audio.play()
      audioRef.current = audio
    } catch (error) {
      console.error("Error generating speech:", error)
      toast({
        title: "Error",
        description: "Failed to generate speech. Please try again.",
        variant: "destructive",
      })
      setIsSpeaking(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true)
    try {
      // Simulate file processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setExtractedText(
        "Sample extracted text from the uploaded file. This would contain the actual content extracted from your document, image, or audio file. The AI assistant can now reference this content when answering your questions.",
      )

      toast({
        title: "File processed",
        description: "Your file has been processed successfully.",
      })
    } catch (error) {
      console.error("Error processing file:", error)
      toast({
        title: "Error",
        description: "Failed to process file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Chat</h2>
        <p className="text-muted-foreground">
          Chat with your AI assistant about your documents or ask general questions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle>Chat with AI</CardTitle>
            <CardDescription>Ask questions and get intelligent responses</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px] px-4">
              <div className="space-y-4 py-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex max-w-[80%] gap-3 rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground"
                          : "bg-gradient-to-r from-muted/80 to-muted"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8 bg-primary/10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        {message.role === "assistant" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="mt-2 self-end"
                            onClick={() => speakText(message.content)}
                          >
                            {isSpeaking ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8 bg-primary/20">
                          <AvatarFallback className="bg-primary/20 text-primary">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Textarea
                placeholder="Ask a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[60px] flex-1 resize-none"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 border-none shadow-md">
            <CardHeader>
              <CardTitle>Upload Content</CardTitle>
              <CardDescription>Add context to your conversation</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="audio">Audio</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  <FileUploader
                    accept=".pdf,image/*,audio/*"
                    onUpload={handleFileUpload}
                    isProcessing={isProcessing}
                    icon={<Upload className="h-8 w-8 text-muted-foreground" />}
                    title="Upload File"
                    description="Add a file for context"
                  />
                </TabsContent>
                <TabsContent value="image" className="mt-4">
                  <FileUploader
                    accept="image/*"
                    onUpload={handleFileUpload}
                    isProcessing={isProcessing}
                    icon={<Upload className="h-8 w-8 text-muted-foreground" />}
                    title="Upload Image"
                    description="Add an image for context"
                  />
                </TabsContent>
                <TabsContent value="audio" className="mt-4">
                  <FileUploader
                    accept="audio/*"
                    onUpload={handleFileUpload}
                    isProcessing={isProcessing}
                    icon={<Upload className="h-8 w-8 text-muted-foreground" />}
                    title="Upload Audio"
                    description="Add audio for context"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {extractedText && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Extracted Content</CardTitle>
                <CardDescription>Content from your uploaded file</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-[200px] overflow-y-auto rounded-md border p-3 text-sm">{extractedText}</div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
