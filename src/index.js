import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { UserProvider } from './context/Context';

// Obtention de la racine de l'application à partir de l'élément avec l'ID 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
// Rendu de l'application enveloppée dans le composant UserProvider
root.render(
    <UserProvider> 
    <App />
    </UserProvider>
);


