import React, { useState, useRef, useEffect } from "react";
import { menuItems } from "./menuData";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const formatMenu = () => {
    return menuItems
      .map(
        (category) =>
          `${category.category}:\n` +
          category.items
            .map((item) => `- ${item.name}: ${item.description} (${item.price})`)
            .join("\n")
      )
      .join("\n\n");
  };

  const sendMessage = async (customMessage) => {
    const messageToSend = customMessage || input;
    if (!messageToSend.trim()) return;

    // Add user message if it's not the auto-greeting
    if (messageToSend !== "__start__" && !customMessage) {
      setMessages((prev) => [...prev, { from: "user", text: messageToSend }]);
      setInput("");
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/restaurant/chatbot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageToSend,
          menu: formatMenu(),
        }),
      });

      const data = await response.json();
      console.log("Backend response:", data);

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.response || "No response from bot." },
      ]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error connecting to the server." },
      ]);
    }
  };

  // Automatically start conversation
  useEffect(() => {
  //   setMessages([
  //   {
  //     from: "bot",
  //     text: "👋 Welcome! I’m your restaurant assistant.\nYou can ask me things like:\n• What's the special today?\n• Do you have vegan dishes?\n• Suggest something sweet."
  //   }
  // ]);
  sendMessage("__start__");
  }, []);

  // Scroll chat to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center" }}>💬 Need Help? Chat with Us!</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          minHeight: "300px",
          maxHeight: "300px",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.from === "user" ? "right" : "left",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "15px",
                backgroundColor: msg.from === "user" ? "#ffcd00" : "#e0e0e0",
                maxWidth: "80%",
                whiteSpace: "pre-line",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a dish..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          onClick={() => sendMessage()}
          style={{
            marginLeft: "8px",
            padding: "10px 16px",
            backgroundColor: "#ffcd00",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
