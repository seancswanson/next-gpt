import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TopChatBar = () => (
  <div className="mb-2 flex items-center justify-between bg-gray-300 p-2">
    <div className="text-sm">
      {/* Add API or conversation parameters here */}
      Foo: Bar
    </div>
    <button className="text-gray-700">
      <FontAwesomeIcon icon={faCog} />
    </button>
  </div>
);

export default TopChatBar;
