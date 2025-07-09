# Game Show 🎲

A modern web application that displays your BoardGameGeek collection in an elegant, responsive grid layout. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Beautiful Grid Display**: Your board game collection displayed in a responsive grid layout
- **BoardGameGeek Integration**: Fetches game data directly from BGG API
- **Interactive Thumbnails**: Hover effects reveal game names with smooth animations
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest with React Testing Library
- **API Integration**: BoardGameGeek XML API
- **Code Quality**: ESLint + Prettier

## 🏗️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd game-show
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run pretty   # Format code with Prettier
npm run test     # Run tests
npm run test:watch # Run tests in watch mode
```

## 🎮 How It Works

The application fetches board game collection data from the BoardGameGeek API for a specified user and displays each game as an interactive thumbnail. When you hover over a game, the title appears with a smooth overlay animation.

### Key Components

- **`GameThumbnail`**: Individual game display component with hover effects
- **`getCollection`**: API service that fetches and sanitizes BGG data
- **Type Definitions**: Strong typing for game and collection data structures

## 🧪 Testing

The project includes comprehensive testing setup:

- Unit tests for API functions
- Component tests for React components
- Test utilities configured for async operations

Run tests with:
```bash
npm test
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms

The application can be deployed to any platform that supports Node.js applications:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [BoardGameGeek API](https://boardgamegeek.com/wiki/page/BGG_XML_API2)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
