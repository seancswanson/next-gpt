import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import GlossaryModal from "./GlossaryModal";

interface FormItemProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  onIconClick: () => void;
}

const FormItem = ({ label, htmlFor, children, onIconClick }: FormItemProps) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className=""
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <label
        className="mb-2 flex items-center gap-2 text-lg font-bold text-gray-700"
        htmlFor={htmlFor}
      >
        {label}
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className={`cursor-pointer transition duration-300 hover:text-gray-800 ${
            hover ? "text-gray-400" : "text-gray-100"
          }`}
          onClick={onIconClick}
        />
      </label>
      {children}
    </div>
  );
};

const ChatSettings = () => {
  const [openGlossaryModal, setOpenGlossaryModal] = useState(false);
  const [formData, setFormData] = useState({
    temperature: 0.8,
    maxTokens: 50,
    model: "text-davinci-002",
    language: "en",
    instructions: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Save the formData JSON object to local storage
    localStorage.setItem("chatSettings", JSON.stringify(formData));
    console.log(formData);
    // Or send it to a server if needed
    // axios.post("/api/save-settings", formData);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="flex w-full flex-1 flex-col gap-6 rounded bg-white p-6"
        onSubmit={handleSubmit}
      >
        <FormItem
          label="Temperature"
          htmlFor="temperature"
          onIconClick={() => setOpenGlossaryModal(true)}
        >
          <div className="flex items-center">
            <span className="text-sm text-gray-600">Focused</span>
            <input
              className="mx-2 h-1 w-full appearance-none bg-gray-200 focus:bg-blue-500"
              id="temperature"
              name="temperature"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={formData.temperature}
              onChange={handleChange}
            />
            <span className="text-sm text-gray-600">Random</span>
          </div>
        </FormItem>
        <FormItem
          label="Max Tokens"
          htmlFor="max-tokens"
          onIconClick={() => setOpenGlossaryModal(true)}
        >
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="max-tokens"
            name="max-tokens"
            type="number"
            placeholder="Enter max tokens"
            value={formData.maxTokens}
            onChange={handleChange}
          />
        </FormItem>
        <FormItem
          label="Model"
          htmlFor="model"
          onIconClick={() => setOpenGlossaryModal(true)}
        >
          <div className="flex gap-4">
            {[
              {
                value: "text-davinci-002",
                label: "Davinci",
                cost: "Most Powerful",
                price: 0.02,
              },
              {
                value: "text-curie-002",
                label: "Curie",
                cost: "Expensive",
                price: 0.002,
              },
              {
                value: "text-babbage-002",
                label: "Babbage",
                cost: "Less Expensive",
                price: 0.0005,
              },
              {
                value: "text-ada-002",
                label: "Ada",
                cost: "Fastest",
                price: 0.0004,
              },
            ].map(({ value, label, cost, price }) => {
              const pricePer750Words = (price * 750) / 1000;

              return (
                <label
                  key={value}
                  htmlFor={value}
                  className="flex cursor-pointer flex-col items-center"
                >
                  <div className="relative  h-16 w-16 rounded-md border-2 border-gray-300 p-1 ">
                    <span className="absolute left-0 top-[20%] w-full text-center text-4xl font-bold">
                      {label.slice(0, 2)}{" "}
                    </span>
                    <input
                      className="h-full w-full cursor-pointer appearance-none rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      type="radio"
                      id={value}
                      name="model"
                      value={value}
                      checked={formData.model === value}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-1 text-center">
                    <p className="text-sm font-bold">{label}</p>
                    <p className="text-xs text-gray-600">{cost}</p>
                    <p className="text-xs text-gray-600">
                      ${pricePer750Words.toFixed(4)} / 750 words
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </FormItem>
        <FormItem
          label="Language"
          htmlFor="language"
          onIconClick={() => setOpenGlossaryModal(true)}
        >
          <select
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </FormItem>
        <FormItem
          label="Instructions"
          htmlFor="instructions"
          onIconClick={() => setOpenGlossaryModal(true)}
        >
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="instructions"
            name="instructions"
            type="text"
            placeholder="Enter instructions"
            value={formData.instructions}
            onChange={handleChange}
          />
        </FormItem>
        <div className="mt-6 flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Save Settings
          </button>
        </div>
        <GlossaryModal
          isOpen={openGlossaryModal}
          onClose={() => setOpenGlossaryModal(false)}
        />
      </form>
    </div>
  );
};

export default ChatSettings;
