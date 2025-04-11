import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { UpcomingPage } from './pages/upcoming/UpcomingPage.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/upcoming' element={<div>Upcoming</div>} />
      <Route path='/home2' element={<UpcomingPage />} />
      {/* <Route path='contact' element={<Contact />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
