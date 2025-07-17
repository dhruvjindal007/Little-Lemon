import React, { useState } from "react";
import { menuItems } from "./menuData";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

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

  const sendMessage = async () => {
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    const response = await fetch("http://127.0.0.1:8000/restaurant/chatbot/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: input,
        menu: formatMenu(),
      }),
    });

    const data = await response.json();
    setMessages([...newMessages, { from: "bot", text: data.response }]);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <div style={{ border: "1px solid #ccc", padding: "1rem", minHeight: "200px" }}>
        {messages.map((msg, idx) => (
          <p key={idx} style={{ textAlign: msg.from === "user" ? "right" : "left" }}>
            <strong>{msg.from === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about a dish..."
        style={{ width: "80%", padding: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px" }}>
        Send
      </button>
    </div>
  );
}

export default Chatbot;
