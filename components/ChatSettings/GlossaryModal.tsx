
interface PropData {
  isOpen: boolean;
  onClose: () => void;
}
function GlossaryModal(props: PropData) {
  if (!props.isOpen) return null;
const glossaryItems = [
  {
    title: "Temperature",
    description:
      "Temperature determines the randomness of the model's output. A higher temperature (e.g., 1.0) will make the output more random, while a lower temperature (e.g., 0) will make the output more deterministic.",
  },
  {
    title: "Max Tokens",
    description:
      "Max Tokens limits the number of tokens (words or word pieces) in the model's response. Set a lower value to receive shorter responses and a higher value for longer responses.",
  },
  // Add other glossary items here
];
  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
      onClick={props.onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold">Glossary</h2>
        {glossaryItems.map((item, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}{" "}
        <button className="border border-black px-2 rounded" onClick={props.onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default GlossaryModal;
