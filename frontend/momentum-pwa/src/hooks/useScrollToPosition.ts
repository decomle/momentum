import { useState, useEffect } from "react";

export default function useScrollPosition(containerId: string, threshold = 16) {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const checkScroll = () => {
      const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
      setIsAtBottom(distanceToBottom <= threshold);
    };

    checkScroll();
    container.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [containerId, threshold]);

  return { isAtBottom };
}