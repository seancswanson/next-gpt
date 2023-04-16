// components/ConversationHistory.tsx

interface Conversation {
  id: number;
  title: string;
}

const mockConversations: Conversation[] = [
  { id: 1, title: "Conversation 1" },
  { id: 2, title: "Conversation 2" },
  { id: 3, title: "Conversation 3" },
  // Add more mock conversations if needed
];

const ConversationHistory = () => {
  const handleNewChat = () => {
    console.log("New chat button clicked");
    // Add logic to create a new chat
  };

  const handleConversationClick = (conversationId: number) => {
    console.log(`Conversation ${conversationId} clicked`);
    // Add logic to load the selected conversation
  };

  return (
    <div className="flex h-full flex-col">
      <button
        className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white"
        onClick={handleNewChat}
      >
        New Chat
      </button>
      <div className="overflow-y-auto">
        {mockConversations.map((conversation) => (
          <button
            key={conversation.id}
            className="mb-2 w-full rounded bg-gray-300 px-4 py-2 text-left hover:bg-gray-400"
            onClick={() => handleConversationClick(conversation.id)}
          >
            {conversation.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationHistory;
