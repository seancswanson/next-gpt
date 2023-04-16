// App.tsx
import ChatArea from "@/components/ChatArea/ChatArea";
import ConversationHistory from "@/components/Sidebar/ConversationHistory";
import FooterLinks from "@/components/Sidebar/FooterLinks";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ResizeCallbackData } from "react-resizable";
import { useMediaQuery } from "react-responsive";
import ResizableSection from "../components/ResizableSection";

export default function Home() {
  const isLargeScreen = useMediaQuery({ minWidth: 1024 }); // Adjust the breakpoint as needed
  const [sectionWidths, setSectionWidths] = useState<number[]>([]);
  useEffect(() => {
    setSectionWidths([0.3, 0.7]);
  }, []);

  const handleResize =
    (index: number) =>
    (event: React.SyntheticEvent<Element, Event>, data: ResizeCallbackData) => {
      const width = data.size.width;
      const totalWidth = window.innerWidth;
      const updatedWidths = [...sectionWidths];
      updatedWidths[index] = width / totalWidth;
      updatedWidths[index + 1] = 1 - updatedWidths[index];
      setSectionWidths(updatedWidths);
    };

  if (sectionWidths.length === 0) {
    return null; // Or return a loading indicator
  }

  return (
    <div className="h-screen flex-col overflow-hidden lg:flex lg:flex-row">
      {isLargeScreen ? (
        <>
          <ResizableSection
            width={sectionWidths[0] * window.innerWidth}
            minWidth={100}
            onResize={handleResize(0)}
          >
            <div className="h-full flex flex-col bg-gray-200 p-4">
              <ConversationHistory />
              <FooterLinks />{" "}
            </div>
          </ResizableSection>
          <div
            className="flex h-full flex-col p-4"
            style={{ width: `${sectionWidths[1] * 100}%` }}
          >
            {/* Top bar with API/conversation parameters and settings icon */}
            <div className="mb-2 flex items-center justify-between bg-gray-300 p-2">
              <div className="text-sm">
                {/* Add API or conversation parameters here */}
                API Parameter: Value
              </div>
              <button className="text-gray-700">
                <FontAwesomeIcon icon={faCog} />
              </button>
            </div>
            <ChatArea />
          </div>
        </>
      ) : (
        <>
          <div className="h-1/3 flex flex-col w-full bg-gray-200 p-4">
            <ConversationHistory />
            <FooterLinks />{" "}
          </div>
          <div className="flex h-2/3 w-full flex-col p-4 sm:flex-1">
            {/* Top bar with API/conversation parameters and settings icon */}
            <div className="mb-2 flex items-center justify-between bg-gray-300 p-2">
              <div className="text-sm">
                {/* Add API or conversation parameters here */}
                API Parameter: Value
              </div>
              <button className="text-gray-700">
                <FontAwesomeIcon icon={faCog} />
              </button>
            </div>
            <ChatArea />
          </div>
        </>
      )}
    </div>
  );
}
