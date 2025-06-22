# QuirkQuack - Real-time Chat Application

A modern, real-time chat application built with React, TypeScript, and Socket.IO. QuirkQuack provides a seamless messaging experience with features like real-time message delivery, online status indicators, and a clean, intuitive user interface.

## Features

- 💬 Real-time messaging using Socket.IO
- 👥 User authentication and authorization
- 🟢 Online/offline status indicators
- 📱 Responsive design for all devices
- 🎨 Modern and clean UI
- 🔒 Secure message handling
- ⚡ Fast and efficient message delivery
- 🎯 TypeScript for better type safety
- 🔄 Real-time message synchronization

## Tech Stack

### Frontend
- React
- TypeScript
- Socket.IO Client
- Tailwind CSS
- Zustand (State Management)
- React Router
- React Hot Toast

### Backend
- Node.js
- Express
- TypeScript
- Socket.IO
- Prisma (ORM)
- PostgreSQL
- JWT Authentication

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/jatinsri25/QuirkQuack.git
cd QuirkQuack
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

Create a `.env` file in the backend directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/quirkquack"
JWT_SECRET="your-jwt-secret"
PORT=5001
```

4. Set up the database:
```bash
cd backend
npx prisma migrate dev
```

5. Start the development servers:

In the backend directory:
```bash
npm run dev
```

In the frontend directory:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5001

## Project Structure

```
quirkquack/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   └── zustand/       # State management
│   └── public/            # Static assets
│
└── backend/               # Node.js backend application
    ├── src/
    │   ├── controllers/   # Route controllers
    │   ├── middleware/    # Custom middleware
    │   ├── routes/        # API routes
    │   ├── socket/        # Socket.IO handlers
    │   └── db/            # Database configuration
    └── prisma/            # Database schema and migrations
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Messages
- `POST /api/messages/send/:id` - Send a message
- `GET /api/messages/:id` - Get messages for a conversation
- `GET /api/users` - Get users for sidebar

## Development

This project is actively maintained by Jatin Srivastava. If you find any bugs or have suggestions for improvements, please:

1. Open an issue to discuss the problem or feature
2. Fork the repository and create a feature branch
3. Make your changes
4. Submit a pull request

## Acknowledgments

- [React](https://reactjs.org/)
- [Socket.IO](https://socket.io/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)

## Author

Jatin Srivastava
- GitHub: [@jatinsri25](https://github.com/jatinsri25)

