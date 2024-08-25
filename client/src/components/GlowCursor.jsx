import { useState, useEffect } from "react";

const GlowCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        width: "15px",
        height: "15px",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        backgroundColor: "white",
        boxShadow:
          "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6)",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default GlowCursor;
