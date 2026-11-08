import { useRef, type PointerEvent, type ReactNode } from "react";
import "./BorderGlow.css";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
};

function BorderGlow({ children, className = "" }: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const edgeDistance = Math.min(x, bounds.width - x, y, bounds.height - y);
    const edgeProximity = Math.max(0, Math.min(1, 1 - edgeDistance / 70));
    const angle =
      (Math.atan2(y - bounds.height / 2, x - bounds.width / 2) * 180) / Math.PI;

    card.style.setProperty("--glow-angle", `${angle}deg`);
    card.style.setProperty("--glow-opacity", `${edgeProximity}`);
  };

  const resetGlow = () => {
    cardRef.current?.style.setProperty("--glow-opacity", "0");
  };

  return (
    <div
      className={`border-glow-card ${className}`.trim()}
      onPointerLeave={resetGlow}
      onPointerMove={handlePointerMove}
      ref={cardRef}
    >
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}

export default BorderGlow;
