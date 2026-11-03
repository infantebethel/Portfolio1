import { useState } from 'react';
import './FatherFlipCard.css';

const familyPhoto = new URL('../father-family.jpg', import.meta.url).href;
const portraitPhoto = new URL('../father-portrait.jpg', import.meta.url).href;

const FatherFlipCard = () => {
  const [flipped, setFlipped] = useState(false);
  const toggleCard = () => setFlipped(current => !current);

  return (
    <div className="father-flip-card-wrap">
      <button
        className={`father-flip-card${flipped ? ' is-flipped' : ''}`}
        type="button"
        aria-label={flipped ? 'Show family photo of Mr. Magpali' : 'Flip to read about Mr. Magpali'}
        aria-pressed={flipped}
        onClick={toggleCard}
      >
        <span className="father-flip-card__inner">
          <span className="father-flip-card__face father-flip-card__front">
            <img src={familyPhoto} alt="Mr. Magpali celebrating with his family" />
            <span className="father-flip-card__scrim" />
            <span className="father-flip-card__front-copy">
              <span className="father-flip-card__eyebrow">FAMILY</span>
              <span className="father-flip-card__name">Mr. Magpali</span>
              <span className="father-flip-card__hint">Click or press Enter to flip</span>
            </span>
          </span>
          <span className="father-flip-card__face father-flip-card__back">
            <img src={portraitPhoto} alt="" aria-hidden="true" />
            <span className="father-flip-card__scrim" />
            <span className="father-flip-card__back-copy">
              <span className="father-flip-card__eyebrow">FATHER</span>
              <span className="father-flip-card__name">Mr. Magpali</span>
              <span className="father-flip-card__role">Hardworking provider</span>
              <span className="father-flip-card__message">
                My father and my step-mother teach me the value of hard work, patience, and honesty. They remind me that no dream is too big if I am willing to work for it.
              </span>
              <span className="father-flip-card__quote">“Do your best, and never give up.”</span>
              <span className="father-flip-card__hint">Click or press Enter to flip back</span>
            </span>
          </span>
        </span>
      </button>
    </div>
  );
};

export default FatherFlipCard;
