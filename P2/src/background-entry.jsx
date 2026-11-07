import { createRoot } from 'react-dom/client';
import LiquidEther from './LiquidEther.jsx';

const root = document.getElementById('liquid-ether-root');

if (!root) {
  throw new Error('The Liquid Ether background mount is missing.');
}

createRoot(root).render(
  <LiquidEther
    className="liquid-ether-background"
    colors={['#a855f7', '#FF9FFC', '#B497CF']}
    mouseForce={20}
    cursorSize={100}
    persistence={0.75}
    autoDemo
    autoSpeed={0.5}
    autoIntensity={2.2}
    intensity={1}
    viscosity={0}
    resolution={0.5}
    clickBurst
    bounceEdges={false}
    intro
    lightMode={false}
  />
);
