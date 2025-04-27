"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

interface FileUploaderProps {
  accept: string
  onUpload: (file: File) => Promise<void>
  isProcessing: boolean
  icon: ReactNode
  title: string
  description: string
}

export function FileUploader({ accept, onUpload, isProcessing, icon, title, description }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      handleFile(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      handleFile(selectedFile)
    }
  }

  const handleFile = (selectedFile: File) => {
    // Check if file type is accepted
    if (!selectedFile.type.match(accept.replace(/\./g, "").replace(/,/g, "|").replace(/\*/g, ".*"))) {
      toast({
        title: "Invalid file type",
        description: `Please upload a file with the following format: ${accept}`,
        variant: "destructive",
      })
      return
    }

    setFile(selectedFile)
    simulateProgress()
    onUpload(selectedFile).catch((error) => {
      console.error("Error uploading file:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      })
      setProgress(0)
      setFile(null)
    })
  }

  const simulateProgress = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval)
          return prevProgress
        }
        return prevProgress + 5
      })
    }, 100)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
        disabled={isProcessing}
      />

      {isProcessing ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <div className="text-center">
            <p className="font-medium">Processing {file?.name}</p>
            <p className="text-sm text-muted-foreground">This may take a moment...</p>
          </div>
          <Progress value={progress} className="w-[60%]" />
        </div>
      ) : (
        <>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
            {icon}
          </div>
          <h3 className="mb-2 text-lg font-medium">{title}</h3>
          <p className="mb-4 text-center text-sm text-muted-foreground">{description}</p>
          <Button
            onClick={handleButtonClick}
            className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80"
          >
            <Upload className="h-4 w-4" />
            Choose File
          </Button>
          {file && <p className="mt-4 text-sm text-muted-foreground">Selected: {file.name}</p>}
        </>
      )}
    </div>
  )
}
