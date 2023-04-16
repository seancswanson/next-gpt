// components/FooterLinks.tsx

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterLinks = () => {
  return (
    <div className="mt-auto p-4">
      <a
        href="https://github.com/yourusername/yourrepository"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-800"
      >
        <FontAwesomeIcon icon={faGithub} size="lg" />
      </a>
      {/* Add more links/icons here if needed */}
    </div>
  );
};

export default FooterLinks;
