import { createRoot } from 'react-dom/client';
import Lanyard from './Lanyard.jsx';

const profileImage = new URL('../profile-logo.png', import.meta.url).href;
const root = document.getElementById('lanyard-root');

if (root) {
  createRoot(root).render(
    <Lanyard
      frontImage={profileImage}
      backImage={profileImage}
      imageFit="cover"
      cardColor="rgb(0, 0, 0)"
      orientation="portrait"
      finish="glossy"
      cornerRadius={0.3}
      size={0.66}
      anchor="center"
      strapLength={0.7}
      strapColor="#080808"
      strapWidth={0.65}
      metal="silver"
      gravity={1}
      damping={0.5}
      elasticity={0.5}
      breeze={0}
      interactive
      dragAnywhere={root.hasAttribute('data-drag-anywhere')}
      extendAbove={root.hasAttribute('data-extend-above')}
      intro={false}
      className="profile-lanyard"
    />
  );
}
