import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import { initializeTheme } from './hooks/use-appearance';
import Welcome from './pages/welcome';

/**
 * Static entry point used by `npm run build:static`. It renders the landing
 * page without Inertia so the result can be served from GitHub Pages or any
 * other static host that has no PHP runtime.
 */
createRoot(document.getElementById('app')).render(
    <StrictMode>
        <Welcome />
    </StrictMode>,
);

initializeTheme();
