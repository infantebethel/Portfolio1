import { useState } from 'react';
import './FatherFlipCard.css';

const familyPhoto = new URL('../mother-family.jpg', import.meta.url).href;
const portraitPhoto = new URL('../mother-portrait.jpg', import.meta.url).href;

const MotherFlipCard = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="father-flip-card-wrap">
      <button
        className={`father-flip-card${flipped ? ' is-flipped' : ''}`}
        type="button"
        aria-label={flipped ? 'Show family photo of Mrs. Magpali' : 'Flip to read about Mrs. Magpali'}
        aria-pressed={flipped}
        onClick={() => setFlipped(current => !current)}
      >
        <span className="father-flip-card__inner">
          <span className="father-flip-card__face father-flip-card__front">
            <img src={familyPhoto} alt="Mrs. Magpali with her daughter" />
            <span className="father-flip-card__scrim" />
            <span className="father-flip-card__front-copy">
              <span className="father-flip-card__eyebrow">FAMILY</span>
              <span className="father-flip-card__name">Mrs. Magpali</span>
              <span className="father-flip-card__hint">Click or press Enter to flip</span>
            </span>
          </span>
          <span className="father-flip-card__face father-flip-card__back">
            <img src={portraitPhoto} alt="" aria-hidden="true" />
            <span className="father-flip-card__scrim" />
            <span className="father-flip-card__back-copy">
              <span className="father-flip-card__eyebrow">MOTHER</span>
              <span className="father-flip-card__name">Mrs. Magpali</span>
              <span className="father-flip-card__role">Loving caretaker</span>
              <span className="father-flip-card__message">
                My mother. She is caring, wise, and always there to listen. She taught me to be kind to everyone and to believe in myself.
              </span>
              <span className="father-flip-card__quote">“Be kind — it always comes back to you.”</span>
              <span className="father-flip-card__hint">Click or press Enter to flip back</span>
            </span>
          </span>
        </span>
      </button>
    </div>
  );
};

export default MotherFlipCard;
