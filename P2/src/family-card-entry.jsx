import { createRoot } from 'react-dom/client';
import FatherFlipCard from './FatherFlipCard.jsx';
import MotherFlipCard from './MotherFlipCard.jsx';

const fatherRoot = document.getElementById('father-card-root');
const motherRoot = document.getElementById('mother-card-root');

if (fatherRoot) createRoot(fatherRoot).render(<FatherFlipCard />);
if (motherRoot) createRoot(motherRoot).render(<MotherFlipCard />);
