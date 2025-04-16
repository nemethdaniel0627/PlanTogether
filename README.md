# PlanTogether

A web application built with Node.js and React.js for planning activities together.

## Project Structure

```
plantogether/
├── frontend/           # React frontend application
│   ├── public/        # Static files
│   └── src/           # React source files
├── backend/           # Node.js backend application
└── package.json       # Root package.json
```

## Setup Instructions

1. Install dependencies:
```bash
npm run install-all
```

2. Start the development servers:
```bash
npm start
```

This will start both the frontend and backend servers concurrently.

## Development

- Frontend runs on: http://localhost:3000
- Backend runs on: http://localhost:5000

## Available Scripts

- `npm start`: Starts both frontend and backend servers
- `npm run server`: Starts only the backend server
- `npm run client`: Starts only the frontend server
- `npm run install-all`: Installs all dependencies for both frontend and backend 