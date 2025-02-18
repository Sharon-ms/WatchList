import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // אם יש לך סגנונות מותאמים אישית
import App from './App'; // ודא שקובץ App.js קיים בתיקיית src
import reportWebVitals from './reportWebVitals'; // אם אתה לא משתמש בזה, תוכל להוריד אותו

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// אם אתה רוצה להשתמש ב-reportWebVitals:
reportWebVitals();
