import { createRoot } from 'react-dom/client';
import ProfileCard from './ProfileCard.jsx';

const root = document.getElementById('profile-card-root');

if (root) createRoot(root).render(<ProfileCard />);
