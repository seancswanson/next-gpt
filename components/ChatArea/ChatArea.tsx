// components/ChatArea.tsx
import { useState } from "react";
import ChatSettings from "../ChatSettings/ChatSettings";

interface PropData {
  showSettings: boolean;
}

const ChatArea = (props: PropData) => {
  const [userInput, setUserInput] = useState("");
  const [chatSettings, setChatSettings] = useState({
    temperature: 0.8,
    maxTokens: 50,
    model: "text-davinci-002",
    language: "en",
    instructions: ""
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Process the user input, e.g. send a request to the ChatGPT API
    console.log("Submitted input:", userInput, chatSettings);


    // Clear the input field after submitting
    setUserInput("");
  };

  const renderChat = () => {
    return (
      <div className="flex h-full flex-col">
        <div className="flex-grow overflow-y-auto">
          {/* Display ChatGPT conversation here */}
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="flex-grow rounded-l border border-gray-300 px-3 py-2"
              placeholder="Type your message here"
            />
            <button
              type="submit"
              className="rounded-r bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderSettings = () => {
    return <ChatSettings chatSettings={chatSettings} setChatSettings={setChatSettings}/>;
  };
  return props.showSettings ? renderSettings() : renderChat();
};

export default ChatArea;
