// components/ChatArea.tsx

import { useState } from "react";

const ChatArea = () => {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Process the user input, e.g. send a request to the ChatGPT API
    console.log("Submitted input:", userInput);

    // Clear the input field after submitting
    setUserInput("");
  };

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

export default ChatArea;
