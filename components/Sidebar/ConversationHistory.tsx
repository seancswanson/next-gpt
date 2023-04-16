// components/ConversationHistory.tsx

import { useState } from "react";

type MessageType = {
  id: number;
  sender: "user" | "bot";
  content: string;
};

const ConversationHistory = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    { id: 1, sender: "user", content: "Hello, ChatGPT!" },
    { id: 2, sender: "bot", content: "Hello! How can I help you today?" },
  ]);

  const renderMessage = (message: MessageType) => {
    return (
      <div
        key={message.id}
        className={`mb-2 rounded p-2 ${
          message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
      >
        {message.content}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-grow overflow-y-auto">
        {messages.map((message) => renderMessage(message))}
      </div>
    </div>
  );
};

export default ConversationHistory;
