import { createRoot } from 'react-dom/client';
import '../app/globals.css';
import './preview.css';
import Page from '../app/page';

const host = document.getElementById('midimoney-root');
if (host) createRoot(host).render(<Page />);
