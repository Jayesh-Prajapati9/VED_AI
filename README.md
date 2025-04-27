# VedAI

AI-powered document analysis and management application.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview
VedAI is an application that uses OCR and AI to extract, analyze, and manage data from documents and images.

## Features
- Extract text from images and PDFs using Tesseract.js and Google Cloud Vision API
- Store and query data in Supabase with Prisma ORM
- Manage document uploads via API
- Interactive web interface built with Next.js and Tailwind CSS
- PDF to image conversion for previews

## Tech Stack
**Frontend**: Next.js, React, Tailwind CSS, TypeScript  
**Backend**: Node.js, Express.js, TypeScript, Prisma, Supabase, Google Cloud Vision API, Tesseract.js  

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+  
- npm or yarn  

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/VedAI.git
   ```
2. Install dependencies:
   ```bash
   cd Backend
   npm install
   cd ../Frontend
   npm install
   ```

## Environment Variables
Create a `.env` file in the `Backend` directory with the following variables:
```ini
# Google Cloud credentials
GOOGLE_APPLICATION_CREDENTIALS=path/to/credentials.json

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# JWT
JWT_SECRET=your_jwt_secret
```  

## Usage

### Backend
```bash
cd Backend
npm run dev
```
The backend runs on `http://localhost:3001` by default.

### Frontend
```bash
cd Frontend
npm run dev
```
The frontend runs on `http://localhost:3000`.

## Project Structure
```
VedAI/
├── Backend/          # Express API (TypeScript)
│   ├── src/          # Source files
│   └── dist/         # Compiled output
└── Frontend/         # Next.js application
    ├── pages/        # Route pages
    └── components/   # UI components
```

## Contributing
Contributions are welcome! Please open issues or submit pull requests.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
