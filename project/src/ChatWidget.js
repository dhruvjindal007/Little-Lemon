import React, { useState, useRef, useEffect } from "react";
import Chatbot from "./Chatbot";
import { X, MessageCircle } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  // Close if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            backgroundColor: "#ffcd00",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "pulse 2s infinite",
          }}
        >
          <MessageCircle size={28} color="#000" />
        </button>
      )}

      {/* Chat Window */}
      <div
        ref={chatRef}
        style={{
          position: "fixed",
          bottom: isOpen ? "20px" : "-600px",
          left: "20px",
          width: "350px",
          height: "500px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          boxShadow: "0px 8px 25px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 9999,
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#ffcd00",
            padding: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: "bold",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          Restaurant AI Assistant
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Chatbot */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Chatbot />
        </div>
      </div>

      {/* Pulse Animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }

          @media (max-width: 480px) {
            div[style*="position: fixed"][style*="width: 350px"] {
              width: 90vw !important;
              height: 70vh !important;
              left: 5vw !important;
              bottom: ${isOpen ? "10px" : "-100vh"} !important;
            }
          }
        `}
      </style>
    </>
  );
}
