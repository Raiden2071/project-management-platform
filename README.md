# Todoist Clone - Project Management Platform  

A learning project for creating a task manager (Todoist clone) using a modern React technology stack.  

## Technologies Used  

- **React** (v18) with TypeScript  
- **Vite** - a fast application bundler  
- **Feature-Sliced Design** (FSD) - architectural methodology  
- **Redux Toolkit** - state management  
- **SWR** - data fetching and caching  
- **Material UI** - UI components  
- **i18next** - internationalization  
- **SCSS Modules** - component styling  

## Project Features  

- Task management (creation, editing, deletion, status updates)  
- Organizing tasks by projects  
- Assigning priorities and due dates  
- Multilingual support (Russian and English)  
- Local data storage (localStorage)  

## Project Structure (Feature-Sliced Design)  

```
src/
├── app/              # Application setup (providers, theme)
├── entities/         # Core entities (Task, Project)
│   ├── task/         # Task entity
│   └── project/      # Project entity
├── features/         # Functional modules
│   ├── task-list/    # Task list
│   ├── task-form/    # Task creation/editing form
│   └── project-form/ # Project creation/editing form
├── widgets/          # Composite components
│   ├── header/       # Application header
│   └── sidebar/      # Sidebar
├── pages/            # Application pages
│   └── home/         # Home page
└── shared/           # Common utilities and configurations
    ├── config/       # Settings (i18n)
    ├── lib/          # Utilities (store)
    └── api/          # API interactions
```

## Running the Project  

1. Clone the repository  
2. Install dependencies: `npm install`  
3. Start the project: `npm run dev`  
4. Open the browser at: `http://localhost:5173`  

## Future Development  

This project serves as a starting point for learning React and modern development tools. Possible future enhancements:  

- Adding user authentication  
- Synchronization with a backend API  
- Adding task labels  
- Implementing filtering and search  
- Creating recurring tasks  
- Integration with a calendar  
- Adding notifications  