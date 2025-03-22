import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      'app.title': 'Task Manager',
      'app.loading': 'Loading...',
      'app.error': 'Error',
      'nav.home': 'Home',
      'nav.tasks': 'Tasks',
      'nav.projects': 'Projects',
      'tasks.title': 'My Tasks',
      'tasks.add': 'Add Task',
      'tasks.edit': 'Edit Task',
      'tasks.empty': 'No tasks yet',
      'tasks.search': 'Search tasks',
      'tasks.filter': 'Filter',
      'tasks.sort': 'Sort',
      'tasks.dueDate': 'Due date',
      'tasks.noDueDate': 'No due date',
      'tasks.priority': 'Priority',
      'tasks.completed': 'Completed',
      'tasks.uncompleted': 'Uncompleted',
      'priority.low': 'Low',
      'priority.medium': 'Medium',
      'priority.high': 'High',
      'form.save': 'Save',
      'form.cancel': 'Cancel',
      'form.delete': 'Delete',
      'form.title': 'Title',
      'form.description': 'Description',
      'form.project': 'Project',
      'form.titleRequired': 'Title is required',
      'form.nameRequired': 'Name is required',
      'form.noProject': 'No project',
      'form.selectProject': 'Select a project or leave empty',
      'form.selectColor': 'Choose a color for your project',
      'projects.title': 'My Projects',
      'projects.add': 'Add Project',
      'projects.edit': 'Edit Project',
      'projects.empty': 'No projects yet',
      'projects.name': 'Project name',
      'projects.color': 'Color',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 