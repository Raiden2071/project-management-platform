# Project Management Platform

A modern project management platform built with React, Redux Toolkit, and TypeScript. This application allows users to create projects, manage tasks, view overall progress, and customize their profiles.

## Features

- **Authentication**: Register, login, and logout
- **Project Management**: Create, edit, delete, and view projects
- **Task Management**: Add, edit, delete, and assign tasks within projects
- **Dashboard**: Overview of all projects and tasks
- **Settings**: Edit user profile, change password, and select interface language

## Tech Stack

### Frontend
- **React 18**: Core UI library (with hooks)
- **Redux Toolkit**: Global state management
- **SWR**: Server data fetching and caching
- **React Router**: Page routing
- **TypeScript**: Static typing
- **MUI (Material-UI)**: UI components
- **Bootstrap**: Styling utilities
- **i18next**: Multilingual support

## Project Structure

The application follows a modular architecture inspired by feature-sliced design:

```
src/
├── components/       # Common UI components
├── features/         # Functional modules
│   ├── auth/         # Authentication logic
│   ├── projects/     # Project management
│   ├── tasks/        # Task management
│   ├── dashboard/    # Dashboard
│   └── settings/     # Settings
├── hooks/            # Custom hooks
├── store/            # Redux store and slices
├── services/         # API services
├── utils/            # Utilities
├── locales/          # Translation files
├── routes/           # Route configuration
└── tests/            # Tests
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build
