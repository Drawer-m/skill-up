import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import './ScrambleText.css'; // Import the CSS

gsap.registerPlugin(ScrambleTextPlugin);

const ScrambleText = ({ text, animate }) => {
  const textRef = useRef(null);
  const originalTextRef = useRef(null);

  useEffect(() => {
    const scrambleElement = textRef.current;
    const originalElement = originalTextRef.current;

    if (!scrambleElement || !originalElement) return;

    // Clear previous animations/styles
    gsap.killTweensOf(scrambleElement);
    gsap.set(originalElement, { clearProps: 'all' }); // Reset original text styles
    gsap.set(scrambleElement, { opacity: 0 }); // Hide scramble text initially

    if (animate) {
      // Hide original text visually but keep for screen readers
      gsap.set(originalElement, { className: 'visually-hidden' });
      // Ensure scramble text is visible for animation
      gsap.set(scrambleElement, { opacity: 1 });

      const tl = gsap.timeline();
      tl.to(scrambleElement, {
        duration: 2.5, // Adjust duration as needed
        scrambleText: {
          text: text,
          chars: "XO*#", // Characters to use for scrambling
          speed: 0.4,
        },
        ease: "none"
      });
    } else {
      // If not animating, ensure original text is visible and scramble is hidden
      gsap.set(originalElement, { className: '' }); // Remove hidden class
      gsap.set(scrambleElement, { opacity: 0 });
    }

    // Cleanup function to kill animation on unmount or prop change
    return () => {
      gsap.killTweensOf(scrambleElement);
    };

  }, [animate, text]); // Rerun effect if animate or text changes

  return (
    <span className="text-scramble__content"> {/* Changed div to span */}
      {/* Original text for accessibility and non-animated state */}
      <span ref={originalTextRef}>{text}</span>
      {/* Span for the animation */}
      <span className="text-scramble__text" aria-hidden="true" ref={textRef}></span>
      {/* Optional: Cursor image - removed for cleaner integration */}
    </span> // Changed div to span
  );
};

export default ScrambleText;
