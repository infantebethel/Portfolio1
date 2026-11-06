import { createRoot } from 'react-dom/client';
import FaultyTerminal from './FaultyTerminal.jsx';

const root = document.getElementById('faulty-terminal-root');

if (!root) {
  throw new Error('The Faulty Terminal background mount is missing.');
}

createRoot(root).render(
  <FaultyTerminal
    className="faulty-terminal-background"
    tint="#a855f7"
    glyphs="characters"
    scale={2.2}
    digitSize={1.3}
    timeScale={0.35}
    brightness={0.85}
    glow={0.7}
    persistence={0.85}
    mouseStrength={0.5}
    mouseGlow={0.8}
    curvature={0.1}
    vignette={0.25}
    clickEffect="glitch"
    scramble={0.5}
    scanlineIntensity={0.5}
    glitchAmount={1}
    flickerAmount={1}
    noiseAmp={1}
    chromaticAberration={0}
    mouseReact
    pageLoadAnimation
    pause={false}
    lightMode={false}
  />
);
