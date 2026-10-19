// src/components/sections/About/AboutCardDeck.jsx
// Interactive stacked photo card deck with Instagram frame and swipe-to-back animation
import { useState, useCallback } from "react";

const CARDS = [
  {
    id: 1,
    image: "/assets/images/about/about-card-1.webp",
    alt: "Rahmi Atika — Fresh Graduate Teknik Informatika",
  },
  {
    id: 2,
    image: "/assets/images/about/about-card-2.webp",
    alt: "Rahmi Atika — Potret Tersenyum",
  },
  {
    id: 3,
    image: "/assets/images/about/about-card-3.webp",
    alt: "Rahmi Atika — Potret Kasual",
  },
];

export default function AboutCardDeck() {
  // deck holds array of card indices in order from front (index 0) to back (index 2)
  const [deck, setDeck] = useState([0, 1, 2]);
  const [animatingCard, setAnimatingCard] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleNextCard = useCallback(() => {
    if (animatingCard !== null) return;

    const currentTop = deck[0];
    setAnimatingCard(currentTop);

    // Phase 1: Top card sweeps out to the side
    setTimeout(() => {
      // Phase 2: Cycle deck array so old top card is placed at the back
      setDeck((prev) => [prev[1], prev[2], prev[0]]);
      setTimeout(() => {
        setAnimatingCard(null);
      }, 70);
    }, 280);
  }, [animatingCard, deck]);

  // Handle keyboard navigation (Enter / Space)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNextCard();
    }
  };

  const activeCardIndex = deck[0];

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 35%, rgba(107, 26, 42, 0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Stack Container */}
      <div
        className="relative w-[275px] sm:w-[295px] aspect-[5/7] cursor-pointer touch-manipulation group"
        onClick={handleNextCard}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label="Tumpukan foto Rahmi Atika. Klik untuk melihat foto berikutnya."
      >
        {CARDS.map((card, cardIndex) => {
          // Find position in current deck: 0 = front, 1 = middle, 2 = back
          const position = deck.indexOf(cardIndex);
          const isAnimating = animatingCard === cardIndex;

          let transform = "";
          let zIndex = 10;
          let opacity = 1;
          let shadow = "";
          let transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease, box-shadow 0.4s ease";

          if (isAnimating) {
            // Card is sweeping out to the right before heading to back
            transform = "translate(120%, -15px) rotate(15deg) scale(0.96)";
            zIndex = 40;
            opacity = 0.85;
            shadow = "0 25px 45px -10px rgba(0,0,0,0.22)";
            transition = "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease";
          } else if (position === 0) {
            // Top card (Front)
            transform = isHovered
              ? "translate(0px, -4px) rotate(-1.5deg) scale(1.01)"
              : "translate(0px, 0px) rotate(-1.5deg) scale(1)";
            zIndex = 30;
            opacity = 1;
            shadow = "0 20px 38px -10px rgba(107, 26, 42, 0.22), 0 8px 18px rgba(0,0,0,0.08)";
          } else if (position === 1) {
            // Middle card (Peeking to the right)
            transform = isHovered
              ? "translate(24px, 8px) rotate(7.5deg) scale(0.96)"
              : "translate(18px, 6px) rotate(5.5deg) scale(0.96)";
            zIndex = 20;
            opacity = 0.95;
            shadow = "0 14px 26px -8px rgba(0,0,0,0.14)";
          } else if (position === 2) {
            // Back card (Peeking to the left)
            transform = isHovered
              ? "translate(-22px, 14px) rotate(-8.5deg) scale(0.92)"
              : "translate(-16px, 10px) rotate(-6.5deg) scale(0.92)";
            zIndex = 10;
            opacity = 0.88;
            shadow = "0 10px 20px -6px rgba(0,0,0,0.12)";
          }

          return (
            <div
              key={card.id}
              className="absolute inset-0 w-full h-full rounded-[20px] sm:rounded-[22px] overflow-hidden will-change-transform bg-white border border-black/5"
              style={{
                transform,
                zIndex,
                opacity,
                boxShadow: shadow,
                transition,
              }}
            >
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover select-none pointer-events-none"
                loading="eager"
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      {/* Interactive Helper Cue */}
      <div className="mt-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-50 border border-maroon-700/15 text-maroon-700 text-xs font-semibold shadow-xs select-none pointer-events-none">
        <span className="inline-block animate-bounce text-sm">👆</span>
        <span>
          Klik untuk lihat foto aku ({activeCardIndex + 1}/3)
        </span>
      </div>
    </div>
  );
}
