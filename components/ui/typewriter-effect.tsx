"use client";

import { useEffect, useState } from "react";

interface TypewriterEffectProps {
  texts: string[];
  speed?: number;
  pauseDuration?: number;
}

const TypewriterEffect = ({
  texts,
  speed = 100,
  pauseDuration = 2000,
}: TypewriterEffectProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    const currentString = texts[currentIndex];

    if (isDeleting) {
      const timer = setTimeout(() => {
        setCurrentText(currentString.substring(0, typingIndex - 1));
        setTypingIndex(typingIndex - 1);

        if (typingIndex === 0) {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % texts.length);
        }
      }, speed / 2);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentText(currentString.substring(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);

        if (typingIndex === currentString.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [
    currentText,
    isDeleting,
    currentIndex,
    typingIndex,
    texts,
    speed,
    pauseDuration,
  ]);

  return (
    <span className="inline-block min-w-[200px] text-left">
      {currentText}
      <span className="ml-1 inline-block w-0.5 h-5 bg-[#1A5BB8] animate-pulse"></span>
    </span>
  );
};

export default TypewriterEffect;
