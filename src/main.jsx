import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './theme.css';
import './case-studies.css';

const root = document.getElementById('root');
createRoot(root).render(<React.StrictMode><App caseStudyId={root.dataset.caseStudy} /></React.StrictMode>);
