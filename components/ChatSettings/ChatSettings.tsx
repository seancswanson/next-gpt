import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent,useEffect,useState } from "react";

import GlossaryModal from "./GlossaryModal";

interface FormItemProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  onIconClick: () => void;
}

interface ChatSettingsObj {
  temperature: number;
  maxTokens: number;
  model: string;
  language: string;
  instructions: string;
}

interface PropData {
  chatSettings: ChatSettingsObj;
  setChatSettings: (data: ChatSettingsObj) => void;
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

const ChatSettings = (props: PropData) => {
  const [openGlossaryModal, setOpenGlossaryModal] = useState(false);
  const [modelToChange, setModelToChange] = useState("");
  const [formData, setFormData] = useState(props.chatSettings);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, setting?: string) => {
    if (setting === "model") {
      setModelToChange(e.target.value);
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Save the formData JSON object to local storage
    localStorage.setItem("chatSettings", JSON.stringify(formData));

    props.setChatSettings(formData);
    console.log(formData);
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
            name="maxTokens"
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
                value: "text-davinci-003",
                label: "Davinci",
                cost: "Most Powerful",
                price: 0.02,
                isSelected: props.chatSettings.model === "text-davinci-003",
              },
              {
                value: "text-curie-002",
                label: "Curie",
                cost: "Expensive",
                price: 0.002,
                isSelected: props.chatSettings.model === "text-curie-002",
              },
              {
                value: "text-babbage-002",
                label: "Babbage",
                cost: "Less Expensive",
                price: 0.0005,
                isSelected: props.chatSettings.model == "text-babbage-002",
              },
              {
                value: "text-ada-002",
                label: "Ada",
                cost: "Fastest",
                price: 0.0004,
                isSelected: props.chatSettings.model === "text-ada-002",
              },
            ].map(({ value, label, cost, price, isSelected }) => {
              const pricePer750Words = (price * 750) / 1000;
              return (
                <label
                  key={value}
                  htmlFor={value}
                  className="flex cursor-pointer flex-col items-center"
                >
                  <div
                    className={`border-2 ${
                      isSelected
                        ? "border-black" // Add a different border color for the currently selected model
                        : modelToChange === value
                        ? "border-black border-dashed" // Add a different border color for the hovered model
                        : "border-gray-400"
                    } relative h-16 w-16 rounded-md p-1 hover:border-gray-700`}
                  >
                    <span className="absolute left-0 top-[20%] w-full text-center text-4xl font-bold">
                      {label.slice(0, 2)}{" "}
                    </span>
                    <input
                      className={`h-full w-full cursor-pointer appearance-none rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 `}
                      type="radio"
                      id={value}
                      name="model"
                      value={value}
                      checked={formData.model === value}
                      onChange={(e) => handleChange(e, "model")}
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
